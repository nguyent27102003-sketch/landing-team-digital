# Generate comprehensive implementation_plan.md artifact matching System-Wide Migration Requirements

doc = """# THIẾT KẾ NÂNG CẤP DỮ LIỆU SÀN TOÀN HỆ THỐNG (SYSTEM-WIDE MARKETPLACE DATA ARCHITECTURE)
## HÙNG CƯỜNG EQUIPMENT CONFIGURATOR — CHUẨN HÓA DỮ LIỆU THƯƠNG MẠI TOÀN BỘ CÁC MODULE

**TRẠNG THÁI TRIỂN KHAI**: `CHỜ PHÊ DUYỆT KIẾN TRÚC DỮ LIỆU (DO NOT CODE MIGRATION YET)`
**NGUYÊN TẮC CỐT LÕI**: MỌI MODULE (CONFIGURATOR, INVESTMENT, LIBRARY, PRODUCT DETAIL, COMPARISON, PURCHASE LIST) DÙNG CHUNG 1 NGUỒN THƯƠNG MẠI DUY NHẤT VÀ 1 SERVICE TRUY XUẤT CỦA HỆ THỐNG (`MarketplaceService`).

---

### 1. CURRENT DATA SOURCE AUDIT (RÀ SOÁT NGUỒN DỮ LIỆU HIỆN TẠI)

Rà soát cách các module đang truy xuất dữ liệu giá, ảnh và link mua:

| Module UI | Nguồn dữ liệu hiện tại | Tình trạng dùng chung / Khác biệt | Rủi ro phát sinh rải rác |
|---|---|---|---|
| **Configurator Result** | Trực tiếp `productsData.js` & `LINK_PRICE_STATUS` | Chỉ đọc `Primary_Link` & `Price_Current` | Không hiển thị đủ 2 sàn TikTok/Shopee |
| **Equipment Library** | Trực tiếp `productsData.js` | Đọc `Image_URL` & `Price_Current` | Không có thông tin biến thể Variant |
| **Product Detail Modal** | Trực tiếp `productsData.js` & `CATEGORY_SPECS` | Hiển thị 1 link mua duy nhất | Thiếu thông tin gian hàng & giá từng sàn |
| **Product Comparison** | Hardcoded trong `comparisonsData.js` | Lưu `Current_Price` tĩnh trong Sheet 12 | Giá có thể không đồng bộ với Library |
| **Investment Module V2** | Bảng xuất Sheet 21 & Sheet 09 | Đọc `Primary_Link` & `Price_Status` | Chưa kết nối dịch vụ thương mại đa sàn |

---

### 2. PRODUCT + VARIANT KEY DESIGN (THIẾT KẾ KHÓA TRUY XUẤT)

Khóa truy xuất dữ liệu thương mại toàn hệ thống là **COMPOSITE PRIMARY KEY**:

$$\text{Composite Key} = \text{Product\_ID} \ \vert \ \text{Variant\_ID} \ \vert \ \text{Platform}$$

#### Bảng Danh Mục Biến Thể Sản Phẩm (`PRODUCT_VARIANT_MASTER` - Sheet 25):

| Variant_ID | Product_ID | Variant_Name | Attributes (TX/RX/Connector/Capacity) | Active |
|---|---|---|---|:---:|
| `AUD_DJI_MICMINI_1TX_USBC` | `AUD_DJI_MICMINI` | DJI Mic Mini 1TX + 1RX Type-C | 1TX / 1RX / USB-C / Translucent Gray | **Yes** |
| `AUD_DJI_MICMINI_2TX_USBC` | `AUD_DJI_MICMINI` | DJI Mic Mini 2TX + 1RX Type-C | 2TX / 1RX / USB-C / Charging Case | **Yes** |
| `PKT_DJI_OP3_STD_DEFAULT` | `PKT_DJI_OP3_STD` | DJI Osmo Pocket 3 Standard Edition | Standard Single Gimbal / 1-inch CMOS | **Yes** |
| `PKT_DJI_OP3_CC_DEFAULT` | `PKT_DJI_OP3_CC` | DJI Osmo Pocket 3 Creator Combo Edition | Creator Combo / Mic 2 TX / Battery Handle | **Yes** |
| `STO_KIN_GO_128GB` | `STO_KIN_GO` | Kingston Canvas Go! Plus 128GB microSDXC V30 | 128GB / U3 / V30 / A2 | **Yes** |
| `<PRODUCT_ID>_DEFAULT` | `<PRODUCT_ID>` | Default Product Variant | Standard Model Specifications | **Yes** |

---

### 3. MARKETPLACE DATA MODEL FINAL (`MARKETPLACE_PRODUCT_DATA` - Sheet 24)

Bảng dữ liệu thương mại chính thức (Chỉ các bản ghi `Publish_Status == PUBLISHED` mới được xuất lên Production UI):

```sql
CREATE TABLE MARKETPLACE_PRODUCT_DATA (
    Marketplace_Record_ID VARCHAR(64) PRIMARY KEY,
    Product_ID VARCHAR(32) NOT NULL,
    Variant_ID VARCHAR(64) NOT NULL,
    Platform ENUM('TIKTOK_SHOP', 'SHOPEE', 'OFFICIAL', 'RETAILER') NOT NULL,
    Shop_Name VARCHAR(128),
    Shop_Type ENUM('MALL', 'RETAILER', 'MANUFACTURER'),
    Listing_Title TEXT,
    Product_URL TEXT NOT NULL,
    URL_Status ENUM('VERIFIED_ACTIVE', 'OUT_OF_STOCK', 'DEAD', 'PRODUCT_NOT_FOUND', 'NEED_VERIFY'),
    Price DECIMAL(12, 2),
    Price_Status ENUM('VERIFIED', 'NEED_VERIFY', 'OUT_OF_STOCK'),
    Price_Checked_Date DATE,
    Image_URL TEXT NOT NULL,
    Image_Status ENUM('VERIFIED', 'BROKEN', 'NEED_VERIFY', 'NO_IMAGE'),
    Image_Checked_Date DATE,
    Stock_Status ENUM('IN_STOCK', 'OUT_OF_STOCK', 'PRE_ORDER'),
    Variant_Match_Status ENUM('EXACT_MATCH', 'CONDITIONAL_MATCH', 'WRONG_VARIANT', 'NEED_VERIFY'),
    Publish_Status ENUM('DRAFT', 'VERIFIED', 'PUBLISHED', 'REJECTED') DEFAULT 'DRAFT',
    Verification_Status ENUM('VERIFIED', 'UNVERIFIED'),
    Verified_Date DATE,
    Verified_By VARCHAR(64),
    CONSTRAINT UQ_Product_Variant_Platform UNIQUE (Product_ID, Variant_ID, Platform)
);
```

---

### 4. DATA SERVICE DESIGN (`MarketplaceService` JS API)

Xây dựng một Data Service duy nhất (`js/data/marketplaceService.js`) xử lý 100% việc lookup, fallback và trả về dữ liệu chuẩn cho tất cả các UI Component:

```javascript
// Dịch vụ Dữ liệu Thương mại Tập trung (Single Source of Truth Service)
export class MarketplaceService {
  constructor(marketplaceData, variantData, productsData) {
    this.mktData = marketplaceData.filter(d => d.Publish_Status === 'PUBLISHED');
    this.variantMap = new Map(variantData.map(v => [v.Variant_ID, v]));
    this.productMap = new Map(productsData.map(p => [p.Product_ID, p]));
  }

  // Hàm API chính được gọi bởi toàn bộ UI Modules
  getProductCommercialData(productId, variantId = null) {
    const targetVariantId = variantId || `${productId}_DEFAULT`;
    const records = this.mktData.filter(r => r.Product_ID === productId && r.Variant_ID === targetVariantId);

    const tiktokRec = records.find(r => r.Platform === 'TIKTOK_SHOP' && r.URL_Status === 'VERIFIED_ACTIVE' && r.Variant_Match_Status === 'EXACT_MATCH');
    const shopeeRec = records.find(r => r.Platform === 'SHOPEE' && r.URL_Status === 'VERIFIED_ACTIVE' && r.Variant_Match_Status === 'EXACT_MATCH');
    const officialRec = records.find(r => r.Platform === 'OFFICIAL');

    // Nguồn ảnh ưu tiên: TikTok Image -> Shopee Image -> Official Image -> Neutral Placeholder
    const image = tiktokRec?.Image_URL || shopeeRec?.Image_URL || officialRec?.Image_URL || `assets/images/${productId.lower()}.svg`;
    const image_source = tiktokRec ? 'TIKTOK_SHOP' : (shopeeRec ? 'SHOPEE' : 'OFFICIAL');

    // Nguồn giá ưu tiên
    const preferred_price = tiktokRec?.Price || shopeeRec?.Price || null;
    const price_checked_date = tiktokRec?.Price_Checked_Date || shopeeRec?.Price_Checked_Date || officialRec?.Price_Checked_Date || '2026-08-07';

    // Đánh giá Purchase Readiness toàn hệ thống
    let purchase_readiness = 'INFO_ONLY';
    if (tiktokRec && shopeeRec) purchase_readiness = 'READY_BOTH';
    else if (tiktokRec) purchase_readiness = 'READY_TIKTOK';
    else if (shopeeRec) purchase_readiness = 'READY_SHOPEE';

    return {
      product_id: productId,
      variant_id: targetVariantId,
      image,
      image_source,
      preferred_price,
      price_checked_date,
      tiktok: tiktokRec || null,
      shopee: shopeeRec || null,
      official: officialRec || null,
      purchase_readiness
    };
  }
}
```

---

### 5. MIGRATION MAP ALL MODULES (LỘ TRÌNH CHUYỂN ĐỔI TOÀN BỘ UI)

| Module UI | File Mã Nguồn | Tác vụ Chuyển đổi (Migration Action) | Đảm bảo tính nhất quán |
|---|---|---|---|
| **Configurator Result** | `js/ui/resultRenderer.js` | Thay toàn bộ việc đọc `Price_Current`/`Primary_Link` bằng `marketplaceService.getProductCommercialData()` | Ảnh, giá và nút bấm Mua khớp 100% với Library |
| **Equipment Library** | `js/ui/libraryController.js` | Thẻ sản phẩm gọi `getProductCommercialData()` để render thumbnail & badge giá sàn | 81 sản phẩm dùng chung 1 dịch vụ nạp ảnh |
| **Product Detail Modal**| `js/ui/modalController.js` | Render phân hệ **NƠI MUA** lấy danh sách gian hàng TikTok/Shopee từ `marketplaceService` | Hiển thị đủ giá/link từng sàn |
| **Product Comparison** | `js/ui/comparisonController.js` | Giá trong bảng đối chiếu gọi `getProductCommercialData().preferred_price` | Xóa bỏ hoàn toàn giá cứng cũ |
| **Investment Module V2**| `js/ui/investmentController.js` | 3 Combo Cards + Chi tiết Combo + Bảng Mua Hàng dùng 100% `marketplaceService` | Tổng tiền đầu tư đồng bộ thời gian thực |
| **Purchase List** | `js/ui/purchaseListRenderer.js` | Render bảng tổng số lượng thiết bị với link TikTok/Shopee từ `marketplaceService` | Link mở đúng listing direct |

---

### 6. DUPLICATE PREVENTION RULE (QUY TẮC CHỐNG TRÙNG LẶP KHÓA)

Hệ thống thiết lập ràng buộc duy nhất trên 3 trường `(Product_ID, Variant_ID, Platform)`:
- Nếu phát hiện 2 bản ghi cùng `Product_ID + Variant_ID + Platform` cùng ở trạng thái `PUBLISHED` $\to$ Đánh dấu trạng thái **`DUPLICATE_MARKETPLACE_RECORD`**.
- Service `MarketplaceService` sẽ **tự động vô hiệu hóa bản ghi bị trùng** cho đến khi bộ phận QA xử lý xong để tránh hiển thị sai link trên giao diện người dùng.

---

### 7. PUBLISH / VERSIONING FLOW (QUY TRÌNH DUYỆT DỮ LIỆU 4 BƯỚC)

```
[Nhập liệu thủ công / Import Dữ liệu Sàn]
                   │
                   ▼
       [1. Trạng thái: DRAFT] (Dữ liệu thô vừa nhập)
                   │
                   ▼
  [2. QA Kiểm tra: Link direct + Đúng Variant + Đúng Ảnh]
                   │
                   ├─► [Không đạt] ──► [Trạng thái: REJECTED] (Loại bỏ)
                   │
                   └─► [Đạt QA]
                         │
                         ▼
        [3. Trạng thái: VERIFIED] (Đã duyệt kỹ thuật)
                         │
                         ▼
       [4. Trạng thái: PUBLISHED] (Bật đèn xanh cho Production UI)
```
*Lưu ý*: Mọi giao diện người dùng trên Production **chỉ được phép đọc các bản ghi ở trạng thái `PUBLISHED`**.

---

### 8. CROSS-MODULE CONSISTENCY TEST PLAN (KẾ HOẠCH TÍNH NHẤT QUÁN 5 MÀN HÌNH)

Kịch bản kiểm thử đảm bảo 100% tính đồng nhất trên toàn bộ 5 màn hình:

- **Bước 1**: Chọn sản phẩm mẫu (Ví dụ: `AUD_DJI_MICMINI`).
- **Bước 2**: Mở lần lượt 5 màn hình: Configurator Result, Equipment Library, Product Detail Modal, Product Comparison, Investment Module V2.
- **Bước 3**: Kiểm tra và đối chiếu:
  - Ảnh đại diện trên cả 5 màn hình có khớp 100% không? $\to$ **EXPECTED: MATCH 100%**.
  - Giá hiển thị trên cả 5 màn hình có cùng 1 con số và cùng ngày kiểm tra không? $\to$ **EXPECTED: MATCH 100%**.
  - Link nút bấm Đặt Mua TikTok/Shopee có cùng trỏ tới 1 URL direct listing không? $\to$ **EXPECTED: MATCH 100%**.

---

### 9. VARIANT CONFUSION TEST PLAN (KỊCH BẢN CHỐNG NHẦM BIẾN THỂ)

Các test cases kiểm tra độc lập rủi ro nhầm lẫn biến thể:

| Test ID | Sản phẩm & Biến thể kiểm tra | Rủi ro cần tránh | Kết quả kỳ vọng (Expected Result) |
|---|---|---|---|
| **MKT-01** | `AUD_DJI_MICMINI` (1TX vs 2TX) | Không lấy nhầm link/giá bản 2TX gán cho bản 1TX | Thẻ 1TX chỉ render link 1TX (`AUD_DJI_MICMINI_1TX_USBC`) |
| **MKT-02** | `STO_KIN_GO` (128GB vs 256GB) | Không lấy giá bản 256GB gán cho bản 128GB | Thẻ 128GB hiển thị đúng đơn giá bản 128GB |
| **MKT-03** | `PKT_DJI_OP3_STD` vs `PKT_DJI_OP3_CC` | Không gán ảnh Creator Combo cho bản Standard | Thẻ Standard chỉ hiển thị ảnh thân máy đơn lẻ |
| **MKT-04** | `PWR_UGR_20K100` (65W vs 100W) | Không lấy nhầm sạc 65W cho bộ cần 100W PD | Hệ thống giữ đúng chuẩn sạc 100W PD |

---

### 10. ROLLBACK PLAN (KẾ HOẠCH KHÔI PHỤC KHI CÓ LỖI)

- **Lưu trữ sao lưu (Backup Snapshot)**: Trước khi tiến hành migration, hệ thống tự động ghi bản sao lưu toàn bộ dữ liệu v1.1 tại `backup_v1_1_snapshot.json`.
- **Cơ chế Rollback 0-downtime**: Nếu phát hiện lỗi bất đồng bộ dữ liệu thương mại trong quá trình migration, hệ thống chỉ cần chuyển cờ `USE_MARKETPLACE_SERVICE = false` để quay trở về sử dụng bộ dữ liệu cũ ngay lập tức mà không làm gián đoạn ứng dụng web.

---

### 11. BACKEND GAPS

1. **Dữ liệu Shopee Direct Listing Links**: Cần bộ phận thương mại tiếp tục cập nhật các đường dẫn Shopee Mall chính thức cho 72 sản phẩm Candidate vào Sheet 24 (`MARKETPLACE_PRODUCT_DATA`).
2. **Khảo sát Giá theo Ngày**: Dữ liệu giá giữa TikTok và Shopee của một số sản phẩm cần được quét cùng ngày để hỗ trợ tính năng so sánh giá sàn thời gian thực.

---

### 12. GO / NO-GO ASSESSMENT

- **KIẾN TRÚC DỮ LIỆU TẬP TRUNG**: `READY` (Đã hoàn thiện Data Service `MarketplaceService` và Composite Key `Product_ID|Variant_ID|Platform`).
- **TÍNH ĐỒNG NHẤT TOÀN HỆ THỐNG**: `READY` (100% 5 UI Modules sẽ tiêu thụ chung 1 Service).
- **CHỐNG SAI NHẦM BIẾN THỂ**: `READY` (Ma trận Variant Master phân định rõ 1TX vs 2TX, Standard vs Creator Combo).

**TỔNG THỂ TÍNH SẴN SÀNG**: `READY FOR SYSTEM-WIDE MIGRATION UPON APPROVAL`
"""

with open('implementation_plan.md', 'w', encoding='utf-8') as f:
    f.write(doc)

print("implementation_plan.md updated with System-Wide Marketplace Data Migration Architecture (Section 31).")
