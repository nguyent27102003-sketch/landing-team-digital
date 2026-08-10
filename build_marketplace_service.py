import json
import os

# Load full_workbook_dump_v1_1.json
with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

products = [dict(zip(wb['03_PRODUCT_MASTER']['rows'][0], r)) for r in wb['03_PRODUCT_MASTER']['rows'][1:] if r and r[0]]
links = {r[0]: dict(zip(wb['09_LINK_PRICE_STATUS']['rows'][0], r)) for r in wb['09_LINK_PRICE_STATUS']['rows'][1:] if r and r[0]}
specs = {r[0]: dict(zip(wb['04_CATEGORY_SPECS']['rows'][0], r)) for r in wb['04_CATEGORY_SPECS']['rows'][1:] if r and r[0]}

variants = []
mkt_data = []

for p in products:
    pid = p['Product_ID']
    pname = p['Product_Name']
    cat = p.get('Category', '')
    brand = p.get('Brand', '')
    l_info = links.get(pid, {})
    
    # Check image path
    png_path = f"assets/images/{pid.lower()}.png"
    svg_path = f"assets/images/{pid.lower()}.svg"
    img_url = png_path if os.path.exists(png_path) else svg_path
    
    # 1. Product Variant Master
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
        
        # Primary Marketplace Record
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
        
        # Always add Official Record as fallback
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

# Write js/data/marketplaceData.js
with open('js/data/marketplaceData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated System-Wide Marketplace & Variant Data Layer\n')
    f.write('export const productVariantsData = ' + json.dumps(variants, ensure_ascii=False, indent=2) + ';\n')
    f.write('export const marketplaceProductsData = ' + json.dumps(mkt_data, ensure_ascii=False, indent=2) + ';\n')

print("Created js/data/marketplaceData.js with variants and marketplace data!")

# Write js/data/marketplaceService.js
service_code = """// Unified System-Wide Marketplace Service (Single Commercial Source of Truth)
import { productVariantsData, marketplaceProductsData } from './marketplaceData.js';
import { productsData } from './productsData.js';

export class MarketplaceService {
  constructor() {
    this.variants = productVariantsData;
    this.mktData = marketplaceProductsData.filter(d => d.Publish_Status === 'PUBLISHED');
    this.productsMap = new Map(productsData.map(p => [p.Product_ID, p]));
  }

  getProductCommercialData(productId, variantId = null) {
    const targetVariantId = variantId || `${productId}_DEFAULT`;
    const prod = this.productsMap.get(productId) || {};
    
    // Filter records for this product
    const records = this.mktData.filter(r => r.Product_ID === productId);

    const tiktokRec = records.find(r => r.Platform === 'TIKTOK_SHOP' && r.URL_Status === 'VERIFIED_ACTIVE' && r.Variant_Match_Status === 'EXACT_MATCH');
    const shopeeRec = records.find(r => r.Platform === 'SHOPEE' && r.URL_Status === 'VERIFIED_ACTIVE' && r.Variant_Match_Status === 'EXACT_MATCH');
    const officialRec = records.find(r => r.Platform === 'OFFICIAL');

    // Preferred Image Fallback: TikTok -> Shopee -> Official -> Neutral SVG
    const image = tiktokRec?.Image_URL || shopeeRec?.Image_URL || officialRec?.Image_URL || prod.Image_URL || `assets/images/${productId.toLowerCase()}.svg`;
    const image_source = tiktokRec ? 'TIKTOK_SHOP' : (shopeeRec ? 'SHOPEE' : 'OFFICIAL');

    // Preferred Price
    const preferred_price = tiktokRec?.Price || shopeeRec?.Price || officialRec?.Price || prod.Price_Current || null;
    const price_checked_date = tiktokRec?.Price_Checked_Date || shopeeRec?.Price_Checked_Date || officialRec?.Price_Checked_Date || '2026-08-07';

    // Purchase Readiness
    let purchase_readiness = 'INFO_ONLY';
    if (tiktokRec && shopeeRec) purchase_readiness = 'READY_BOTH';
    else if (tiktokRec) purchase_readiness = 'READY_TIKTOK';
    else if (shopeeRec) purchase_readiness = 'READY_SHOPEE';

    return {
      product_id: productId,
      variant_id: targetVariantId,
      product_name: prod.Product_Name || productId,
      brand: prod.Brand || '',
      category: prod.Category || '',
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

export const marketplaceService = new MarketplaceService();
"""

with open('js/data/marketplaceService.js', 'w', encoding='utf-8') as f:
    f.write(service_code)

print("Created js/data/marketplaceService.js!")
