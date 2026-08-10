import { comparisonsData } from '../data/comparisonsData.js';

export class ComparisonController {
  constructor(productsData, modalController) {
    this.products = productsData;
    this.productsMap = new Map();
    productsData.forEach(p => this.productsMap.set(p.Product_ID, p));
    this.comparisons = comparisonsData;
    this.modalController = modalController;

    // Selected comparison ID (default to first curated duel)
    this.selectedDuelId = this.comparisons[0]?.Comparison_ID || 'CMP_AUD_01';

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
          <div class="section-tag">ĐỐI CHIẾU THIẾT BỊ ĐỐI ĐẦU</div>
          <h1 style="font-size: 1.85rem; color: var(--color-primary-dark); margin-bottom: var(--space-2);">
            So Sánh Đối Đầu 10 Kịch Bản Thực Tế
          </h1>
          <p style="color: var(--color-text-muted);">
            Dữ liệu so sánh đối đầu trực tiếp từ Sheet 12 của Backend Workbook. Đánh giá khách quan điểm mạnh, hạn chế, trade-off và Winner Type chính thức.
          </p>
        </div>

        <!-- Curated Duels Selector -->
        <div class="curated-duels-wrap">
          <div class="curated-duels-title">Chọn kịch bản so sánh đối đầu:</div>
          <div class="curated-duels-chips">
            ${this.comparisons.map(c => `
              <button type="button" class="duel-chip ${c.Comparison_ID === this.selectedDuelId ? 'active' : ''}" data-duel-id="${c.Comparison_ID}">
                ${c.Category}: ${c.Use_Case}
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
                        👑 ${currentDuel.Winner_Type}
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
                <td class="comp-feature-col">Phân khúc giá</td>
                ${allProdsInDuel.map(p => `<td><span class="badge badge-brand">${p.Price_Band || 'STANDARD'}</span></td>`).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Tính cơ động (Mobility)</td>
                ${allProdsInDuel.map((p, idx) => `<td>${idx === 0 ? currentDuel.Mobility : (p.Mobility_Level || 'Tiêu chuẩn')}</td>`).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Độ phức tạp setup</td>
                ${allProdsInDuel.map((p, idx) => `<td>${idx === 0 ? currentDuel.Setup_Complexity : (p.Setup_Complexity || 'Trung bình')}</td>`).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Điểm mạnh nổi bật (Strength)</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td>
                    ${idx === 0 ? `<strong>${currentDuel.Main_Strength}</strong>` : (p.Strength_1_Fact || 'Chất lượng tiêu chuẩn')}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Hạn chế & Lưu ý (Limitation)</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td style="color: #92400E;">
                    ${idx === 0 ? currentDuel.Main_Limitation : (p.Limitation_1_Fact || 'Cần tuân thủ điều kiện vận hành')}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Phù hợp nhất cho (Best For)</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td>
                    ${idx === 0 ? currentDuel.Use_Case : (p.Best_For || 'Theo phân loại danh mục')}
                  </td>
                `).join('')}
              </tr>
              <tr>
                <td class="comp-feature-col">Trade-off (Đánh đổi)</td>
                ${allProdsInDuel.map((p, idx) => `
                  <td>
                    ${idx === 0 ? (currentDuel.Why_Not_Absolute_Best || currentDuel.Main_Tradeoff) : (p.Main_Tradeoff || 'Đổi chi phí lấy tính năng')}
                  </td>
                `).join('')}
              </tr>
              ${currentDuel.Why_Winner ? `
                <tr style="background-color: #FEFCE8;">
                  <td class="comp-feature-col" style="color: #854D0E;">Đánh giá của Backend</td>
                  <td colspan="${allProdsInDuel.length}" style="color: #713F12; line-height: 1.5;">
                    <strong>Vì sao sản phẩm được chọn:</strong> ${currentDuel.Why_Winner}<br />
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
