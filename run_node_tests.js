import { TestRunner } from './js/engine/testRunner.js';

const runner = new TestRunner();
const results = runner.runAllTests();

console.log('=== TEST RUNNER RESULTS ===');
let passCount = 0;
for (const r of results) {
  const statusStr = r.pass ? 'PASS' : 'FAIL';
  if (r.pass) passCount++;
  console.log(`[${statusStr}] ${r.testId}: ${r.name}`);
  console.log(`      Actual: ${r.actual}`);
}
console.log(`\nTOTAL: ${passCount} / ${results.length} PASSED`);
if (passCount === results.length) {
  console.log('ALL WORKBOOK TEST CASES PASSED 100%!');
} else {
  process.exit(1);
}
