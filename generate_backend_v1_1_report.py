import json

with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

# Audit products eligibility in Sheet 18
s18_rows = wb['18_INVESTMENT_CANDIDATE_RULES']['rows'][1:]
products_count = len(s18_rows)
eligible_econ = sum(1 for r in s18_rows if r[3] == 'Yes')
eligible_bal = sum(1 for r in s18_rows if r[4] == 'Yes')
eligible_upg = sum(1 for r in s18_rows if r[5] == 'Yes')

print(f"Total Products Screened in Sheet 18: {products_count}")
print(f"Eligible for Economy: {eligible_econ}, Balanced: {eligible_bal}, Upgrade: {eligible_upg}")
