import json

with open('detailed_sheets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

lines = []

def p(s=""):
    lines.append(s)

p("=== SHEET AUDIT: 01_CONFIGURATOR ===")
p(f"Header: {data['01_CONFIGURATOR']['header']}")
for row in data['01_CONFIGURATOR']['data']:
    p(f"Row {row['row_index']}: {row['values']}")
    if row['formulas']:
        p(f"   Formulas: {row['formulas']}")

p("\n=== SHEET AUDIT: 02_OUTPUT ===")
p(f"Header: {data['02_OUTPUT']['header']}")
for row in data['02_OUTPUT']['data']:
    p(f"Row {row['row_index']}: {row['values']}")
    if row['formulas']:
        p(f"   Formulas: {row['formulas']}")

p("\n=== SHEET AUDIT: 03_PRODUCT_MASTER ===")
p(f"Header: {data['03_PRODUCT_MASTER']['header']}")
p(f"Total Products: {len(data['03_PRODUCT_MASTER']['data'])}")
for row in data['03_PRODUCT_MASTER']['data']:
    vals = row['values']
    p(f"  {vals.get('Product_ID')} | {vals.get('Category')} | {vals.get('Subcategory')} | {vals.get('Brand')} | {vals.get('Model')} | Price: {vals.get('Price_Current')} | Status: {vals.get('Recommend_Status')}")

p("\n=== SHEET AUDIT: 04_CATEGORY_SPECS ===")
p(f"Header: {data['04_CATEGORY_SPECS']['header']}")
for row in data['04_CATEGORY_SPECS']['data']:
    p(f"  {row['values']}")

p("\n=== SHEET AUDIT: 05_COMPATIBILITY ===")
p(f"Header: {data['05_COMPATIBILITY']['header']}")
for row in data['05_COMPATIBILITY']['data']:
    p(f"  {row['values']}")

p("\n=== SHEET AUDIT: 06_RECOMMEND_RULE ===")
p(f"Header: {data['06_RECOMMEND_RULE']['header']}")
for row in data['06_RECOMMEND_RULE']['data']:
    p(f"  {row['values']}")

p("\n=== SHEET AUDIT: 07_EXPLANATION_RULE ===")
p(f"Header: {data['07_EXPLANATION_RULE']['header']}")
for row in data['07_EXPLANATION_RULE']['data']:
    p(f"  {row['values']}")

p("\n=== SHEET AUDIT: 08_ALTERNATIVE_MAP ===")
p(f"Header: {data['08_ALTERNATIVE_MAP']['header']}")
for row in data['08_ALTERNATIVE_MAP']['data']:
    p(f"  {row['values']}")

p("\n=== SHEET AUDIT: 09_LINK_PRICE_STATUS ===")
p(f"Header: {data['09_LINK_PRICE_STATUS']['header']}")
for row in data['09_LINK_PRICE_STATUS']['data']:
    p(f"  {row['values'].get('Product_ID')} | Price: {row['values'].get('Price_Current')} | Status: {row['values'].get('Price_Status')} | Link: {row['values'].get('Primary_Link')} | Platform: {row['values'].get('Primary_Platform')} | LinkStatus: {row['values'].get('Link_Status')} | Backup: {row['values'].get('Backup_Link')} | Action: {row['values'].get('Action')}")

p("\n=== SHEET AUDIT: 12_PRODUCT_COMPARISON ===")
p(f"Header: {data['12_PRODUCT_COMPARISON']['header']}")
for row in data['12_PRODUCT_COMPARISON']['data']:
    p(f"  {row['values']}")

p("\n=== SHEET AUDIT: 13_TEST_CASE & 14_TEST_RESULT ===")
for t, r in zip(data['13_TEST_CASE']['data'], data['14_TEST_RESULT']['data']):
    p(f"  {t['values'].get('Test_ID')} | Expected: {t['values'].get('Expected_Result')} | Actual: {r['values'].get('Actual_Result')} | Result: {r['values'].get('Result')}")

p("\n=== SHEET AUDIT: 15_DATA_DICTIONARY ===")
for row in data['15_DATA_DICTIONARY']['data']:
    p(f"  {row['values']}")

with open('full_audit_text.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("full_audit_text.txt generated successfully")
