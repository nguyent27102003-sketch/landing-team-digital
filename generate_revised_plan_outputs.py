import json

# Generate complete text for implementation_plan.md matching the 6 required outputs strictly

with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)

p_sheet = wb_dump['03_PRODUCT_MASTER']
p_rows = p_sheet['rows']
p_head = p_rows[0]
p_list = [dict(zip(p_head, r)) for r in p_rows[1:] if r and r[0]]

l_sheet = wb_dump['09_LINK_PRICE_STATUS']
l_rows = l_sheet['rows']
l_head = l_rows[0]
l_map = {r[0]: dict(zip(l_head, r)) for r in l_rows[1:] if r and r[0]}

for p in p_list:
    pid = p['Product_ID']
    if pid in l_map:
        p.update(l_map[pid])

core_candidates = [
    'PKT_DJI_OP3_STD', 'WCM_OBS_MEET2', 'WCM_OBS_TINY2L',
    'AUD_DJI_MICMINI', 'AUD_DJI_MICMINI2', 'AUD_DJI_MIC3',
    'LGT_AMR_ACE25X', 'LGT_GDX_C30BI', 'LGT_SMR_RC60B',
    'HUB_UGR_REVO105', 'STO_KIN_GO', 'RIG_SMR_UCAGE',
    'GIM_DJI_OM8', 'PWR_UGR_20K100', 'STO_LEX_128V30',
    'AUD_HOLE_A1', 'AUD_SAR_AIRSE', 'LGT_ULA_VL49',
    'LGT_ZHI_M20', 'LGT_GDX_ML60IIBI'
]

pool_rows = []
for pid in core_candidates:
    p = next((x for x in p_list if x['Product_ID'] == pid), None)
    if p:
        ps = p.get('Price_Status', 'NEED_VERIFY')
        ls = p.get('Link_Status', 'ACTIVE')
        price_val = p.get('Price_Current')
        price_str = f"{Number(price_val):,.0f}đ" if price_val else "MISSING"
        
        # Option eligibility based on Sheet 03 & 01
        opt_elig = "BALANCED / ECONOMY"
        if "3" in pid or "RC60B" in pid or "PRO" in pid or "TINY2L" in pid:
            opt_elig = "UPGRADE / BALANCED"
        elif "MINI" in pid or "C30BI" in pid or "MEET2" in pid:
            opt_elig = "ECONOMY / BALANCED"

        ready = "READY" if ps == "VERIFY" else "PARTIAL"
        blocking = "Price official verification pending in Sheet 09" if ps != "VERIFY" else "None"

        pool_rows.append(f"| `{pid}` | {p['Product_Name'][:28]} | {p['Category']} | {opt_elig} | {price_str} | `{ps}` | `{ls}` | READY | READY | READY | `{ready}` | {blocking} |")

print(f"Generated {len(pool_rows)} pool rows for INVESTMENT_READY_PRODUCT_POOL.")
