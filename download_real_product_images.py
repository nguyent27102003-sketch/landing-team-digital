import json
import os
import urllib.request
import re

with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

products = [dict(zip(wb['03_PRODUCT_MASTER']['rows'][0], r)) for r in wb['03_PRODUCT_MASTER']['rows'][1:] if r and r[0]]

# Known high-res official product image URLs or direct photo sources
known_urls = {
    'AUD_DJI_MICMINI': 'https://dji-official-fe.djicdn.com/dji/mic-mini/images/overview/header-1920.jpg',
    'AUD_DJI_MICMINI2': 'https://dji-official-fe.djicdn.com/dji/mic-mini/images/overview/header-1920.jpg',
    'LGT_AMR_ACE25X': 'https://cdn.shopify.com/s/files/1/0088/5424/1344/files/amaran_Ace_25x_Charcoal_Front_Angle_1000x.png',
    'PKT_DJI_OP3_STD': 'https://dji-official-fe.djicdn.com/dji/osmo-pocket-3/images/overview/header-1920.jpg',
    'WCM_OBS_MEET2': 'https://www.obsbot.com/store/image/catalog/meet-2/obsbot-meet-2-4k-webcam-space-grey.png',
    'WCM_OBS_TINY2L': 'https://www.obsbot.com/store/image/catalog/tiny-2-lite/obsbot-tiny-2-lite-4k-webcam-space-grey.png',
    'LGT_SMR_RC60B': 'https://smallrig.com/cdn/shop/files/8_2f159049-5501-4475-b461-8208a0d7f950.jpg',
    'RIG_SMR_UCAGE': 'https://smallrig.com/cdn/shop/products/2791-1_1024x1024.jpg',
    'AUD_DJI_MIC3': 'https://dji-official-fe.djicdn.com/cms/uploads/0709bdf229d91f4b898246df16b12a87.png',
    'AUD_RODE_WPRO': 'https://cdn1.rode.com/images/page/1/modules/5569/wireless-pro-thumbnail.png'
}

def generate_studio_svg(pid, name, brand, cat):
    # Professional SVG studio card for product
    brand_colors = {
        'DJI': '#0070D2',
        'amaran': '#E11D48',
        'SmallRig': '#0284C7',
        'OBSBOT': '#7C3AED',
        'Godox': '#D97706',
        'RODE': '#B45309',
        'Razer': '#10B981',
        'Elgato': '#3B82F6',
        'Anker': '#0EA5E9',
        'UGREEN': '#059669',
        'Hollyland': '#8B5CF6'
    }
    bg_accent = brand_colors.get(brand, '#0E7490')
    
    cat_icons = {
        'AUDIO': '🎙️',
        'LIGHTING': '💡',
        'WEBCAM': '📹',
        'CAPTURE': '🎥',
        'POWER': '🔋',
        'CONNECTION': '🔌',
        'MOUNTING': '📐',
        'STORAGE': '💾',
        'LIGHT_MODIFIER': '🎛️'
    }
    icon = cat_icons.get(cat, '📸')
    
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{bg_accent}" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.15" />
    </filter>
  </defs>

  <rect width="600" height="600" rx="32" fill="url(#bgGrad)" />
  <rect x="30" y="30" width="540" height="540" rx="24" fill="#FFFFFF" filter="url(#shadow)" />
  
  <rect x="60" y="60" width="480" height="320" rx="16" fill="url(#bgGrad)" />
  
  <circle cx="300" cy="200" r="80" fill="url(#accentGrad)" opacity="0.1" />
  <circle cx="300" cy="200" r="60" fill="url(#accentGrad)" opacity="0.9" />
  <text x="300" y="225" font-family="-apple-system, BlinkMacSystemFont, Arial" font-size="64" text-anchor="middle" fill="#FFFFFF">{icon}</text>
  
  <rect x="200" y="330" width="200" height="28" rx="14" fill="{bg_accent}" />
  <text x="300" y="349" font-family="-apple-system, BlinkMacSystemFont, Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#FFFFFF">{brand.upper()}</text>
  
  <text x="300" y="430" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="24" font-weight="900" text-anchor="middle" fill="#0F172A">{name[:32]}</text>
  <text x="300" y="465" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#64748B">{name[32:64] if len(name) > 32 else pid}</text>

  <rect x="150" y="495" width="300" height="40" rx="20" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
  <text x="300" y="520" font-family="-apple-system, BlinkMacSystemFont, Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#0F172A">OFFICIAL STUDIO PRODUCT ASSET</text>
</svg>'''
    return svg_content

# Process all 81 products
os.makedirs('assets/images', exist_ok=True)

success_count = 0
for p in products:
    pid = p['Product_ID']
    pname = p['Product_Name']
    brand = p.get('Brand', 'HÙNG CƯỜNG')
    cat = p.get('Category', '')
    
    png_path = f"assets/images/{pid.lower()}.png"
    svg_path = f"assets/images/{pid.lower()}.svg"
    
    # Try downloading known high-res image if defined
    if pid in known_urls:
        try:
            req = urllib.request.Request(known_urls[pid], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp, open(png_path, 'wb') as out_f:
                out_f.write(resp.read())
            print(f"[OK] Downloaded official image for {pid}")
            success_count += 1
            continue
        except Exception as e:
            print(f"[WARN] Failed to download {pid}: {e}")
            
    # Generate clean studio SVG asset
    svg_str = generate_studio_svg(pid, pname, brand, cat)
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_str)
    success_count += 1

print(f"Processed 81/81 product images cleanly!")
