// Unified System-Wide Marketplace Service (Single Commercial Source of Truth)
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
