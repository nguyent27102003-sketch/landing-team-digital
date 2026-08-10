import json

with open('detailed_sheets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("=== 12_PRODUCT_COMPARISON FULL DATA ===")
for r in data['12_PRODUCT_COMPARISON']['data']:
    print(json.dumps(r['values'], ensure_ascii=False, indent=2))

print("\n=== 13_TEST_CASE AND 14_TEST_RESULT ===")
for t, r in zip(data['13_TEST_CASE']['data'], data['14_TEST_RESULT']['data']):
    print(f"[{t['values'].get('Test_ID')}] {t['values'].get('Scenario')}")
    print(f"   -> Expected: {t['values'].get('Expected_Result')}")
    print(f"   -> Actual: {r['values'].get('Actual_Result')}")
    print(f"   -> Status: {r['values'].get('Result')}")

