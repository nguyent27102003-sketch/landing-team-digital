import json

with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)

# Sheet 03: PRODUCT_MASTER
p_sheet = wb_dump['03_PRODUCT_MASTER']
p_rows = p_sheet['rows']
p_head = p_rows[0]
products = [dict(zip(p_head, r)) for r in p_rows[1:] if r and r[0]]

# Sheet 09: LINK_PRICE_STATUS
l_sheet = wb_dump['09_LINK_PRICE_STATUS']
l_rows = l_sheet['rows']
l_head = l_rows[0]
links = {r[0]: dict(zip(l_head, r)) for r in l_rows[1:] if r and r[0]}

for p in products:
    pid = p['Product_ID']
    if pid in links:
        p.update(links[pid])

print(f"Loaded {len(products)} products for eligibility matrix generation.")
