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

# Audit all 81 products
eligible_count = 0
for p in products:
    pid = p['Product_ID']
    l_info = links.get(pid, {})
    p.update(l_info)
    
    rec_status = p.get('Recommend_Status', 'CANDIDATE')
    price_status = p.get('Price_Status', 'NEED_VERIFY')
    link_status = p.get('Link_Status', 'ACTIVE')
    platform = p.get('Primary_Platform', 'OFFICIAL')
    
    # Check if product is referenced in Configurator / Output / Rules / Comparisons
    is_core_rec = pid in [
        'PKT_DJI_OP3_STD', 'WCM_OBS_MEET2', 'WCM_OBS_TINY2L',
        'AUD_DJI_MICMINI', 'AUD_DJI_MICMINI2', 'AUD_DJI_MIC3',
        'LGT_AMR_ACE25X', 'LGT_GDX_C30BI', 'LGT_SMR_RC60B',
        'HUB_UGR_REVO105', 'STO_KIN_GO', 'RIG_SMR_UCAGE',
        'GIM_DJI_OM8', 'PWR_UGR_20K100'
    ]

# Summary of 81 products
total_products = len(products)
active_links = sum(1 for p in products if p.get('Link_Status') == 'ACTIVE')
need_verify_links = sum(1 for p in products if p.get('Link_Status') == 'NEED_VERIFY')
dead_links = sum(1 for p in products if p.get('Link_Status') == 'DEAD')

direct_purchase = sum(1 for p in products if p.get('Primary_Platform') in ['TIKTOK_SHOP', 'RETAILER'])
official_info = sum(1 for p in products if p.get('Primary_Platform') == 'OFFICIAL')

print(f"Total Products: {total_products}")
print(f"Backend ACTIVE Links: {active_links}, NEED_VERIFY: {need_verify_links}, DEAD: {dead_links}")
print(f"Live Verified Direct Purchase: {direct_purchase}, Official Info Only: {official_info}")
