import json
import os

with open('full_workbook_dump.json', 'r', encoding='utf-8') as f:
    wb_dump = json.load(f)

os.makedirs('js/data', exist_ok=True)
os.makedirs('js/engine', exist_ok=True)
os.makedirs('js/ui', exist_ok=True)
os.makedirs('css', exist_ok=True)
os.makedirs('assets', exist_ok=True)

# 1. Generate productsData.js
p_sheet = wb_dump['03_PRODUCT_MASTER']
p_rows = p_sheet['rows']
p_head = p_rows[0]
p_list = []
for r in p_rows[1:]:
    p_obj = dict(zip(p_head, r))
    # clean None to null / proper types
    p_list.append(p_obj)

# Merge with Sheet 09 (Link & Price Status)
l_sheet = wb_dump['09_LINK_PRICE_STATUS']
l_rows = l_sheet['rows']
l_head = l_rows[0]
l_map = {r[0]: dict(zip(l_head, r)) for r in l_rows[1:] if r and r[0]}

for p in p_list:
    pid = p.get('Product_ID')
    if pid in l_map:
        l_info = l_map[pid]
        p['Price_Current'] = l_info.get('Price_Current', p.get('Price_Current'))
        p['Price_Checked_Date'] = l_info.get('Price_Checked_Date', p.get('Price_Checked_Date'))
        p['Price_Status'] = l_info.get('Price_Status', p.get('Price_Status'))
        p['Primary_Link'] = l_info.get('Primary_Link', p.get('Primary_Link'))
        p['Primary_Platform'] = l_info.get('Primary_Platform', p.get('Primary_Platform'))
        p['Link_Status'] = l_info.get('Link_Status', p.get('Link_Status'))
        p['Link_Checked_Date'] = l_info.get('Link_Checked_Date', p.get('Link_Checked_Date'))
        p['Backup_Link'] = l_info.get('Backup_Link', p.get('Backup_Link'))
        p['Action'] = l_info.get('Action', p.get('Action'))

with open('js/data/productsData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 03_PRODUCT_MASTER & 09_LINK_PRICE_STATUS\n')
    f.write('export const productsData = ')
    json.dump(p_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

# 2. Generate specsData.js
s_sheet = wb_dump['04_CATEGORY_SPECS']
s_rows = s_sheet['rows']
s_head = s_rows[0]
s_list = [dict(zip(s_head, r)) for r in s_rows[1:] if r and r[0]]

with open('js/data/specsData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 04_CATEGORY_SPECS\n')
    f.write('export const specsData = ')
    json.dump(s_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

# 3. Generate compatibilityData.js
c_sheet = wb_dump['05_COMPATIBILITY']
c_rows = c_sheet['rows']
c_head = c_rows[0]
c_list = [dict(zip(c_head, r)) for r in c_rows[1:] if r and r[0]]

with open('js/data/compatibilityData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 05_COMPATIBILITY\n')
    f.write('export const compatibilityData = ')
    json.dump(c_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

# 4. Generate rulesData.js
r_sheet = wb_dump['06_RECOMMEND_RULE']
r_rows = r_sheet['rows']
r_head = r_rows[0]
r_list = [dict(zip(r_head, r)) for r in r_rows[1:] if r and r[0]]

e_sheet = wb_dump['07_EXPLANATION_RULE']
e_rows = e_sheet['rows']
e_head = e_rows[0]
e_list = [dict(zip(e_head, r)) for r in e_rows[1:] if r and r[0]]

with open('js/data/rulesData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 06_RECOMMEND_RULE and 07_EXPLANATION_RULE\n')
    f.write('export const recommendRules = ')
    json.dump(r_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n\n')
    f.write('export const explanationRules = ')
    json.dump(e_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

# 5. Generate alternativesData.js
a_sheet = wb_dump['08_ALTERNATIVE_MAP']
a_rows = a_sheet['rows']
a_head = a_rows[0]
a_list = [dict(zip(a_head, r)) for r in a_rows[1:] if r and r[0]]

with open('js/data/alternativesData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 08_ALTERNATIVE_MAP\n')
    f.write('export const alternativesData = ')
    json.dump(a_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

# 6. Generate comparisonsData.js
cmp_sheet = wb_dump['12_PRODUCT_COMPARISON']
cmp_rows = cmp_sheet['rows']
cmp_head = cmp_rows[0]
cmp_list = [dict(zip(cmp_head, r)) for r in cmp_rows[1:] if r and r[0]]

with open('js/data/comparisonsData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 12_PRODUCT_COMPARISON\n')
    f.write('export const comparisonsData = ')
    json.dump(cmp_list, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

# 7. Generate testCasesData.js
t_sheet = wb_dump['13_TEST_CASE']
t_rows = t_sheet['rows']
t_head = t_rows[0]
t_list = [dict(zip(t_head, r)) for r in t_rows[1:] if r and r[0]]

tr_sheet = wb_dump['14_TEST_RESULT']
tr_rows = tr_sheet['rows']
tr_head = tr_rows[0]
tr_list = [dict(zip(tr_head, r)) for r in tr_rows[1:] if r and r[0]]

test_merged = []
for t, tr in zip(t_list, tr_list):
    m = {**t, **tr}
    test_merged.append(m)

with open('js/data/testCasesData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from 13_TEST_CASE & 14_TEST_RESULT\n')
    f.write('export const testCasesData = ')
    json.dump(test_merged, f, ensure_ascii=False, indent=2, default=str)
    f.write(';\n')

print('All JS data files generated successfully in js/data/')
