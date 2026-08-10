# Generate comprehensive implementation_plan.md artifact matching UI/UX V2 Requirements (Section 41)

doc = """# THIẾT KẾ GIAO DIỆN UI/UX V2 (DECISION-FOCUSED INVESTMENT MODULE)
## HÙNG CƯỜNG EQUIPMENT CONFIGURATOR — MODULE ĐỀ XUẤT ĐẦU TƯ BỘ THIẾT BỊ CHO PM

**TRẠNG THÁI TRIỂN KHAI**: `CHỜ PHÊ DUYỆT WIREFRAME V2 (DO NOT CODE YET)`
**NGUYÊN TẮC THIẾT KẾ**: ĐƠN GIẢN – DỄ HIỂU – DỄ CHỈNH – DỄ TRÌNH SẾP – RA QUYẾT ĐỊNH NHANH.
**NGÔN NGỮ**: 100% TIẾNG VIỆT THUẦN TÚY (XÓA SẠCH THUẬT NGỮ ANH/TECHNICAL TRÊN GIAO DIỆN CHÍNH).

---

### 1. WIREFRAME V2 (BỐ CỤC 5 KHU VỰC CHÍNH)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ SITE HEADER: [HC Logo HÙNG CƯỜNG]  Trang chủ | Tìm combo | Thư viện thiết bị | Thiết bị đề xuất | Đề xuất đầu tư │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KHU VỰC 1: ĐIỀU KIỆN ĐỀ XUẤT (Form chỉnh từng trường độc lập, không reset wizard)                       │
│ • Nhu cầu: [x] Livestream  [x] Quay video ngắn  [ ] Quay video dài  [x] Chụp sản phẩm  [ ] Chụp người    │
│ • Số người lên hình: [1 người v]   • Di chuyển: [Di chuyển nhiều v]   • Lắp đặt: [1 PM tự lắp v]      │
│ • Không gian: [Shop v]            • Ưu tiên: [Cân bằng v]             • Thiết bị đã có: [Đã có máy v] │
│ • Ngân sách/bộ: [5.000.000đ]      • Số bộ cần mua: [10 bộ]            [⚡ CẬP NHẬT ĐỀ XUẤT]            │
│ ─────────────────────────────────────────────────────────────────────────────────────────────────────── │
│ 💡 Đang tìm bộ thiết bị cho: Livestream + Quay video ngắn • 1 người • 1 PM tự lắp • Di chuyển nhiều...  │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KHU VỰC 2: 3 COMBO ĐỀ XUẤT (Thẻ nằm ngang trên Desktop, xếp dọc trên Mobile)                              │
│                                                                                                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ COMBO 1: TIẾT KIỆM          │  │ COMBO 2: CÂN BẰNG           │  │ COMBO 3: NÂNG CẤP           │  │
│  │                             │  │ ⭐ ĐỀ XUẤT NÊN CHỌN         │  │                             │  │
│  │ 2.560.000đ / bộ             │  │ 2.760.000đ / bộ             │  │ Đã xác định: 0đ             │  │
│  │ Tổng 10 bộ: 25.600.000đ     │  │ Tổng 10 bộ: 27.600.000đ     │  │ + 2 món chưa có giá chính   │  │
│  │                             │  │                             │  │                             │  │
│  │ Phù hợp: Live + Video shop  │  │ Phù hợp: Live cơ động 1 PM  │  │ Phù hợp: Thu âm pro & COB   │  │
│  │ Điểm mạnh: Chi phí thấp     │  │ Điểm mạnh: Gọn, chuẩn màu   │  │ Điểm mạnh: Ghi âm 32-bit    │  │
│  │ Hạn chế: Đèn công suất nhẹ  │  │ Hạn chế: Khó mở rộng phòng  │  │ Hạn chế: Nặng, cần 100W PD  │  │
│  │                             │  │                             │  │                             │  │
│  │ [CHỌN COMBO NÀY]            │  │ [✓ ĐÃ CHỌN COMBO NÀY]       │  │ [CHỌN COMBO NÀY]            │  │
│  │ [🔍 Xem chi tiết combo]     │  │ [🔍 Xem chi tiết combo]     │  │ [🔍 Xem chi tiết combo]     │  │
│  └─────────────────────────────┘  └─────────────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KHU VỰC 3: SO SÁNH NHANH 3 COMBO (So sánh các chỉ tiêu bằng tiếng Việt dễ hiểu)                          │
│ ┌─────────────────────────────┬──────────────────────┬──────────────────────┬─────────────────────────┐ │
│ │ Tiêu chí so sánh            │ Combo Tiết kiệm      │ Combo Cân bằng (Chịn)│ Combo Nâng cấp          │ │
│ ├─────────────────────────────┼──────────────────────┼──────────────────────┼─────────────────────────┤ │
│ │ Chi phí / 1 bộ              │ 2.560.000đ           │ 2.760.000đ           │ Đã biết 0đ (+2 món)     │ │
│ │ Tổng đầu tư (10 bộ)         │ 25.600.000đ          │ 27.600.000đ          │ Chưa đủ giá chính xác   │ │
│ │ Mức độ cơ động              │ Rất cơ động          │ Rất cơ động          │ Cơ động vừa phải        │ │
│ │ Mức độ dễ lắp đặt           │ Đơn giản (1 PM)      │ Đơn giản (1 PM)      │ Phức tạp (Cần sạc PD)   │ │
│ │ Khả năng nâng cấp           │ Tiêu chuẩn           │ Khá                  │ Rất cao (Có timecode)   │ │
│ └─────────────────────────────┴──────────────────────┴──────────────────────┴─────────────────────────┘ │
│ ── NẾU CHỌN COMBO CÂN BẰNG THAY TIẾT KIỆM: Tăng 200.000đ/bộ (Tổng 10 bộ tăng 2.000.000đ). Đổi lại nhận   │
│    đèn chuẩn màu hơn và chân gá chắc chắn hơn.                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KHU VỰC 4: CHI TIẾT COMBO ĐANG XEM (Hiển thị các sản phẩm trong Combo đang chọn)                         │
│ 📌 Tiêu đề: THÀNH PHẦN TRONG COMBO CÂN BẰNG                                                              │
│ Vì sao có combo này: "Anh đang cần bộ dùng chung cho PM di chuyển shop..."                              │
│                                                                                                         │
│ ┌───────────────────────────────────────┐  ┌───────────────────────────────────────┐                  │
│ │ [Ảnh sản phẩm DJI Mic Mini]           │  │ [Ảnh sản phẩm amaran Ace 25x]         │                  │
│ │ 🎙️ Micro • DJI Mic Mini               │  │ 💡 Đèn chiếu sáng • amaran Ace 25x    │                  │
│ │ Giá: 1.170.000đ (Cập nhật 2026-08-07) │  │ Giá: 1.590.000đ (Cập nhật 2026-08-07) │                  │
│ │ Số lượng: 1 bộ / kit                  │  │ Số lượng: 1 bộ / kit                  │                  │
│ │ Tại sao chọn: Gọn nhẹ, thu âm tốt     │  │ Tại sao chọn: Đèn pin nhỏ gọn 32W     │                  │
│ │ [🛒 ĐẶT MUA (TikTok Shop)]            │  │ [🛒 ĐẶT MUA (Đại lý chính thức)]       │                  │
│ │ [🔍 Xem thêm về sản phẩm]             │  │ [🔍 Xem thêm về sản phẩm]             │                  │
│ └───────────────────────────────────────┘  └───────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KHU VỰC 5: DANH SÁCH MUA HÀNG & TỔNG KẾT BÀN GIAO                                                       │
│ Bảng tính tổng số lượng thiết bị cần mua cho 10 bộ:                                                     │
│ STT | Danh mục  | Tên sản phẩm     | SL/bộ | Số bộ | Tổng SL | Đơn giá    | Thành tiền   | Mua hàng  │
│ 1   | Micro     | DJI Mic Mini     | 1     | 10    | 10      | 1.170.000đ | 11.700.000đ  | [Đặt mua] │
│ 2   | Đèn chiếu | amaran Ace 25x   | 1     | 10    | 10      | 1.590.000đ | 15.900.000đ  | [Đặt mua] │
│ ─────────────────────────────────────────────────────────────────────────────────────────────────────── │
│ 🛈 ĐỀ XUẤT HIỆN TẠI: COMBO CÂN BẰNG • Chi phí/bộ: 2.760.000đ • Tổng 10 bộ: 27.600.000đ                   │
│ [🖨️ IN / XUẤT ĐỀ XUẤT TRÌNH SẾP]                                                                        │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2. UI COMPONENT MAP

Mapping các thành phần giao diện V2 với thẻ HTML/CSS:

| Khu vực UI | Tên Component | Cấu trúc HTML/CSS Class | Chức năng tương tác |
|---|---|---|---|
| Menu chính | Investment Nav Link | `<li><a class="nav-link" data-route="investment">Đề xuất đầu tư</a></li>` | Chuyển trang SPA sang `#investment` |
| Khu vực 1 | Option Controls Form | `<div class="investment-controls-card">` | Chứa 9 ô điều khiển dạng dropdown/multi-select |
| Khu vực 1 | Scenario Summary Pill | `<div class="scenario-summary-bar">` | Hiển thị tóm tắt điều kiện hiện tại thời gian thực |
| Khu vực 2 | Investment Combo Grid | `<div class="investment-cards-grid">` | Lưới chứa 2–3 thẻ Combo nằm ngang (Responsive stack) |
| Khu vực 2 | Recommended Badge | `<span class="badge badge-recommended-glow">ĐỀ XUẤT NÊN CHỌN</span>` | Nổi bật combo được chọn bởi engine |
| Khu vực 3 | Fast Comparison Matrix | `<div class="fast-comp-table-wrap">` | Bảng so sánh 8 tiêu chí thuần Việt |
| Khu vực 3 | Delta Difference Banner| `<div class="delta-diff-box">` | Hiển thị chênh lệch chi phí & giá trị nhận thêm |
| Khu vực 4 | Active Combo Details | `<div class="combo-details-section">` | Hiển thị thông tin lý do + sản phẩm trong combo |
| Khu vực 4 | Product Card Item | `<div class="inv-product-card">` | Thẻ sản phẩm kèm ảnh HD, tại sao chọn, nút Đặt mua |
| Khu vực 5 | Aggregate Purchase Table| `<div class="purchase-table-wrap">` | Bảng tính Tổng số lượng = `Quantity_Per_Kit × Kit_Count` |
| Khu vực 5 | Print Action Button | `<button class="btn btn-primary btn-lg" onclick="window.print()">` | Kích hoạt giao diện in trình quản lý (`@media print`) |

---

### 3. BACKEND → UI FIELD MAPPING

Mapping 1:1 từ Backend v1.1 Sheet 21 (`21_INVESTMENT_OPTION_OUTPUT`) sang Giao diện UI V2:

| Field trong Backend v1.1 | Trường hiển thị trên UI V2 | Cách biến đổi & Định dạng hiển thị |
|---|---|---|
| `Option_Type` | Tên Combo | `ECONOMY` $\to$ **COMBO TIẾT KIỆM**, `BALANCED` $\to$ **COMBO CÂN BẰNG**, `UPGRADE` $\to$ **COMBO NÂNG CẤP** |
| `is_recommended` | Huy hiệu Đề xuất | `Yes` $\to$ Render Badge **"⭐ ĐỀ XUẤT NÊN CHỌN"** |
| `Cost_Per_Kit` | Chi phí / 1 bộ | Định dạng tiền tệ VND: `2.760.000đ / bộ` (Nếu `Cost_Status != COMPLETE` $\to$ Hiển thị **"Đã xác định: Xđ (+Y món đang cập nhật)"**) |
| `Total_Investment` | Tổng đầu tư | Định dạng tiền tệ VND: `27.600.000đ` (`Cost_Per_Kit × Kit_Count`) |
| `Why_Option` | Vì sao có phương án này | Đoạn văn giải thích bằng tiếng Việt thuần túy, mô tả sự phù hợp điều kiện |
| `Strength_1..3` | Điểm mạnh chính | Hiển thị dưới dạng bullet điểm mạnh thân thiện |
| `Limitation_1..3` | Hạn chế chính | Hiển thị rõ hạn chế kỹ thuật thực tế để sếp cân nhắc |
| `Tradeoff` | Điểm đánh đổi | Đoạn văn mô tả sự đánh đổi giữa gọn nhẹ, chi phí và khả năng mở rộng |
| `Delta_To_Balanced` | So sánh chênh lệch | Hiển thị mức tăng chi phí/bộ và tổng chi phí khi chọn nâng cấp |
| `Technical_Status` | Tình trạng kỹ thuật | `VALID` $\to$ Đạt chuẩn kỹ thuật, `BLOCKED` $\to$ Không khả thi kỹ thuật |
| `Cost_Status` | Tình trạng giá | `COMPLETE` $\to$ Đã xác định đầy đủ, `INCOMPLETE` $\to$ Cần kiểm tra thêm giá |
| `Purchase_Status` | Tình trạng mua hàng | `READY` $\to$ Sẵn sàng đặt mua, `PARTIAL` / `INFO_ONLY` $\to$ Chỉ có thông tin từ hãng |

---

### 4. VIETNAMESE TERMINOLOGY MAP

Bảng chuẩn hóa 100% tiếng Việt thuần túy (Xóa sạch tiếng Anh & Thuật ngữ kỹ thuật trên UI):

| Thuật ngữ Technical / Backend | Từ ngữ giao diện Tiếng Việt chuẩn hóa |
|---|---|
| `Mobility` | **Mức độ cơ động (Dễ mang đi shop)** |
| `Trade-off` | **Điểm đánh đổi** |
| `Best For` | **Phù hợp nhất khi** |
| `Not For` | **Không phù hợp khi** |
| `Setup Complexity` | **Mức độ dễ lắp đặt** |
| `Upgradeability` | **Khả năng nâng cấp** |
| `Cost Status` | **Tình trạng giá** |
| `Purchase Status` | **Tình trạng mua hàng** |
| `Technical Status` | **Tình trạng kỹ thuật** |
| `Compatibility Gate` | **Đánh giá tương thích** |
| `Known Subtotal` | **Chi phí đã xác định** |
| `NEED_VERIFY` | **Cần kiểm tra lại giá** |
| `INFO_ONLY` | **Chỉ có thông tin từ hãng** |
| `DEAD` | **Link không còn hoạt động** |
| `UNKNOWN` | **Chưa đủ thông tin** |
| `HIGH (Mobility)` | **Rất cơ động (Phù hợp 1 PM tự mang)** |
| `MEDIUM (Mobility)` | **Cơ động vừa phải (Trong tòa nhà)** |
| `LOW (Mobility)` | **Cố định (Đặt tại phòng live/bàn)** |
| `LOW (Setup Complexity)` | **Đơn giản (1 PM tự cắm là chạy)** |
| `BEST_VALUE` | **GIÁ TỐT NHẤT** |
| `BEST_COMPACT` | **GỌN NHẸ NHẤT** |
| `BEST_QUALITY` | **CHẤT LƯỢNG TỐT NHẤT** |

---

### 5. INTERACTION FLOW (LUỒNG TƯƠNG TÁC NGƯỜI DÙNG)

```
[Mở trang Đề xuất đầu tư]
          │
          ▼
[Thay đổi 1 hoặc nhiều trường Input] (Nhu cầu, Số người, Di chuyển, Ưu tiên, Ngân sách, Số bộ...)
          │
          ▼
[Bấm '⚡ CẬP NHẬT ĐỀ XUẤT'] (Hoặc tự động cập nhật sau debounce)
          │
          ▼
[Engine Backend v1.1 tính toán lại Scenario]
          │
          ▼
[Cập nhật đồng thời: 3 Card Combo + Bảng So Sánh Nhanh + Chi Tiết Combo + Bảng Mua Hàng]
          │
          ▼
[Người dùng / Quản lý bấm 'CHỌN COMBO NÀY']
          │
          ▼
[Set Combo đang chọn -> Highlight xanh subtle & Cập nhật Bảng Mua Hàng theo Combo được chọn]
          │
          ▼
[Bấm '🖨️ IN / XUẤT ĐỀ XUẤT TRÌNH SẾP'] -> Mở cửa sổ in ấn chuẩn trang A4 / PDF
```

---

### 6. EMPTY / MISSING DATA STATES (XỬ LÝ DỮ LIỆU THIẾU THỰC TẾ)

| Tình huống thiếu dữ liệu | Giao diện hiển thị chuẩn (User-facing Fallback) |
|---|---|
| Thiếu giá chính thức cho 1 sản phẩm | Hiển thị: *"Đã xác định: X đồng (+ Y sản phẩm chưa có giá chính thức)"*. Không hiển thị 0đ. |
| Thiếu link mua đại lý (Chỉ có trang chủ) | Hiển thị nút: **`[🌐 XEM THÔNG TIN TỪ HÃNG]`** màu xám nhẹ. Không giả làm nút đặt mua. |
| Link mua bị hỏng (`Link_Status == DEAD`) | Ẩn nút mua hàng, hiển thị nhãn: *"Link mua đang được kiểm tra lại"*. |
| Thiếu đoạn giải thích chi tiết từ backend | Hiển thị: *"Hiện chưa đủ dữ liệu để giải thích chi tiết lý do lựa chọn."* (Không để ô trống). |
| Không tính được chênh lệch Delta (Do thiếu giá) | Hiển thị: *"Chưa đủ dữ liệu để tính chênh lệch chi phí chính xác."* |

---

### 7. QA CHECKLIST (KỊCH BẢN KIỂM THỬ GIAO DIỆN)

#### 3 User Journeys bắt buộc phải PASS:
- **JOURNEY 1 (Người lập đề xuất)**: Mở trang $\to$ chỉnh các ô input $\to$ bấm Cập nhật $\to$ xem 3 combo $\to$ chọn combo phù hợp $\to$ kiểm tra danh sách mua hàng $\to$ bấm In trình sếp. *(Kết quả: Hoàn thành 100% trên 1 màn hình, không phải làm wizard).*
- **JOURNEY 2 (Quản lý xem nhanh)**: Mở trang $\to$ đọc 3 card combo $\to$ hiểu rõ giá/bộ và tổng tiền $\to$ xem điểm mạnh/hạn chế bằng tiếng Việt $\to$ ra quyết định chọn. *(Kết quả: Hiểu ngay trong 30 giây không cần dịch thuật ngữ).*
- **JOURNEY 3 (Quản lý soi chi tiết)**: Xem combo $\to$ bấm `[🔍 Xem thêm về sản phẩm]` $\to$ mở Modal chi tiết $\to$ đọc Fact/Impact & xem link hãng. *(Kết quả: Trace được 100% từ Đề xuất $\to$ Sản phẩm $\to$ Bằng chứng Backend).*

#### 20 Acceptance Criteria:
1. 100% nhãn và từ ngữ bằng tiếng Việt thuần túy.
2. Không xuất hiện thuật ngữ technical (`Mobility`, `Trade-off`, `Best For`, `Cost Status`...) trên UI.
3. Input điều chỉnh độc lập từng trường, không bắt làm lại từ đầu.
4. Hiển thị tối đa 3 card Combo rõ ràng.
5. Cờ `is_recommended` lấy đúng từ Backend v1.1.
6. Mỗi Combo đều có Lý do chọn, Điểm mạnh, Hạn chế, Đánh đổi bằng câu tiếng Việt.
7. Không tính giá missing thành 0đ.
8. Bảng tính Tổng số lượng = `Quantity_Per_Kit × Kit_Count` chuẩn xác.
9. Link TikTok Shop / Đại lý hiển thị đúng nút `[🛒 ĐẶT MUA]`.
10. Link trang chủ hiển thị đúng nút `[🌐 XEM THÔNG TIN TỪ HÃNG]`.
11. Nút In xuất đề xuất hoạt động chuẩn định dạng trang `@media print`.
12. Bảo tồn 100% chức năng và dữ liệu của hệ thống cũ.
"""

with open('implementation_plan.md', 'w', encoding='utf-8') as f:
    f.write(doc)

print("implementation_plan.md updated with UI/UX V2 Design Proposal (Section 41).")
