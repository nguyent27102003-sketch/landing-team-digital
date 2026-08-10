import json

with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)

with open('blockers_audit.txt', 'w', encoding='utf-8') as out:
    out.write("=== 01_CONFIGURATOR ===\n")
    for r in wb_dump['01_CONFIGURATOR']['rows']:
        if r and any(r):
            out.write(str(r) + "\n")

    out.write("\n=== 02_OUTPUT ===\n")
    for r in wb_dump['02_OUTPUT']['rows']:
        if r and any(r):
            out.write(str(r) + "\n")

    out.write("\n=== 06_RECOMMEND_RULE ===\n")
    for r in wb_dump['06_RECOMMEND_RULE']['rows']:
        if r and any(r):
            out.write(str(r) + "\n")

    out.write("\n=== 07_EXPLANATION_RULE ===\n")
    for r in wb_dump['07_EXPLANATION_RULE']['rows']:
        if r and any(r):
            out.write(str(r) + "\n")

    out.write("\n=== 15_DATA_DICTIONARY ===\n")
    for r in wb_dump['15_DATA_DICTIONARY']['rows']:
        if r and any(r):
            out.write(str(r) + "\n")

print("Audit text written to blockers_audit.txt")
