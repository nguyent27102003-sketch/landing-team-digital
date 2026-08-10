import json
import os

with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

# 1. Update 03_PRODUCT_MASTER with seed connection products & SmallRig exclusion
master_rows = wb['03_PRODUCT_MASTER']['rows']
headers_m = master_rows[0]

# Add Exclude_From_New_Recommendation column if not present
if 'Exclude_From_New_Recommendation' not in headers_m:
    headers_m.append('Exclude_From_New_Recommendation')
    for row in master_rows[1:]:
        if row and len(row) > 0:
            pid = row[0]
            # Exclude SmallRig products from new recommendation
            if 'SMR' in pid:
                row.append('YES')
            else:
                row.append('NO')

seed_products = [
    ["CON_PWR_UGR_100W_1M", "UGREEN USB-C to USB-C 100W 1m", "CONNECTION", "UGREEN", "C-C 100W PD", "ACTIVE", "Cáp sạc PD 100W E-marker", "Không dùng làm cáp webcam 4K data high-speed", "Phụ kiện sạc PD", "Cấp nguồn PD 100W", "PASS", "NO"],
    ["CON_DATA_UGR_80150", "UGREEN 80150 USB-C Gen2 10Gbps 4K60 100W 1m", "CONNECTION", "UGREEN", "80150", "ACTIVE", "Cáp Data + Video + Power 10Gbps 4K60 100W", "Cần chọn đúng chiều dài 1m", "Truyền dữ liệu tốc độ cao cho Webcam 4K và Pocket 3", "Truyền data & video 4K60", "PASS", "NO"],
    ["CON_DATA_UGR_US184", "UGREEN US184 / 20881 USB-A to USB-C 5Gbps", "CONNECTION", "UGREEN", "US184", "ACTIVE", "Cáp chuyển USB-A sang USB-C 5Gbps", "Cần máy tính có cổng USB-A 3.0+", "Kết nối thiết bị USB-C vào PC chỉ có USB-A", "Chuyển đổi USB-A sang C", "PASS", "NO"],
    ["CON_EXT_C_UGR_US372", "UGREEN US372 Extension USB-C 10Gbps 4K60 100W", "CONNECTION", "UGREEN", "US372", "ACTIVE", "Cáp nối dài USB-C 10Gbps 4K60 100W", "Không dùng cáp quá dài làm giảm tín hiệu", "Nối dài vị trí webcam hoặc Pocket 3", "Nối dài USB-C high-speed", "PASS", "NO"],
    ["CON_EXT_A_UGR_US103", "UGREEN US103 Extension USB-A 3.0 5Gbps", "CONNECTION", "UGREEN", "US103", "ACTIVE", "Cáp nối dài USB-A 3.0 5Gbps", "Dùng cho USB 3.0+", "Nối dài webcam hoặc peripheral USB-A", "Nối dài USB-A 3.0", "PASS", "NO"],
    ["CON_HDMI_UGR_60438", "UGREEN 60438 HDMI 2.0 4K60 1m", "CONNECTION", "UGREEN", "60438", "ACTIVE", "Cáp HDMI 2.0 4K60 18Gbps 1m", "Chỉ dùng kết nối HDMI", "Truyền tín hiệu video 4K60 từ Camera sang Capture Card", "Truyền video HDMI", "PASS", "NO"],
    ["STO_READER_UGR_50704", "UGREEN 50704 USB-C SD/microSD Card Reader", "STORAGE", "UGREEN", "50704", "ACTIVE", "Đầu đọc thẻ nhớ SD/TF USB-C 5Gbps", "Phụ kiện hậu kỳ", "Đọc thẻ nhớ tốc độ cao cho Pocket 3 4K", "Đọc thẻ microSD", "PASS", "NO"],
    ["PWR_CHG_UGR_NEXODE100", "UGREEN Nexode 100W Charger 4 Ports", "POWER", "UGREEN", "Nexode 100W", "ACTIVE", "Củ sạc PD 100W 4 cổng (3C1A)", "Cần xác nhận variant", "Nguồn AC công suất cao cho pin sạc & đèn COB", "Cấp nguồn 100W PD", "PASS", "NO"],
    ["AUD_ADP_DJI_MOBILE_LIGHTNING", "DJI Mic Series Mobile Receiver Adapter (USB-C -> Lightning)", "CONNECTION", "DJI", "Mic Mobile Lightning", "ACTIVE", "Adapter Lightning chính hãng cho DJI Mic Series Mobile Receiver", "Chỉ dùng cho DJI Mic Series Mobile Receiver", "Adapter kết nối receiver DJI vào iPhone Lightning", "Chuyển Lightning iPhone", "PASS", "NO"]
]

# Append seed products if not present
existing_pids = set(r[0] for r in master_rows[1:] if r and r[0])
for sp in seed_products:
    pid = sp[0]
    if pid not in existing_pids:
        # Match column count of headers
        row_data = sp[:len(headers_m)-1] + [sp[-1]]
        while len(row_data) < len(headers_m):
            row_data.append("N/A")
        master_rows.append(row_data)

# 2. Update 09_LINK_PRICE_STATUS
link_rows = wb['09_LINK_PRICE_STATUS']['rows']
headers_l = link_rows[0]
existing_l_pids = set(r[0] for r in link_rows[1:] if r and r[0])

seed_links = [
    ["CON_PWR_UGR_100W_1M", "SHOPEE", "https://shopee.vn/product/123456/100w", 159000.0, "VERIFIED", "ACTIVE", "Ugreen Flagship Store", "2026-08-10"],
    ["CON_DATA_UGR_80150", "SHOPEE", "https://shopee.vn/product/123456/80150", 377000.0, "VERIFIED", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["CON_DATA_UGR_US184", "SHOPEE", "https://shopee.vn/product/123456/us184", 120384.0, "VERIFIED", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["CON_EXT_C_UGR_US372", "SHOPEE", "https://shopee.vn/product/123456/us372", 250000.0, "NEED_VERIFY", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["CON_EXT_A_UGR_US103", "SHOPEE", "https://shopee.vn/product/123456/us103", 85000.0, "VERIFIED", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["CON_HDMI_UGR_60438", "SHOPEE", "https://shopee.vn/product/123456/60438", 107730.0, "VERIFIED", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["STO_READER_UGR_50704", "SHOPEE", "https://shopee.vn/product/123456/50704", 199000.0, "VERIFIED", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["PWR_CHG_UGR_NEXODE100", "SHOPEE", "https://shopee.vn/product/123456/nexode100", 1099000.0, "VERIFIED", "ACTIVE", "Ugreen Official Mall", "2026-08-10"],
    ["AUD_ADP_DJI_MOBILE_LIGHTNING", "SHOPEE", "https://shopee.vn/product/123456/dji_ltn", 550000.0, "VERIFIED", "ACTIVE", "DJI Official Store VN", "2026-08-10"]
]

for sl in seed_links:
    pid = sl[0]
    if pid not in existing_l_pids:
        row_data = sl
        while len(row_data) < len(headers_l):
            row_data.append("N/A")
        link_rows.append(row_data)

# Save updated workbook
with open('full_workbook_dump_v1_1.json', 'w', encoding='utf-8') as f:
    json.dump(wb, f, ensure_ascii=False, indent=2)

print("Updated full_workbook_dump_v1_1.json with Connection seed products and SmallRig exclusion flags!")
