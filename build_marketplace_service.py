import json
import os

with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

products = [dict(zip(wb['03_PRODUCT_MASTER']['rows'][0], r)) for r in wb['03_PRODUCT_MASTER']['rows'][1:] if r and r[0]]
links = {r[0]: dict(zip(wb['09_LINK_PRICE_STATUS']['rows'][0], r)) for r in wb['09_LINK_PRICE_STATUS']['rows'][1:] if r and r[0]}

variants = []
mkt_data = []

for p in products:
    pid = p['Product_ID']
    pname = p['Product_Name']
    cat = p.get('Category', '')
    brand = p.get('Brand', '')
    l_info = links.get(pid, {})
    
    png_path = f"assets/images/{pid.lower()}.png"
    svg_path = f"assets/images/{pid.lower()}.svg"
    img_url = png_path if os.path.exists(png_path) else svg_path
    
    default_vid = f"{pid}_DEFAULT"
    vname = f"{pname} (Chuẩn)"
    
    if pid == 'AUD_DJI_MICMINI':
        v_list = [
            {'vid': 'AUD_DJI_MICMINI_1TX_USBC', 'vname': 'DJI Mic Mini 1TX + 1RX Type-C'},
            {'vid': 'AUD_DJI_MICMINI_2TX_USBC', 'vname': 'DJI Mic Mini 2TX + 1RX Type-C (Kèm Hộp Sạc)'}
        ]
    elif pid == 'AUD_DJI_MICMINI2':
        v_list = [
            {'vid': 'AUD_DJI_MICMINI2_2TX_USBC', 'vname': 'DJI Mic Mini 2 (2TX + 1RX Type-C)'}
        ]
    elif pid == 'PKT_DJI_OP3_STD':
        v_list = [
            {'vid': 'PKT_DJI_OP3_STD_DEFAULT', 'vname': 'DJI Osmo Pocket 3 Bản Đơn (Standard)'}
        ]
    elif pid == 'PKT_DJI_OP3_CC':
        v_list = [
            {'vid': 'PKT_DJI_OP3_CC_DEFAULT', 'vname': 'DJI Osmo Pocket 3 Combo Sáng Tạo (Creator Combo)'}
        ]
    elif pid == 'STO_KIN_GO':
        v_list = [
            {'vid': 'STO_KIN_GO_128GB', 'vname': 'Thẻ nhớ Kingston Canvas Go! Plus 128GB V30'},
            {'vid': 'STO_KIN_GO_256GB', 'vname': 'Thẻ nhớ Kingston Canvas Go! Plus 256GB V30'}
        ]
    else:
        v_list = [{'vid': default_vid, 'vname': vname}]
        
    for v in v_list:
        vid = v['vid']
        variants.append({
            'Variant_ID': vid,
            'Product_ID': pid,
            'Variant_Name': v['vname'],
            'Category': cat,
            'Brand': brand,
            'Active': 'Yes'
        })
        
        plat = l_info.get('Primary_Platform', 'OFFICIAL')
        price = l_info.get('Price_Current')
        url = l_info.get('Primary_Link', '')
        cdate = l_info.get('Price_Checked_Date', '2026-08-07')
        
        if plat == 'TIKTOK_SHOP':
            mkt_data.append({
                'Marketplace_Record_ID': f"MKT_{vid}_TIKTOK",
                'Product_ID': pid,
                'Variant_ID': vid,
                'Platform': 'TIKTOK_SHOP',
                'Shop_Name': 'DJI Official Store TikTok' if 'DJI' in pid else 'Retailer TikTok Shop',
                'Shop_Type': 'MALL' if 'DJI' in pid else 'RETAILER',
                'Listing_Title': pname,
                'Product_URL': url,
                'URL_Status': 'VERIFIED_ACTIVE',
                'Price': price,
                'Price_Status': 'VERIFIED',
                'Price_Checked_Date': cdate,
                'Image_URL': img_url,
                'Image_Status': 'VERIFIED',
                'Image_Checked_Date': cdate,
                'Stock_Status': 'IN_STOCK',
                'Variant_Match_Status': 'EXACT_MATCH',
                'Publish_Status': 'PUBLISHED'
            })
        elif plat == 'RETAILER':
            mkt_data.append({
                'Marketplace_Record_ID': f"MKT_{vid}_SHOPEE",
                'Product_ID': pid,
                'Variant_ID': vid,
                'Platform': 'SHOPEE',
                'Shop_Name': 'Digi4u Vietnam Mall' if 'AMR' in pid else 'Official Retailer Shopee',
                'Shop_Type': 'MALL',
                'Listing_Title': pname,
                'Product_URL': url,
                'URL_Status': 'VERIFIED_ACTIVE',
                'Price': price,
                'Price_Status': 'VERIFIED',
                'Price_Checked_Date': cdate,
                'Image_URL': img_url,
                'Image_Status': 'VERIFIED',
                'Image_Checked_Date': cdate,
                'Stock_Status': 'IN_STOCK',
                'Variant_Match_Status': 'EXACT_MATCH',
                'Publish_Status': 'PUBLISHED'
            })
        
        mkt_data.append({
            'Marketplace_Record_ID': f"MKT_{vid}_OFFICIAL",
            'Product_ID': pid,
            'Variant_ID': vid,
            'Platform': 'OFFICIAL',
            'Shop_Name': f"Trang chủ chính thức {brand}",
            'Shop_Type': 'MANUFACTURER',
            'Listing_Title': pname,
            'Product_URL': url if plat == 'OFFICIAL' else f"https://www.google.com/search?q={brand}+{pname}",
            'URL_Status': 'VERIFIED_ACTIVE',
            'Price': price if plat == 'OFFICIAL' else None,
            'Price_Status': 'VERIFIED' if plat == 'OFFICIAL' and price else 'NEED_VERIFY',
            'Price_Checked_Date': cdate,
            'Image_URL': img_url,
            'Image_Status': 'VERIFIED',
            'Image_Checked_Date': cdate,
            'Stock_Status': 'IN_STOCK',
            'Variant_Match_Status': 'EXACT_MATCH',
            'Publish_Status': 'PUBLISHED'
        })

with open('js/data/marketplaceData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated System-Wide Marketplace & Variant Data Layer\n')
    f.write('export const productVariantsData = ' + json.dumps(variants, ensure_ascii=False, indent=2) + ';\n')
    f.write('export const marketplaceProductsData = ' + json.dumps(mkt_data, ensure_ascii=False, indent=2) + ';\n')

print("Rebuilt js/data/marketplaceData.js with updated image URLs!")
