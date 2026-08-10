import json

with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)

print("=== 01_CONFIGURATOR ===")
for r in wb_dump['01_CONFIGURATOR']['rows']:
    if r and any(r):
        print(r)

print("\n=== 02_OUTPUT ===")
for r in wb_dump['02_OUTPUT']['rows']:
    if r and any(r):
        print(r)

print("\n=== 06_RECOMMEND_RULE ===")
for r in wb_dump['06_RECOMMEND_RULE']['rows']:
    if r and any(r):
        print(r)

print("\n=== 07_EXPLANATION_RULE ===")
for r in wb_dump['07_EXPLANATION_RULE']['rows']:
    if r and any(r):
        print(r)

print("\n=== 15_DATA_DICTIONARY ===")
for r in wb_dump['15_DATA_DICTIONARY']['rows']:
    if r and any(r):
        print(r)
