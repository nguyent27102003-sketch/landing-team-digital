import json

with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

products = [dict(zip(wb['03_PRODUCT_MASTER']['rows'][0], r)) for r in wb['03_PRODUCT_MASTER']['rows'][1:] if r and r[0]]
links = {r[0]: dict(zip(wb['09_LINK_PRICE_STATUS']['rows'][0], r)) for r in wb['09_LINK_PRICE_STATUS']['rows'][1:] if r and r[0]}

for p in products:
    pid = p['Product_ID']
    if pid in links:
        l_info = links[pid]
        p['Price_Current'] = l_info.get('Price_Current')
        p['Primary_Platform'] = l_info.get('Primary_Platform')
        p['Primary_Link'] = l_info.get('Primary_Link')
        p['Link_Status'] = l_info.get('Link_Status')
        p['Price_Checked_Date'] = l_info.get('Price_Checked_Date')
    p['Image_URL'] = f"assets/images/{pid.lower()}.png"

# Update productsData.js
with open('js/data/productsData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated Normalized Products Data Master v1.2\n')
    f.write('export const productsData = ')
    json.dump(products, f, ensure_ascii=False, indent=2)
    f.write(';\n')

print("Updated js/data/productsData.js!")
