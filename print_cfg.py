import json

with open('detailed_sheets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("=== 01_CONFIGURATOR ROWS ===")
for row in data['01_CONFIGURATOR']['data']:
    print(f"Row {row['row_index']}: {row['values']}")
    if row['formulas']:
        print(f"   Formulas: {row['formulas']}")

print("\n=== 02_OUTPUT ROWS ===")
for row in data['02_OUTPUT']['data']:
    print(f"Row {row['row_index']}: {row['values']}")
    if row['formulas']:
        print(f"   Formulas: {row['formulas']}")

