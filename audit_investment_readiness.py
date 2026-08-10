import json

with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)

# Sheet 03: PRODUCT_MASTER
p_sheet = wb_dump['03_PRODUCT_MASTER']
p_rows = p_sheet['rows']
p_head = p_rows[0]
p_list = [dict(zip(p_head, r)) for r in p_rows[1:] if r and r[0]]

# Sheet 09: LINK_PRICE_STATUS
l_sheet = wb_dump['09_LINK_PRICE_STATUS']
l_rows = l_sheet['rows']
l_head = l_rows[0]
l_map = {r[0]: dict(zip(l_head, r)) for r in l_rows[1:] if r and r[0]}

# Combine
for p in p_list:
    pid = p['Product_ID']
    if pid in l_map:
        p.update(l_map[pid])

print(f"Total Products: {len(p_list)}")

# Price status summary
price_status_counts = {}
link_status_counts = {}
for p in p_list:
    ps = p.get('Price_Status', 'UNKNOWN')
    ls = p.get('Link_Status', 'UNKNOWN')
    price_status_counts[ps] = price_status_counts.get(ps, 0) + 1
    link_status_counts[ls] = link_status_counts.get(ls, 0) + 1

print("\nPrice Status Counts:", price_status_counts)
print("Link Status Counts:", link_status_counts)

# Check products used in recommendation rules (E4, E6, E7, E8, Slot 18-25)
rec_products = [
    'PKT_DJI_OP3_STD', 'WCM_OBS_MEET2', 'WCM_OBS_TINY2L',
    'AUD_DJI_MICMINI', 'AUD_DJI_MICMINI2', 'AUD_DJI_MIC3',
    'LGT_AMR_ACE25X', 'LGT_GDX_C30BI', 'LGT_SMR_RC60B',
    'HUB_UGR_REVO105', 'STO_KIN_GO', 'RIG_SMR_UCAGE',
    'GIM_DJI_OM8', 'PWR_UGR_20K100'
]

print("\nStatus of Recommendation Core Products (E4, E6, E7, E8, Slots 18-25):")
for pid in rec_products:
    p = next((x for x in p_list if x['Product_ID'] == pid), None)
    if p:
        print(f"[{pid}] {p['Product_Name']} | Price: {p.get('Price_Current')} ({p.get('Price_Status')}) | Link: {p.get('Primary_Platform')} ({p.get('Link_Status')})")
    else:
        print(f"[{pid}] NOT FOUND!")
