import json
with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)
print("Sheet Names in full_workbook_dump.json:", list(wb_dump.keys()))
