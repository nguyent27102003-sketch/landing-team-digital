import { comparisonsData } from '../data/comparisonsData.js';

export class ComparisonController {
  constructor(productsData, modalController) {
    this.products = productsData;
    this.productsMap = new Map();
    productsData.forEach(p => this.productsMap.set(p.Product_ID, p));
    this.comparisons = comparisonsData;
    this.modalController = modalController;

    // Selected comparison ID
    this.selectedDuelId = this.comparisons[0]?.Comparison_ID || 'CMP_AUD_01';

    // Friendly Vietnamese labels for curated scenarios
    this.scenarioLabels = {
      'CMP_AUD_01': '🎙️ Micro: 1 người nói (Cơ động)',
      'CMP_AUD_02': '🎙️ Micro: 2 người nói (Cơ động)',
      'CMP_AUD_03': '🎙️ Micro: Thu âm chuyên nghiệp & Ghi âm nội bộ',
      'CMP_LGT_01': '💡 Đèn: Đèn kẹp di động (Cận cảnh & Bán thân)',
      'CMP_LGT_02': '💡 Đèn: Đèn COB công suất cao (Pin sạc PD)',
      'CMP_WCM_01': '📹 Webcam: Livestream cố định (OBS / Live Studio)',
      'CMP_WCM_02': '📹 Webcam: Tự động xoay theo người (Gimbal AI)',
      'CMP_WCM_03': '📹 Webcam: Sắc nét chất lượng cao (Cảm biến lớn)',
      'CMP_PWR_01': '🔋 Nguồn: Pin sạc dự phòng công suất cao',
      'CMP_STO_01': '💾 Lưu trữ: Thẻ nhớ tốc độ cao cho Pocket 3 4K'
    };

    this.render();
  }

  render() {
    const compEl = document.getElementById('productComparison');
    if (!compEl) return;

    const currentDuel = this.comparisons.find(c => c.Comparison_ID === this.selectedDuelId) || this.comparisons[0];
    const primaryProd = this.productsMap.get(currentDuel.Product_ID);
    
    // Parse compared products
    const comparedIds = (currentDuel.Compared_Against || '').split(';').map(s => s.trim()).filter(Boolean);
    const comparedProds = comparedIds.map(id => this.productsMap.get(id)).filter(Boolean);
    const allProdsInDuel = [primaryProd, ...comparedProds].filter(Boolean);

    compEl.innerHTML = `
      <div class="comparison-container container">
        <div class="comparison-header">
          <div class="section-tag">ĐỐI CHIẾU THIẾT BỊ ĐỀ XUẤT</div>
          <h1 style="font-size: 1.85rem; color: var(--color-primary-dark); margin-bottom: var(--space-2);">
            Đề Xuất & So Sánh Thiết Bị Theo 10 Nhu Cầu Thực Tế
          </h1>
          <p style="color: var(--color-text-muted);">
            Dữ liệu đối chiếu và đề xuất thiết bị theo tiêu chuẩn từ Sheet 12 của Backend Workbook. Đánh giá khách quan điểm mạnh, hạn chế, sự đánh đổi (trade-off) và danh hiệu thiết bị phù hợp nhất.
          </p>
        </div>

        <!-- Curated Duels Selector -->
        <div class="curated-duels-wrap">
          <div class="curated-duels-title" style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-3);">
            Chọn kịch bản thiết bị cần xem:
          </div>
          <div class="curated-duels-chips">
            ${this.comparisons.map(c => `
              <button type="button" class="duel-chip ${c.Comparison_ID === this.selectedDuelId ? 'active' : ''}" data-duel-id="${c.Comparison_ID}">
                ${this.scenarioLabels[c.Comparison_ID] || `${c.Category}: ${c.Use_Case}`}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Comparison Matrix Table -->
        <div class="comparison-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="comp-feature-col">Tiêu chí so sánh</th>
                ${allProdsInDuel.map((p, idx) => `
                  <th class="comp-product-header">
                    <div class="comp-prod-brand">${p.Brand}</div>
                    <div class="comp-prod-name">${p.Product_Name}</div>
                    <div class="comp-prod-price">
                      ${p.Price_Current ? `${Number(p.Price_Current).toLocaleString()}đ` : 'Giá đang cập nhật'}
                    </div>
                    ${idx === 0 && currentDuel.Winner_Type ? `
                      <div class="comp-winner-cell">
                        👑 LỰA CHỌN TỐI ƯU
                      </div>
                    ` : ''}
                    <button type="button" class="btn btn-outline btn-sm comp-view-btn" data-pid="${p.Product_ID}" style="margin-top: 8px;">
                      🔍 Xem chi tiết
                    </button>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="comp-feature-col">Phân khúc sản phẩm</td>
                ${allProdsInDuel.map(p => `<td><span class="badge badge-brand">${this.translatePriceBand(p.Price_Band)}</span></td>`).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Tính cơ động (Dễ mang đi)</td>
                ${allProdsInDuel.map((p, idx) => `<td>${idx === 0 ? this.translateMobility(currentDuel.Mobility) : this.translateMobility(p.Mobility_Level)}</td>`).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Mức độ dễ lắp đặt (Setup)</td>
                ${allProdsInDuel.map((p, idx) => `<td>${idx === 0 ? this.translateSetup(currentDuel.Setup_Complexity) : this.translateSetup(p.Setup_Complexity)}</td>`).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Điểm mạnh nổi bật</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td>
                    ${idx === 0 ? `<strong>${currentDuel.Main_Strength}</strong>` : (p.Strength_1_Fact || 'Đáp ứng tiêu chuẩn kỹ thuật')}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Hạn chế & Lưu ý</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td style="color: #92400E;">
                    ${idx === 0 ? currentDuel.Main_Limitation : (p.Limitation_1_Fact || 'Cần tuân thủ điều kiện vận hành')}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Phù hợp nhất cho nhu cầu</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td>
                    ${idx === 0 ? (this.scenarioLabels[currentDuel.Comparison_ID] || currentDuel.Use_Case) : (p.Best_For || 'Theo phân loại danh mục')}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Sự đánh đổi (Trade-off)</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td>
                    ${idx === 0 ? (currentDuel.Why_Not_Absolute_Best || currentDuel.Main_Tradeoff) : (p.Main_Tradeoff || 'Đổi chi phí lấy tính năng nâng cao')}
                  </td>
                `).join('')}
              </tr>
              ${currentDuel.Why_Winner ? `
                <tr style="background-color: #FEFCE8;">
                  <td class="comp-feature-col" style="color: #854D0E;">Đánh giá thực tế từ Backend</td>
                  <td colspan="${allProdsInDuel.length}" style="color: #713F12; line-height: 1.5;">
                    <strong>Tại sao sản phẩm này được đề xuất:</strong> ${currentDuel.Why_Winner}<br />
                    <span style="font-size: 0.8rem; color: #854D0E;">(Đánh giá Factual từ Sheet 12: PRODUCT_COMPARISON)</span>
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  translatePriceBand(pb) {
    const map = {
      'ENTRY': 'Phổ thông',
      'ENTRY_MID': 'Tầm trung phổ thông',
      'MID': 'Tầm trung',
      'MID_PRO': 'Cận chuyên nghiệp',
      'PRO': 'Chuyên nghiệp',
      'VALUE': 'Giá tốt'
    };
    return map[pb] || pb || 'Tiêu chuẩn';
  }

  translateMobility(m) {
    if (!m) return 'Tiêu chuẩn';
    if (m === 'High' || m === 'Rất cao') return 'Cao (Dễ mang đi shop)';
    if (m === 'Medium' || m === 'Vừa phải') return 'Vừa phải (Trong tòa nhà)';
    if (m === 'Low' || m === 'Cố định') return 'Cố định (Đặt bàn/Phòng)';
    return m;
  }

  translateSetup(s) {
    if (!s) return 'Tiêu chuẩn';
    if (s === 'Low' || s === 'Thấp') return 'Đơn giản (1 PM tự cắm là chạy)';
    if (s === 'Medium' || s === 'Trung bình') return 'Vừa phải';
    if (s === 'High' || s === 'Phức tạp') return 'Cần kỹ thuật lắp đặt';
    return s;
  }

  bindEvents() {
    const compEl = document.getElementById('productComparison');
    if (!compEl) return;

    // Duel chips
    compEl.querySelectorAll('.duel-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.selectedDuelId = chip.getAttribute('data-duel-id');
        this.render();
      });
    });

    // View product detail modal
    compEl.querySelectorAll('.comp-view-btn[data-pid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-pid');
        this.modalController.showProduct(pid);
      });
    });
  }
}
