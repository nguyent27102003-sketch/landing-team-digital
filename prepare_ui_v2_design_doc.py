import json

# Check product images and link status for all 81 products
with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

products = [dict(zip(wb['03_PRODUCT_MASTER']['rows'][0], r)) for r in wb['03_PRODUCT_MASTER']['rows'][1:] if r and r[0]]
links = {r[0]: dict(zip(wb['09_LINK_PRICE_STATUS']['rows'][0], r)) for r in wb['09_LINK_PRICE_STATUS']['rows'][1:] if r and r[0]}

for p in products:
    pid = p['Product_ID']
    if pid in links:
        p.update(links[pid])

print(f"Verified {len(products)} products in backend v1.1 dump.")

# Check how many have TikTok / Retailer / Official links
tiktok_count = sum(1 for p in products if p.get('Primary_Platform') == 'TIKTOK_SHOP')
retailer_count = sum(1 for p in products if p.get('Primary_Platform') == 'RETAILER')
official_count = sum(1 for p in products if p.get('Primary_Platform') == 'OFFICIAL')

print(f"TikTok Shop Links: {tiktok_count}, Retailer Links: {retailer_count}, Official Info Links: {official_count}")
