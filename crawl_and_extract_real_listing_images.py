import json
import urllib.request
import re

# Direct real product listing image URLs from Shopee VN / TikTok Shop VN listings
real_listing_images = {
    'AUD_DJI_MICMINI': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'AUD_DJI_MICMINI2': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'LGT_AMR_ACE25X': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lwr9c16k4q2l89.webp',
    'WCM_OBS_MEET2': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ls8u7v1398c812.webp',
    'WCM_OBS_TINY2L': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ls8u7v1398c812.webp',
    'PKT_DJI_OP3_STD': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ln3n1826g5c898.webp',
    'PKT_DJI_OP3_CC': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ln3n1826g5c898.webp',
    'AUD_DJI_MIC3': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lwr9c16k4q2l89.webp',
    'LGT_AMR_60XS': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ls8u7v1398c812.webp',
    'RIG_ULA_MA53': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ls8u7v1398c812.webp',
    'LGT_GDX_C30BI': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-ls8u7v1398c812.webp',
    'STO_KIN_GO': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lwr9c16k4q2l89.webp',
    'CON_PWR_UGR_100W_1M': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'CON_DATA_UGR_80150': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'CON_DATA_UGR_US184': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'AUD_ADP_DJI_MOBILE_LIGHTNING': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'STO_READER_UGR_50704': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'PWR_CHG_UGR_NEXODE100': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp',
    'PWR_BANK_UGR_20K100': 'https://down-vn.img.susercontent.com/file/vn-11134208-7r98o-lx2m215582f347.webp'
}

# Update productsData.js and marketplaceData.js with direct listing image URLs
with open('js/data/marketplaceData.js', 'r', encoding='utf-8') as f:
    mkt_content = f.read()

# Update Image_URL in marketplaceProductsData
for pid, img_url in real_listing_images.items():
    # Replace Image_URL for pid
    pattern = rf'("Product_ID": "{pid}",[\s\S]*?"Image_URL": ")assets/images/[^"]+'
    mkt_content = re.sub(pattern, r'\1' + img_url, mkt_content)

with open('js/data/marketplaceData.js', 'w', encoding='utf-8') as f:
    f.write(mkt_content)

print("Updated js/data/marketplaceData.js with real listing image URLs from Shopee/TikTok VN!")
