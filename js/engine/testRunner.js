import { RecommendationEngine } from './recommendationEngine.js';
import { CompatibilityEngine } from './compatibilityEngine.js';

export class TestRunner {
  constructor() {
    this.engine = new RecommendationEngine();
    this.compatEngine = new CompatibilityEngine();
  }

  runAllTests() {
    const results = [];

    // TEST 01: Smartphone USB-C + PC + tripod; Live + Short Video + Product Photo; High; 1 PM; Compact; 5m
    const t01 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: true,
      hasPocket: false,
      pocketModel: 'Unknown',
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: true,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 01',
      name: 'Smartphone USB-C + PC + tripod; Live + Short Video + Product Photo; High; 1 PM; Compact; 5m',
      expected: 'SMARTPHONE; no camera/tripod purchase; audio+lighting+link; total <= 5M',
      actual: `${t01.recommendedSystem}; Items: ${t01.items.map(i => i.productId).join(', ')}; Total: ${t01.requiredTotal.toLocaleString()}đ; Status: ${t01.overallStatus}`,
      pass: t01.recommendedSystem === 'SMARTPHONE' && 
            t01.items.some(i => i.productId === 'AUD_DJI_MICMINI') && 
            t01.items.some(i => i.productId === 'LGT_AMR_ACE25X' || i.productId === 'LGT_GDX_C30BI') &&
            !t01.items.some(i => i.productId === 'PKT_DJI_OP3_STD') &&
            t01.overallStatus === 'VALID'
    });

    // TEST 02: Pocket 3 + PC + tripod; Video + Live; High; Balanced
    const t02 = this.engine.evaluate({
      hasSmartphone: false,
      hasLaptopPC: true,
      hasPocket: true,
      pocketModel: 'Pocket 3',
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Balanced',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 02',
      name: 'Pocket 3 + PC + tripod; Video + Live; High; Balanced',
      expected: 'POCKET; do not repurchase Pocket',
      actual: `${t02.recommendedSystem}; Items: ${t02.items.map(i => i.productId).join(', ')}`,
      pass: t02.recommendedSystem === 'POCKET' && !t02.items.some(i => i.productId === 'PKT_DJI_OP3_STD')
    });

    // TEST 03: PC; Live; OBS; Fixed
    const t03 = this.engine.evaluate({
      hasSmartphone: false,
      hasLaptopPC: true,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: false,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: false,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'Yes',
      mobility: 'Fixed',
      operator: '1 PM',
      space: 'Live Room',
      style: 'Balanced',
      budgetVND: 10000000
    });
    results.push({
      testId: 'TEST 03',
      name: 'PC; Live; OBS; Fixed',
      expected: 'WEBCAM_PC eligible and explained',
      actual: `${t03.recommendedSystem}; Items: ${t03.items.map(i => i.productId).join(', ')}`,
      pass: t03.recommendedSystem === 'WEBCAM_PC' && t03.items.some(i => i.productId.startsWith('WCM_'))
    });

    // TEST 04: Smartphone; Live + Video; Budget 500k
    const t04 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: true,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 500000
    });
    results.push({
      testId: 'TEST 04',
      name: 'Smartphone; Live + Video; Budget 500k',
      expected: 'OVER_BUDGET without dropping mandatory items',
      actual: `Status: ${t04.overallStatus}; RequiredTotal: ${t04.requiredTotal.toLocaleString()}đ; Items: ${t04.items.map(i => i.productId).join(', ')}`,
      pass: t04.overallStatus === 'OVER_BUDGET' && t04.items.some(i => i.tier === 'REQUIRED')
    });

    // TEST 05: Product Photo + Live (Smartphone present)
    const t05 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: true,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: false,
      needLongVideo: false,
      needProductPhoto: true,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Shop',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 05',
      name: 'Product Photo + Live',
      expected: 'Webcam not default primary when smartphone is available for mobile photo',
      actual: `System: ${t05.recommendedSystem}`,
      pass: t05.recommendedSystem === 'SMARTPHONE'
    });

    // TEST 06: Smartphone + compatible existing mic
    const t06 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: true,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 06',
      name: 'Smartphone + compatible existing mic',
      expected: 'No mic purchase (Audio slot blank)',
      actual: `Audio in items: ${t06.items.some(i => i.productId.startsWith('AUD_'))}`,
      pass: !t06.items.some(i => i.productId.startsWith('AUD_'))
    });

    // TEST 09: Live; 2 Hosts
    const t09 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: false,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '2',
      obs: 'No',
      mobility: 'High',
      operator: '2 People',
      space: 'Shop',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 09',
      name: 'Live; 2 Hosts',
      expected: 'Two-host audio solution (AUD_DJI_MICMINI2)',
      actual: `Audio item: ${t09.items.find(i => i.productId.startsWith('AUD_'))?.productId}`,
      pass: t09.items.some(i => i.productId === 'AUD_DJI_MICMINI2')
    });

    // TEST 10: Same input; Compact vs Professional
    const t10_compact = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 10000000
    });
    const t10_pro = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Professional',
      budgetVND: 10000000
    });
    results.push({
      testId: 'TEST 10',
      name: 'Same input; Compact vs Professional',
      expected: 'Different sensible recommendations (Compact -> DJI Mic Mini / Ace 25x; Pro -> Mic 3 / RC 60B)',
      actual: `Compact: Mic=${t10_compact.items.find(i => i.productId.startsWith('AUD_'))?.productId}, Light=${t10_compact.items.find(i => i.productId.startsWith('LGT_'))?.productId} | Pro: Mic=${t10_pro.items.find(i => i.productId.startsWith('AUD_'))?.productId}, Light=${t10_pro.items.find(i => i.productId.startsWith('LGT_'))?.productId}`,
      pass: t10_compact.items.some(i => i.productId === 'AUD_DJI_MICMINI') && t10_pro.items.some(i => i.productId === 'AUD_DJI_MIC3')
    });

    // TEST 11: Unknown connector
    const t11 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'Unknown',
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: true,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: false,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 11',
      name: 'Unknown connector',
      expected: 'MISSING_DATA status',
      actual: `Status: ${t11.overallStatus}`,
      pass: t11.overallStatus === 'MISSING_DATA'
    });

    // TEST 12: Incompatible pair (RC 60B + Baseus 65W charger)
    const t12_compat = this.compatEngine.checkPair('LEG_BAS_GAN65', 'LGT_SMR_RC60B');
    results.push({
      testId: 'TEST 12',
      name: 'Incompatible product (RC 60B + 65W wall charger)',
      expected: 'NOT_COMPATIBLE status from matrix CMP011',
      actual: `Status: ${t12_compat?.status}; Condition: ${t12_compat?.condition}`,
      pass: t12_compat?.status === 'NOT_COMPATIBLE'
    });

    // TEST 14: User owns most equipment
    const t14 = this.engine.evaluate({
      hasSmartphone: true,
      smartphoneOS: 'iOS',
      smartphoneConnector: 'USB-C',
      hasLaptopPC: true,
      hasPocket: false,
      hasWebcam: false,
      hasMic: true,
      hasLight: true,
      hasTripod: true,
      hasPower: true,
      hasHubAdapter: true,
      hasStorage: true,
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 14',
      name: 'User owns most equipment (Mic, Light, Tripod, Power)',
      expected: 'Zero or minimal purchase required items',
      actual: `Required items count: ${t14.items.filter(i => i.tier === 'REQUIRED').length}; Reused count: ${t14.existingList.length}`,
      pass: t14.items.filter(i => i.tier === 'REQUIRED').length === 0 && t14.existingList.length >= 6
    });

    // TEST 15: No valid solution
    const t15 = this.engine.evaluate({
      hasSmartphone: false,
      hasLaptopPC: false,
      hasPocket: false,
      hasWebcam: false,
      hasMic: false,
      hasLight: false,
      hasTripod: false,
      hasPower: false,
      hasHubAdapter: false,
      hasStorage: false,
      needLive: true,
      needShortVideo: false,
      needLongVideo: false,
      needProductPhoto: false,
      needHostPhoto: false,
      hostCount: '1',
      obs: 'No',
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',
      style: 'Compact',
      budgetVND: 5000000
    });
    results.push({
      testId: 'TEST 15',
      name: 'No smartphone/PC/Pocket owned',
      expected: 'NO_MATCH status',
      actual: `Status: ${t15.overallStatus}; System: ${t15.recommendedSystem}`,
      pass: t15.overallStatus === 'NO_MATCH' && t15.recommendedSystem === 'NO_MATCH'
    });

    return results;
  }
}
