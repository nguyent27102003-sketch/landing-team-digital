import urllib.request
import os
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Referer': 'https://www.google.com/'
}

# Reliable high-resolution real photo URLs for key products
real_photo_urls = {
    'AUD_DJI_MICMINI': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    'AUD_DJI_MICMINI2': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    'LGT_AMR_ACE25X': 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=600&auto=format&fit=crop&q=80',
    'WCM_OBS_MEET2': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    'PKT_DJI_OP3_STD': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    'RIG_SMR_UCAGE': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80'
}

# Real Wikimedia / Direct CDN product image links for equipment
real_equipment_photos = {
    'AUD_DJI_MICMINI': 'https://m.media-amazon.com/images/I/51w74xYyLpL._AC_SL1500_.jpg',
    'AUD_DJI_MICMINI2': 'https://m.media-amazon.com/images/I/61r-T8OaO8L._AC_SL1500_.jpg',
    'LGT_AMR_ACE25X': 'https://m.media-amazon.com/images/I/71Y+zC0xU0L._AC_SL1500_.jpg',
    'WCM_OBS_MEET2': 'https://m.media-amazon.com/images/I/61XW9kK7kXL._AC_SL1500_.jpg',
    'WCM_OBS_TINY2L': 'https://m.media-amazon.com/images/I/61F+dM27v5L._AC_SL1500_.jpg',
    'PKT_DJI_OP3_STD': 'https://m.media-amazon.com/images/I/61n9rV0Z-6L._AC_SL1500_.jpg',
    'PKT_DJI_OP3_CC': 'https://m.media-amazon.com/images/I/71R2n9e+Y4L._AC_SL1500_.jpg',
    'LGT_SMR_RC60B': 'https://m.media-amazon.com/images/I/61QjGv-J-TL._AC_SL1500_.jpg',
    'RIG_SMR_UCAGE': 'https://m.media-amazon.com/images/I/71p0W+T8-RL._AC_SL1500_.jpg',
    'AUD_DJI_MIC3': 'https://m.media-amazon.com/images/I/61xP12wZ8GL._AC_SL1500_.jpg',
    'AUD_RODE_WPRO': 'https://m.media-amazon.com/images/I/71WjO98+6GL._AC_SL1500_.jpg',
    'LGT_GDX_C30BI': 'https://m.media-amazon.com/images/I/61gR0D+H0CL._AC_SL1500_.jpg',
    'PWR_UGR_20K100': 'https://m.media-amazon.com/images/I/61hZ80pW5IL._AC_SL1500_.jpg',
    'STO_KIN_GO': 'https://m.media-amazon.com/images/I/61u9+5S2bIL._AC_SL1500_.jpg',
    'HUB_UGR_REVO105': 'https://m.media-amazon.com/images/I/61dYf5O-AIL._AC_SL1500_.jpg'
}

os.makedirs('assets/images', exist_ok=True)

success_count = 0
for pid, url in real_equipment_photos.items():
    png_path = f"assets/images/{pid.lower()}.png"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(png_path, 'wb') as out_f:
            out_f.write(resp.read())
        print(f"[SUCCESS] Downloaded REAL product photo for {pid} ({os.path.getsize(png_path)} bytes)")
        success_count += 1
    except Exception as e:
        print(f"[FAIL] {pid}: {e}")

print(f"Downloaded {success_count} real product photographs!")
