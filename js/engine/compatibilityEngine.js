import { compatibilityData } from '../data/compatibilityData.js';
import { productsData } from '../data/productsData.js';

const productsMap = new Map();
productsData.forEach(p => productsMap.set(p.Product_ID, p));

export class CompatibilityEngine {
  constructor() {
    this.pairMatrix = compatibilityData;
    this.productsMap = productsMap;
  }

  checkPair(productIdA, productIdB) {
    if (!productIdA || !productIdB) return null;

    // Search bidirectional in Sheet 05
    const match = this.pairMatrix.find(
      c => (c.Product_A_ID === productIdA && c.Product_B_ID === productIdB) ||
           (c.Product_A_ID === productIdB && c.Product_B_ID === productIdA)
    );

    if (match) {
      return {
        isExplicitPair: true,
        compatibilityId: match.Compatibility_ID,
        status: match.Status,
        condition: match.Condition,
        requiredCable: match.Required_Cable,
        requiredPower: match.Required_Power,
        risk: match.Risk,
        note: match.Note,
        source: match.Source
      };
    }

    // Attribute-based fallback check
    const pA = this.productsMap.get(productIdA);
    const pB = this.productsMap.get(productIdB);

    if (!pA || !pB) return null;

    // Specific attribute check: Power Watt vs Power Bank PD
    if (pA.Category === 'LIGHTING' && pB.Category === 'POWER') {
      const powerReq = pA.Power_Watt || 60;
      const pdOut = pB.USB_C_Output_W || 100;
      if (pdOut >= powerReq) {
        return {
          isExplicitPair: false,
          status: 'COMPATIBLE',
          condition: `Nguồn cấp PD ${pdOut}W đáp ứng công suất yêu cầu ${powerReq}W của đèn.`,
          requiredCable: 'Cáp sạc nhanh 100W USB-C PD',
          risk: 'Thời lượng phiên hoạt động phụ thuộc dung lượng pin mAh.'
        };
      } else {
        return {
          isExplicitPair: false,
          status: 'NOT_COMPATIBLE',
          condition: `Công suất nguồn ra (${pdOut}W) thấp hơn yêu cầu (${powerReq}W) của đèn.`,
          risk: 'Đèn có thể bị sập nguồn hoặc giảm độ sáng tối đa.'
        };
      }
    }

    // Default neutral compatibility
    return {
      isExplicitPair: false,
      status: 'COMPATIBLE',
      condition: 'Chuẩn kết nối tiêu chuẩn, hoạt động độc lập hoặc kết nối cơ học.',
      risk: null
    };
  }

  evaluateCombo(items) {
    const results = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const pA = items[i].productId;
        const pB = items[j].productId;
        const check = this.checkPair(pA, pB);
        if (check && (check.isExplicitPair || check.status !== 'COMPATIBLE')) {
          results.push({
            productA: pA,
            productB: pB,
            ...check
          });
        }
      }
    }
    return results;
  }
}
