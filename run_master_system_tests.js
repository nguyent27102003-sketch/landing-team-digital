import { RecommendationEngine } from './js/engine/recommendationEngine.js';
import { marketplaceService } from './js/data/marketplaceService.js';
import { TestRunner } from './js/engine/testRunner.js';

const engine = new RecommendationEngine();

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

console.log("=== MASTER SYSTEM UPDATE TEST SUITE ===");

// 1. CAP-01: No capture device owned -> CAPTURE is REQUIRED_PURCHASE
const resCap01 = engine.evaluate({
  needLive: true,
  needShortVideo: true,
  hasSmartphone: false,
  hasLaptopPC: false,
  hasPocket: false,
  hasWebcam: false,
  budgetVND: 15000000
});

assert(
  resCap01.items.some(i => i.tier === 'REQUIRED' && (i.productId === 'PKT_DJI_OP3_STD' || i.productId === 'WCM_OBS_MEET2')),
  `CAP-01: No-Capture bug fixed. Capture unit is REQUIRED_PURCHASE when none owned. (Actual items: ${resCap01.items.map(i=>i.productId).join(', ')})`
);

// 2. CAP-02: No capture device owned + low budget -> OVER_BUDGET with gap
const resCap02 = engine.evaluate({
  needLive: true,
  needShortVideo: true,
  hasSmartphone: false,
  hasLaptopPC: false,
  hasPocket: false,
  hasWebcam: false,
  budgetVND: 5000000
});

assert(
  resCap02.overallStatus === 'OVER_BUDGET',
  `CAP-02: Over budget status set when kit with capture exceeds budget. (Actual status: ${resCap02.overallStatus})`
);

// 3. CON-01: iPhone Lightning + DJI Mobile Receiver -> Auto-add Lightning Adapter
const resCon01 = engine.evaluate({
  needLive: true,
  hasSmartphone: true,
  smartphoneOS: 'iPhone',
  smartphoneConnector: 'Lightning',
  hostCount: 1,
  hasMic: false,
  hasAdapter: false,
  budgetVND: 10000000
});

assert(
  resCon01.items.some(i => i.productId === 'AUD_ADP_DJI_MOBILE_LIGHTNING' && i.tier === 'REQUIRED'),
  `CON-01: Auto-added AUD_ADP_DJI_MOBILE_LIGHTNING for iPhone Lightning + DJI Mobile Receiver.`
);

// 4. MKT-01: Variant precision for Mic Mini 1TX vs 2TX
const comm1TX = marketplaceService.getProductCommercialData('AUD_DJI_MICMINI', 'AUD_DJI_MICMINI_1TX_USBC');
const comm2TX = marketplaceService.getProductCommercialData('AUD_DJI_MICMINI', 'AUD_DJI_MICMINI_2TX_USBC');

assert(
  comm1TX.product_id === 'AUD_DJI_MICMINI' && comm1TX.variant_id === 'AUD_DJI_MICMINI_1TX_USBC',
  `MKT-01: 1TX variant Commercial Data retrieved cleanly without variant confusion.`
);

// 5. SmallRig Exclusion check
const resSmallRig = engine.evaluate({
  needLive: true,
  style: 'Balanced',
  budgetVND: 10000000
});

assert(
  !resSmallRig.items.some(i => i.productId === 'LGT_SMR_RC60B' || i.productId === 'RIG_SMR_UCAGE'),
  `SMR-01: SmallRig excluded from new recommendations in engine.`
);

// 6. Legacy 12 Workbook Tests Regression
const testRunner = new TestRunner();
const legacyResults = testRunner.runAllTests();
const legacyPass = legacyResults.filter(r => r.pass).length;

assert(
  legacyPass === legacyResults.length,
  `LEGACY REGRESSION: ${legacyPass} / ${legacyResults.length} Legacy Test Cases Passed 100%.`
);

console.log(`\n=== FINAL RESULT: ${passed} / ${total} TESTS PASSED ===`);
if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
