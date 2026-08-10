import json

with open('full_verification_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("Commercial breakdown:", data['commercial_breakdown'])

# Check products with verified price
verified_price = [p for p in data['products'] if p['Price_Current'] is not None]
print(f"Products with verified local VND price: {len(verified_price)}")
for p in verified_price:
    print(f"  {p['Product_ID']}: {p['Product_Name']} | {p['Price_Current']:,} VND | {p['Primary_Platform']} | {p['Link_Status']}")

# Check products with Strengths and Limitations Facts/Impacts
with_facts = [p for p in data['products'] if p['Has_Strength_Fact_Impact']]
print(f"\nProducts with Fact/Impact Strengths: {len(with_facts)} / {len(data['products'])}")

# Check compatibility records
print(f"\nTotal explicit compatibility records in Sheet 05: {len(data['compatibility_records'])}")
for c in data['compatibility_records']:
    print(f"  [{c['Compatibility_ID']}] {c['Product_A_ID']} <-> {c['Product_B_ID']} | {c['Status']} | {c['Condition']}")

# Check recommendation rules
print(f"\nTotal recommendation rules in Sheet 06: {len(data['recommend_rules'])}")
for r in data['recommend_rules']:
    print(f"  [{r['Rule_ID']}] Priority {r['Priority']}: {r['Condition']} => {r['Action']}")

# Check explanation rules
print(f"\nTotal explanation rules in Sheet 07: {len(data['explanation_rules'])}")
for e in data['explanation_rules']:
    print(f"  [{e['Explanation_ID']}] Context: {e['Context']} | Fact: {e['Fact']} => Conclusion: {e['Conclusion']}")

