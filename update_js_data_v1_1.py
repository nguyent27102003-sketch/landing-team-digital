import json

with open('full_workbook_dump_v1_1.json', 'r', encoding='utf-8') as f:
    wb = json.load(f)

# Update rulesData.js
rules = {
    'recommendRules': [dict(zip(wb['06_RECOMMEND_RULE']['rows'][0], r)) for r in wb['06_RECOMMEND_RULE']['rows'][1:] if r and r[0]],
    'explanationRules': [dict(zip(wb['07_EXPLANATION_RULE']['rows'][0], r)) for r in wb['07_EXPLANATION_RULE']['rows'][1:] if r and r[0]],
    'investmentOptionRules': [dict(zip(wb['17_INVESTMENT_OPTION_RULES']['rows'][0], r)) for r in wb['17_INVESTMENT_OPTION_RULES']['rows'][1:] if r and r[0]],
    'investmentCandidateRules': [dict(zip(wb['18_INVESTMENT_CANDIDATE_RULES']['rows'][0], r)) for r in wb['18_INVESTMENT_CANDIDATE_RULES']['rows'][1:] if r and r[0]],
    'investmentRecommendationRules': [dict(zip(wb['19_INVESTMENT_RECOMMENDATION_RULES']['rows'][0], r)) for r in wb['19_INVESTMENT_RECOMMENDATION_RULES']['rows'][1:] if r and r[0]],
    'investmentRequiredCategory': [dict(zip(wb['20_INVESTMENT_REQUIRED_CATEGORY']['rows'][0], r)) for r in wb['20_INVESTMENT_REQUIRED_CATEGORY']['rows'][1:] if r and r[0]]
}

with open('js/data/rulesData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated Backend v1.1 Rules Data\n')
    f.write('export const recommendRules = ' + json.dumps(rules['recommendRules'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const explanationRules = ' + json.dumps(rules['explanationRules'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const investmentOptionRules = ' + json.dumps(rules['investmentOptionRules'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const investmentCandidateRules = ' + json.dumps(rules['investmentCandidateRules'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const investmentRecommendationRules = ' + json.dumps(rules['investmentRecommendationRules'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const investmentRequiredCategory = ' + json.dumps(rules['investmentRequiredCategory'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const rulesData = ' + json.dumps(rules, ensure_ascii=False, indent=2) + ';\n')

# Update testCasesData.js
test_cases = {
    'legacyTestCases': [dict(zip(wb['13_TEST_CASE']['rows'][0], r)) for r in wb['13_TEST_CASE']['rows'][1:] if r and r[0]],
    'legacyTestResults': [dict(zip(wb['14_TEST_RESULT']['rows'][0], r)) for r in wb['14_TEST_RESULT']['rows'][1:] if r and r[0]],
    'investmentTestResults': [dict(zip(wb['22_INVESTMENT_TEST_RESULT']['rows'][0], r)) for r in wb['22_INVESTMENT_TEST_RESULT']['rows'][1:] if r and r[0]]
}

with open('js/data/testCasesData.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated Backend v1.1 Test Cases & Results Data\n')
    f.write('export const testCasesData = ' + json.dumps(test_cases, ensure_ascii=False, indent=2) + ';\n')
    f.write('export const legacyTestCases = ' + json.dumps(test_cases['legacyTestCases'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const legacyTestResults = ' + json.dumps(test_cases['legacyTestResults'], ensure_ascii=False, indent=2) + ';\n')
    f.write('export const investmentTestResults = ' + json.dumps(test_cases['investmentTestResults'], ensure_ascii=False, indent=2) + ';\n')

print("Updated js/data/rulesData.js and js/data/testCasesData.js with Backend v1.1 structures.")
