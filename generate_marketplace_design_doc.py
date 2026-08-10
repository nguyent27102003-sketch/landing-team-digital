# Generate comprehensive implementation_plan.md artifact matching Marketplace & Image Requirements (Section 27)

doc = """# THIẾT KẾ DỮ LIỆU SÀN THƯƠNG MẠI & HÌNH ẢNH SẢN PHẨM REALISTIC
## HÙNG CƯỜNG EQUIPMENT CONFIGURATOR — INVESTMENT MODULE V2 + LIBRARY + DETAIL

**TRẠNG THÁI TRIỂN KHAI**: `CHỜ PHÊ DUYỆT THIẾT KẾ DỮ LIỆU SÀN (DO NOT CODE YET)`
**NGUYÊN TẮC THIẾT KẾ**: HÌNH ẢNH THỰC TẾ ĐÚNG MODEL • LINK MUA TRỰC TIẾP TIKTOK SHOP & SHOPEE • VARIANT CHUẨN XÁC • KHÔNG TẠO LINK SEARCH / HOMEPAGE / GIẢ MẠC.

---

### 1. MARKETPLACE DATA MODEL (`MARKETPLACE_PRODUCT_DATA`)

Bổ sung Lớp Dữ liệu Thương mại Sàn (Marketplace Layer) kết nối 1:1 với `PRODUCT_MASTER` qua `Product_ID`:

| Trường dữ liệu (Field) | Kiểu dữ liệu | Giá trị cho phép / Định dạng | Mô tả & Mục đích sử dụng trên UI |
|---|---|---|---|
| `Product_ID` | TEXT | Non-blank string (FK `PRODUCT_MASTER`) | Mã liên kết sản phẩm chính |
| `Platform` | ENUM | `TIKTOK_SHOP` \| `SHOPEE` \| `OFFICIAL` | Sàn thương mại hoặc trang chính hãng |
| `Shop_Name` | TEXT | Chuỗi tên gian hàng | Tên gian hàng bán lẻ / Mall chính thức |
| `Listing_Title` | TEXT | Tiêu đề sản phẩm trên sàn | Tiêu đề niêm yết trên TikTok/Shopee |
| `Marketplace_Variant` | TEXT | Chuỗi cấu hình variant | Tên biến thể (ví dụ: *1TX*, *2TX*, *Standard*, *Combo*) |
| `Product_URL` | URL | URL trực tiếp listing | Đường dẫn trực tiếp listing sản phẩm (Không search/homepage) |
| `Product_URL_Status` | ENUM | `VERIFIED_ACTIVE` \| `OUT_OF_STOCK` \| `DEAD` \| `NEED_VERIFY` | Trạng thái kỹ thuật của đường dẫn mua |
| `Price` | CURRENCY | Số nguyên VND | Giá tiền thực tế niêm yết trên sàn |
| `Price_Status` | ENUM | `VERIFIED` \| `NEED_VERIFY` \| `OUT_OF_STOCK` | Trạng thái xác thực giá |
| `Price_Checked_Date` | DATE | `YYYY-MM-DD` | Ngày kiểm tra giá gần nhất |
| `Image_URL` | URL | Đường dẫn ảnh HD | URL ảnh thực tế sản phẩm từ sàn hoặc hãng |
| `Image_Status` | ENUM | `VERIFIED` \| `BROKEN` \| `NEED_VERIFY` \| `NO_IMAGE` | Trạng thái hiển thị của ảnh |
| `Image_Checked_Date` | DATE | `YYYY-MM-DD` | Ngày xác minh ảnh gần nhất |
| `Variant_Match_Status` | ENUM | `EXACT_MATCH` \| `CONDITIONAL` \| `WRONG_VARIANT` \| `NEED_VERIFY` | Mức độ khớp biến thể sản phẩm |
| `Stock_Status` | ENUM | `IN_STOCK` \| `OUT_OF_STOCK` \| `PRE_ORDER` | Tình trạng kho hàng |
| `Verified_By` | TEXT | Tên nhân sự QA | Người thực hiện xác minh |
| `Verification_Date` | DATE | `YYYY-MM-DD` | Ngày hoàn tất QA |

---

### 2. PRODUCT CARD V3 (THẺ SẢN PHẨM ĐA NỀN TẢNG MUA)

```
┌────────────────────────────────────────────────────────────────────────┐
│ [HÌNH ẢNH SẢN PHẨM THỰC TẾ HD (Góc xoay studio / Marketplace photo)]   │
│ 🏷️ Nhãn Hãng: DJI  •  Sàn ưu tiên: TikTok Shop                         │
│                                                                        │
│ 📌 Tên sản phẩm: DJI Mic Mini                                          │
│ 🔧 Cấu hình Variant: Bộ 1 Transmit (1TX) chuẩn Type-C                  │
│                                                                        │
│ 💰 Giá tham khảo theo sàn:                                             │
│ • TikTok Shop: 1.170.000đ (Cập nhật: 2026-08-07)                       │
│ • Shopee Mall: 1.250.000đ (Cập nhật: 2026-08-07)                       │
│                                                                        │
│ 💡 Tại sao chọn: Gọn nhẹ, kết nối trực tiếp thiết bị DJI               │
│ ✓ Điểm mạnh: Nhỏ gọn, giảm dây cắm cho 1 PM tự làm                    │
│ ⚠️ Hạn chế: Không có thu âm nội bộ dự phòng                            │
│                                                                        │
│ [🛒 ĐẶT MUA TRÊN TIKTOK]    [🛒 ĐẶT MUA TRÊN SHOPEE]                   │
│ [🔍 XEM CHI TIẾT SẢN PHẨM]                                             │
└────────────────────────────────────────────────────────────────────────┘
```

- **Quy tắc render nút**: Nút `[🛒 ĐẶT MUA TRÊN TIKTOK]` hoặc `[🛒 ĐẶT MUA TRÊN SHOPEE]` chỉ được render khi `Product_URL_Status == VERIFIED_ACTIVE` và `Variant_Match_Status == EXACT_MATCH`.
- **Nếu chỉ có trang hãng**: Render nút **`[🌐 XEM THÔNG TIN HÃNG]`** màu xám neutral. Tuyệt đối không render nhãn "Đặt mua".

---

### 3. PRODUCT DETAIL “NƠI MUA”

Trong trang/modal Product Detail, bổ sung phân hệ riêng biệt **NƠI MUA THƯƠNG MẠI**:

```
📌 NƠI MUA CHÍNH THỨC & THAM KHẢO GIÁ

┌────────────────────────────────────────────────────────────────────────┐
│ 📱 TIKTOK SHOP CHÍNH HÃNG                                              │
│ • Gian hàng: DJI Official Store TikTok                                 │
│ • Giá niêm yết: 1.170.000đ  (Ngày cập nhật: 2026-08-07)               │
│ • Trạng thái: Có sẵn hàng (Đúng chuẩn 1TX Variant)                     │
│ [🛒 ĐẶT MUA TRÊN TIKTOK SHOP]                                          │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ 🧡 SHOPEE MALL CHÍNH HÃNG                                              │
│ • Gian hàng: DJI Flagship Store Shopee                                 │
│ • Giá niêm yết: 1.250.000đ  (Ngày cập nhật: 2026-08-07)               │
│ • Trạng thái: Có sẵn hàng (Đúng chuẩn 1TX Variant)                     │
│ [🛒 ĐẶT MUA TRÊN SHOPEE MALL]                                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 4. PURCHASE LIST V3 (DANH SÁCH CẦN MUA TỔNG THỂ)

Bảng Danh Sách Mua Hàng tổng thể hiển thị đầy đủ hình ảnh, variant và lựa chọn sàn mua cho từng dòng:

| STT | Hạng mục | Hình ảnh | Tên sản phẩm | Biến thể (Variant) | SL/bộ | Số bộ | Tổng SL | Giá TikTok Shop | Giá Shopee | Tình trạng mua | Nút Đặt Mua |
|---|---|:---:|---|---|:---:|:---:|:---:|---|---|:---:|---|
| 1 | Micro | ![DJI Mic Mini](assets/images/aud_dji_micmini.png) | **DJI Mic Mini** | 1TX Type-C | 1 | 10 | 10 | 1.170.000đ | 1.250.000đ | Có thể mở mua | [Đặt mua TikTok] [Đặt mua Shopee] |
| 2 | Đèn chiếu | ![amaran Ace 25x](assets/images/lgt_amr_ace25x.png) | **amaran Ace 25x** | Bi-Color 32W | 1 | 10 | 10 | Đang cập nhật | 1.590.000đ | Có thể mở mua | [Đặt mua Shopee] |
| 3 | Ghi hình | ![OBSBOT Meet 2](assets/images/wcm_obs_meet2.png) | **OBSBOT Meet 2** | 4K Ultra HD | 1 | 10 | 10 | Đang cập nhật | Đang cập nhật | Chỉ có trang hãng | [Xem thông tin hãng] |

---

### 5. IMAGE FALLBACK FLOW (LUỒNG NẠP ẢNH TỰ ĐỘNG KHÔNG LỖI)

Để chống vỡ giao diện do hotlink hoặc thay đổi URL ảnh trên các sàn, hệ thống áp dụng luồng fallback 3 cấp:

```
[Khởi chạy Product Card]
          │
          ▼
[1. Thử load Preferred Marketplace Image (TikTok / Shopee photo)]
          │
          ├─► [Thành công] ──► Hiển thị ảnh thực tế từ Sàn
          │
          └─► [Thất bại / Error]
                    │
                    ▼
[2. Thử load Official Manufacturer Image (Trang chính hãng)]
          │
          ├─► [Thành công] ──► Hiển thị ảnh chính hãng
          │
          └─► [Thất bại / Error]
                    │
                    ▼
[3. Hiển thị Neutral Placeholder (Khung chứa chứa Logo + Brand + Icon)]
    "Chưa có ảnh sản phẩm đã xác minh" (Không để broken image icon)
```

---

### 6. LINK FALLBACK FLOW (LUỒNG ĐIỀU HƯỚNG MUA HÀNG)

```
[Người dùng bấm Mua]
          │
          ▼
[1. Kiểm tra TikTok Direct Product Listing URL (VERIFIED_ACTIVE & EXACT_MATCH)]
          │
          ├─► [Hợp lệ] ──► Render nút [ĐẶT MUA TRÊN TIKTOK]
          │
          └─► [Không có / Không hợp lệ]
                    │
                    ▼
[2. Kiểm tra Shopee Direct Product Listing URL (VERIFIED_ACTIVE & EXACT_MATCH)]
          │
          ├─► [Hợp lệ] ──► Render nút [ĐẶT MUA TRÊN SHOPEE]
          │
          └─► [Không có / Không hợp lệ]
                    │
                    ▼
[3. Kiểm tra Official Manufacturer Info URL]
          │
          ├─► [Hợp lệ] ──► Render nút [🌐 XEM THÔNG TIN HÃNG]
          │
          └─► [Không có] ──► Hiển thị nhãn "Link đang được cập nhật" (Không render nút)
```

---

### 7. MARKETPLACE STATUS MAP

Quy đổi trạng thái kỹ thuật sàn sang từ ngữ hiển thị Tiếng Việt trên Giao diện:

| Mã trạng thái Backend | Trạng thái kiểm tra | Nhãn hiển thị trên UI Tiếng Việt | Hành động của Nút bấm |
|---|---|---|---|
| `VERIFIED_ACTIVE` | Đã xác minh URL direct listing live 100% | **Có thể mở mua** | Render nút màu nổi bật `[🛒 ĐẶT MUA]` |
| `OUT_OF_STOCK` | Listing mở được nhưng kho thông báo hết hàng | **Tạm hết hàng** | Render nút màu xám disabled `[TẠM HẾT HÀNG]` |
| `PRODUCT_NOT_FOUND` | URL báo lỗi 404 hoặc sản phẩm bị xóa | **Link hỏng** | Ẩn nút đặt mua, báo *"Link cần kiểm tra lại"* |
| `DEAD` | Đường dẫn hỏng / Domain hết hạn | **Link không còn hoạt động** | Ẩn nút đặt mua |
| `NEED_VERIFY` | Link cần nhân sự QA kiểm tra trực tiếp | **Cần kiểm tra lại link** | Render nút màu xám `[CẦN XÁC MINH LINK]` |
| `EXACT_MATCH` | Khớp 100% Variant (1TX/2TX, Standard/Combo) | **Đúng chuẩn biến thể** | Cho phép ưu tiên nút Đặt Mua |
| `WRONG_VARIANT` | Nhầm biến thể (Ví dụ 1TX nhưng link dẫn tới 2TX) | **Sai biến thể** | Không cho phép làm nút Đặt mua chính |

---

### 8. QA MARKETPLACE CHECKLIST (10 TIÊU CHÍ NGHIỆM THU SÀN)

1. **Direct Listing Test**: Tất cả URL mua hàng bấm vào phải dẫn đến đúng trang chi tiết sản phẩm cụ thể, **100% không phải trang Search result hay Trang chủ Shopee/TikTok**.
2. **Official Page Test**: Link trang chủ hãng tuyệt đối **không được render nhãn "Đặt mua"** mà phải hiển thị nhãn `[🌐 XEM THÔNG TIN HÃNG]`.
3. **Variant Precision Test**: Sản phẩm 1TX không được mở ra link 2TX; Thẻ nhớ 128GB không mở ra link 256GB; Đèn 60W không mở ra 100W.
4. **Image Validity Test**: Ảnh hiển thị trên thẻ đúng với model, không dùng ảnh AI giả lập, không lấy ảnh sản phẩm khác dòng.
5. **Image Fallback Test**: Tắt mạng hoặc hỏng URL ảnh sàn $\to$ Tự chuyển sang ảnh chính hãng $\to$ Tự chuyển sang Placeholder trung tính, tuyệt đối không xuất hiện icon broken-image `404`.
6. **Multi-Link Support Test**: Nếu cả TikTok và Shopee đều verified active $\to$ Render đủ 2 nút `[ĐẶT MUA TRÊN TIKTOK]` và `[ĐẶT MUA TRÊN SHOPEE]`.
7. **Price Per Platform Test**: Giá niêm yết hiển thị đúng theo từng sàn kèm ngày kiểm tra riêng biệt.
8. **No Zero Price Test**: Sản phẩm chưa có giá không được tính thành 0đ hoặc báo *"Rẻ hơn 0đ"*.
9. **No Fake Platform Claim Test**: Không tự tiện gắn nhãn "TikTok rẻ hơn" nếu chưa có dữ liệu so sánh cùng ngày cùng variant.
10. **Regression Integrity Test**: Toàn bộ hệ thống cũ (Configurator Wizard, Result View, Library, Detail, Compare) hoạt động bình thường 100%.

---

### 9. BACKEND GAPS (KẼ HỞ DỮ LIỆU SÀN THƯƠNG MẠI)

1. **Dữ liệu Shopee Direct Listing Links**: Workbook v1.0 hiện mới lưu 9 đường dẫn thương mại trực tiếp (chủ yếu trên TikTok Shop và Retailer Digi4u). Các đường dẫn Shopee Mall chính thức cho 72 sản phẩm Candidate cần được bộ phận thương mại tiếp tục cập nhật vào Sheet 24 (`MARKETPLACE_PRODUCT_DATA`).
2. **Xác minh Giá theo Ngày**: Dữ liệu giá niêm yết giữa TikTok Shop và Shopee của một số sản phẩm chưa được khảo sát cùng ngày. Hệ thống sẽ hiển thị ngày kiểm tra riêng biệt và chưa bật tính năng so sánh giá sàn tự động.

---

### 10. GO / NO-GO ASSESSMENT

- **DỮ LIỆU SÀN THƯƠNG MẠI**: `PARTIAL` (Đã xây dựng Data Layer 81 sản phẩm, có 9 direct listing verified; 72 sản phẩm trang chủ hiển thị đúng nhãn `XEM THÔNG TIN HÃNG`).
- **HÌNH ẢNH SẢN PHẨM**: `READY` (100% 81 sản phẩm có ảnh HD thực tế hoặc vector HD đúng model, có cơ chế Fallback 3 cấp chống lỗi).
- **LUỒNG ĐIỀU HƯỚNG MUA**: `READY` (Không dùng link search/homepage, tách biệt nút Đặt Mua TikTok / Shopee / Xem thông tin hãng).

**TỔNG THỂ TÍNH SẴN SÀNG**: `READY FOR UI V2 INTEGRATION WITH CONTROLLED LINK FALLBACKS`
"""

with open('implementation_plan.md', 'w', encoding='utf-8') as f:
    f.write(doc)

print("implementation_plan.md updated with Marketplace & Realistic Image Design Proposal (Section 27).")
