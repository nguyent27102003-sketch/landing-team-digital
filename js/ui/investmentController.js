import { marketplaceService } from '../data/marketplaceService.js';
import { rulesData } from '../data/rulesData.js';

export class InvestmentController {
  constructor(productsData, modalController) {
    this.productsMap = new Map(productsData.map(p => [p.Product_ID, p]));
    this.modalController = modalController;

    // Form inputs state
    this.state = {
      useCases: ['Live', 'Short Video'],
      hostCount: 1,
      mobility: 'HIGH', // Di chuyển nhiều
      installer: 'SINGLE_PM', // 1 PM tự lắp
      space: 'SHOP', // Shop
      priority: 'BALANCED', // Cân bằng
      ownedDevice: 'NONE', // Chưa có
      budgetPerKit: 5000000,
      kitCount: 10,
      selectedOptionType: 'BALANCED' // Default selected combo
    };

    this.render();
  }

  render() {
    const invEl = document.getElementById('investmentModule');
    if (!invEl) return;

    // Compute options based on current state
    const combos = this.computeInvestmentCombos();
    const activeCombo = combos.find(c => c.type === this.state.selectedOptionType) || combos[1] || combos[0];

    invEl.innerHTML = `
      <div class="investment-container container" style="padding-top: var(--space-6); padding-bottom: var(--space-12);">
        
        <!-- HEADER -->
        <div class="investment-header text-center" style="margin-bottom: var(--space-8);">
          <div class="section-tag" style="display: inline-block; background: rgba(14, 116, 144, 0.1); color: var(--color-primary); padding: 4px 12px; border-radius: 999px; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: var(--space-2);">
            MODULE ĐỀ XUẤT ĐẦU TƯ BỘ THIẾT BỊ CHO PM
          </div>
          <h1 style="font-size: 2.2rem; color: var(--color-primary-dark); margin-bottom: var(--space-2); font-weight: 800;">
            Đề Xuất Bộ Thiết Bị Chuẩn
          </h1>
          <p style="color: var(--color-text-muted); max-width: 680px; margin: 0 auto;">
            Điều chỉnh nhu cầu bên dưới để xem các phương án đầu tư phù hợp, dễ hiểu, dễ so sánh và trình lên cấp quản lý ra quyết định.
          </p>
        </div>

        <!-- KHU VỰC 1: ĐIỀU KIỆN ĐỀ XUẤT -->
        <div class="inv-card controls-card" style="background: white; border-radius: var(--radius-xl); padding: var(--space-6); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); margin-bottom: var(--space-8);">
          <h3 style="font-size: 1.15rem; color: var(--color-primary-dark); margin-bottom: var(--space-4); display: flex; align-items: center; gap: 8px;">
            <span>🎛️</span> 1. ĐIỀU KIỆN VÀ NHU CẦU ĐẦU TƯ
          </h3>

          <form id="invControlsForm" onsubmit="event.preventDefault();" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-4);">
            
            <!-- A. Nhu cầu sử dụng -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Nhu cầu sử dụng:</label>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;">
                <label style="font-size: 0.82rem; cursor: pointer;"><input type="checkbox" name="uc" value="Live" ${this.state.useCases.includes('Live') ? 'checked' : ''}> Livestream</label>
                <label style="font-size: 0.82rem; cursor: pointer;"><input type="checkbox" name="uc" value="Short Video" ${this.state.useCases.includes('Short Video') ? 'checked' : ''}> Quay video ngắn</label>
                <label style="font-size: 0.82rem; cursor: pointer;"><input type="checkbox" name="uc" value="Long Video" ${this.state.useCases.includes('Long Video') ? 'checked' : ''}> Quay video dài</label>
                <label style="font-size: 0.82rem; cursor: pointer;"><input type="checkbox" name="uc" value="Product Photo" ${this.state.useCases.includes('Product Photo') ? 'checked' : ''}> Chụp sản phẩm</label>
              </div>
            </div>

            <!-- B. Số người lên hình -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Số người lên hình:</label>
              <select class="form-select" id="invHostCount" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
                <option value="1" ${this.state.hostCount === 1 ? 'selected' : ''}>1 người</option>
                <option value="2" ${this.state.hostCount === 2 ? 'selected' : ''}>2 người (Cần micro đôi)</option>
              </select>
            </div>

            <!-- C. Mức độ di chuyển -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Mức độ di chuyển:</label>
              <select class="form-select" id="invMobility" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
                <option value="HIGH" ${this.state.mobility === 'HIGH' ? 'selected' : ''}>Di chuyển nhiều (Cần rất gọn nhẹ)</option>
                <option value="MEDIUM" ${this.state.mobility === 'MEDIUM' ? 'selected' : ''}>Di chuyển vừa phải (Trong tòa nhà)</option>
                <option value="LOW" ${this.state.mobility === 'LOW' ? 'selected' : ''}>Chủ yếu cố định (Đặt phòng live)</option>
              </select>
            </div>

            <!-- D. Người lắp đặt -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Người lắp đặt:</label>
              <select class="form-select" id="invInstaller" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
                <option value="SINGLE_PM" ${this.state.installer === 'SINGLE_PM' ? 'selected' : ''}>1 PM tự cắm và tự mang</option>
                <option value="TEAM" ${this.state.installer === 'TEAM' ? 'selected' : ''}>Team hỗ trợ kỹ thuật</option>
              </select>
            </div>

            <!-- E. Ưu tiên đầu tư -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Ưu tiên đầu tư:</label>
              <select class="form-select" id="invPriority" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
                <option value="COST_EFFICIENCY" ${this.state.priority === 'COST_EFFICIENCY' ? 'selected' : ''}>Tiết kiệm chi phí tối đa</option>
                <option value="BALANCED" ${this.state.priority === 'BALANCED' ? 'selected' : ''}>Cân bằng (Đề xuất chuẩn)</option>
                <option value="MOBILITY_FIRST" ${this.state.priority === 'MOBILITY_FIRST' ? 'selected' : ''}>Ưu tiên siêu gọn nhẹ</option>
                <option value="QUALITY_FIRST" ${this.state.priority === 'QUALITY_FIRST' ? 'selected' : ''}>Ưu tiên chất lượng & Thu âm pro</option>
              </select>
            </div>

            <!-- F. Thiết bị đã có -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Thiết bị ghi hình sẵn có:</label>
              <select class="form-select" id="invOwnedDevice" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
                <option value="PHONE" ${this.state.ownedDevice === 'PHONE' ? 'selected' : ''}>Đã có Điện thoại phù hợp</option>
                <option value="PC" ${this.state.ownedDevice === 'PC' ? 'selected' : ''}>Đã có PC / Laptop</option>
                <option value="NONE" ${this.state.ownedDevice === 'NONE' ? 'selected' : ''}>Chưa có (Cần đề xuất mới)</option>
              </select>
            </div>

            <!-- G. Ngân sách / 1 bộ -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Ngân sách dự kiến / bộ:</label>
              <input type="number" id="invBudget" value="${this.state.budgetPerKit}" step="500000" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
            </div>

            <!-- H. Số bộ cần mua -->
            <div>
              <label class="form-label" style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-main);">Số bộ cần trang bị:</label>
              <input type="number" id="invKitCount" value="${this.state.kitCount}" min="1" max="100" style="width: 100%; margin-top: 6px; padding: 8px 12px; border-radius: var(--radius-md); border: 1px solid #CBD5E1;">
            </div>

          </form>

          <div style="margin-top: var(--space-4); text-align: right;">
            <button type="button" id="btnUpdateInv" class="btn btn-primary" style="padding: 10px 24px; font-weight: 700; border-radius: var(--radius-md);">
              ⚡ CẬP NHẬT ĐỀ XUẤT
            </button>
          </div>

          <!-- Scenario Summary Pill -->
          <div style="margin-top: var(--space-4); background: #F1F5F9; border-radius: var(--radius-md); padding: 10px 16px; font-size: 0.85rem; color: #334155; display: flex; align-items: center; gap: 8px;">
            <span>💡</span>
            <div>
              <strong>Đang tính toán đề xuất cho:</strong> ${this.state.useCases.join(' + ')} • ${this.state.hostCount} người lên hình • ${this.translateMobility(this.state.mobility)} • Trang bị <strong>${this.state.kitCount} bộ</strong>
            </div>
          </div>
        </div>

        <!-- KHU VỰC 2: 3 COMBO ĐỀ XUẤT -->
        <div style="margin-bottom: var(--space-8);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: 1.3rem; color: var(--color-primary-dark); font-weight: 800;">
              📦 2. CÁC PHƯƠNG ÁN COMBO ĐỀ XUẤT
            </h3>
            <span style="font-size: 0.85rem; color: var(--color-text-muted);">Hiển thị tối đa 3 cấu hình tối ưu</span>
          </div>

          <div class="combos-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(310px, 1fr)); gap: var(--space-6);">
            ${combos.map(combo => this.renderComboCard(combo)).join('')}
          </div>
        </div>

        <!-- KHU VỰC 3: SO SÁNH NHANH 3 COMBO -->
        <div class="inv-card" style="background: white; border-radius: var(--radius-xl); padding: var(--space-6); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); margin-bottom: var(--space-8);">
          <h3 style="font-size: 1.15rem; color: var(--color-primary-dark); margin-bottom: var(--space-4);">
            📊 3. BẢNG SO SÁNH NHANH GIỮA CÁC COMBO
          </h3>

          <div style="overflow-x: auto;">
            <table class="comparison-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
              <thead>
                <tr style="background: #F8FAFC; text-align: left;">
                  <th style="padding: 12px; border-bottom: 2px solid #E2E8F0;">Tiêu chí so sánh</th>
                  ${combos.map(c => `
                    <th style="padding: 12px; border-bottom: 2px solid #E2E8F0; width: 28%;">
                      ${c.title} ${c.isRecommended ? '⭐' : ''}
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Chi phí / 1 bộ</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: 700; color: var(--color-primary);">${c.costText}</td>`).join('')}
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Tổng đầu tư (${this.state.kitCount} bộ)</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: 700;">${c.totalCostText}</td>`).join('')}
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Phù hợp nhất khi</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">${c.bestFor}</td>`).join('')}
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Mức độ cơ động</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">${c.mobilityText}</td>`).join('')}
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Mức độ dễ lắp đặt</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">${c.setupText}</td>`).join('')}
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Điểm mạnh nổi bật</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #166534;">✓ ${c.strength}</td>`).join('')}
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; border-bottom: 1px solid #F1F5F9;">Hạn chế chính</td>
                  ${combos.map(c => `<td style="padding: 10px; border-bottom: 1px solid #F1F5F9; color: #92400E;">⚠️ ${c.limitation}</td>`).join('')}
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Delta Difference Banner -->
          <div style="margin-top: var(--space-4); background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: var(--radius-md); padding: 14px; font-size: 0.88rem; color: #1E40AF;">
            <strong>💡 So sánh chênh lệch:</strong> Nếu chọn Combo Cân Bằng thay Combo Tiết Kiệm: Chi phí tăng <strong>+200.000đ/bộ</strong> (Tổng ${this.state.kitCount} bộ tăng <strong>+${(200000 * this.state.kitCount).toLocaleString()}đ</strong>). Đổi lại nhận được đèn chiếu sáng chuẩn màu hơn và chân gá chắc chắn cho di chuyển.
          </div>
        </div>

        <!-- KHU VỰC 4: CHI TIẾT COMBO ĐANG XEM -->
        <div class="inv-card" style="background: white; border-radius: var(--radius-xl); padding: var(--space-6); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); margin-bottom: var(--space-8);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); border-bottom: 2px solid #F1F5F9; padding-bottom: 12px;">
            <div>
              <h3 style="font-size: 1.2rem; color: var(--color-primary-dark); font-weight: 800;">
                🔍 4. THÀNH PHẦN TRONG ${activeCombo.title.toUpperCase()}
              </h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 4px;">
                Chi tiết từng thiết bị được chọn bởi hệ thống cho cấu hình này.
              </p>
            </div>
            <span class="badge" style="background: #E0F2FE; color: #0369A1; font-weight: 700; font-size: 0.85rem; padding: 6px 12px;">
              ${activeCombo.costText}
            </span>
          </div>

          <!-- Reason Box -->
          <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 14px; margin-bottom: var(--space-6); font-size: 0.88rem; color: #92400E; line-height: 1.5;">
            <strong>Tại sao có combo này:</strong> ${activeCombo.whyOption}
          </div>

          <!-- Product Cards in Combo -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6);">
            ${activeCombo.products.map(item => this.renderProductCardInCombo(item)).join('')}
          </div>
        </div>

        <!-- KHU VỰC 5: DANH SÁCH MUA HÀNG & TỔNG KẾT BÀN GIAO -->
        <div class="inv-card" style="background: white; border-radius: var(--radius-xl); padding: var(--space-6); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: 1.2rem; color: var(--color-primary-dark); font-weight: 800;">
              📋 5. DANH SÁCH MUA HÀNG & TỔNG KẾT BÀN GIAO
            </h3>
            <button type="button" onclick="window.print()" class="btn btn-outline" style="font-size: 0.85rem; font-weight: 700; padding: 8px 16px;">
              🖨️ IN / XUẤT ĐỀ XUẤT TRÌNH SẾP
            </button>
          </div>

          <!-- Purchase Table -->
          <div style="overflow-x: auto; margin-bottom: var(--space-6);">
            <table class="comparison-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
              <thead>
                <tr style="background: #F8FAFC; text-align: left;">
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">STT</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Hình ảnh</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Danh mục</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Tên sản phẩm</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">SL / bộ</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Số bộ</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Tổng SL</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Đơn giá</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Thành tiền</th>
                  <th style="padding: 10px; border-bottom: 2px solid #E2E8F0;">Nơi bán / Trực tiếp</th>
                </tr>
              </thead>
              <tbody>
                ${activeCombo.products.map((item, idx) => {
                  const comm = marketplaceService.getProductCommercialData(item.Product_ID);
                  const qtyPerKit = 1;
                  const totalQty = qtyPerKit * this.state.kitCount;
                  const unitPrice = comm.preferred_price;
                  const subtotal = unitPrice ? unitPrice * totalQty : null;

                  return `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">${idx + 1}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">
                        <img src="${comm.image}" alt="${comm.product_name}" style="width: 44px; height: 44px; object-fit: contain; border-radius: 6px; border: 1px solid #E2E8F0; background: #FAFAFA;">
                      </td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">${item.Category}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: 700;">${comm.product_name}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; text-align: center;">${qtyPerKit}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; text-align: center;">${this.state.kitCount}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; text-align: center; font-weight: 700;">${totalQty}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">${unitPrice ? `${Number(unitPrice).toLocaleString()}đ` : 'Đang cập nhật'}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9; font-weight: 700; color: var(--color-primary);">${subtotal ? `${Number(subtotal).toLocaleString()}đ` : 'Đang cập nhật'}</td>
                      <td style="padding: 10px; border-bottom: 1px solid #F1F5F9;">
                        ${this.renderPurchaseActionButtons(comm)}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Total Summary Box -->
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-lg); padding: 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
            <div>
              <div style="font-size: 0.85rem; color: #166534; font-weight: 700;">ĐỀ XUẤT HIỆN TẠI ĐANG CHỌN</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: #14532D; margin-top: 2px;">
                ${activeCombo.title}
              </div>
              <div style="font-size: 0.85rem; color: #166534; margin-top: 4px;">
                Chi phí / bộ: <strong>${activeCombo.costText}</strong> • Trang bị <strong>${this.state.kitCount} bộ</strong>
              </div>
            </div>

            <div style="text-align: right;">
              <div style="font-size: 0.85rem; color: #166534;">TỔNG VỐN ĐẦU TƯ DỰ KIẾN</div>
              <div style="font-size: 1.8rem; font-weight: 900; color: #15803D;">
                ${activeCombo.totalCostText}
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  computeInvestmentCombos() {
    // Read from workbook backend data
    const is2Host = this.state.hostCount === 2;
    const micProduct = is2Host ? 'AUD_DJI_MICMINI2' : 'AUD_DJI_MICMINI';
    const lightProductEcon = 'LGT_GDX_C30BI';
    const lightProductBal = 'LGT_AMR_ACE25X';

    // 1. Combo Tiết Kiệm (ECONOMY)
    const econProds = [
      this.productsMap.get(micProduct),
      this.productsMap.get(lightProductEcon)
    ].filter(Boolean);

    // 2. Combo Cân Bằng (BALANCED)
    const balProds = [
      this.productsMap.get(micProduct),
      this.productsMap.get(lightProductBal),
      this.productsMap.get('RIG_SMR_UCAGE')
    ].filter(Boolean);

    // 3. Combo Nâng Cấp (UPGRADE)
    const upgProds = [
      this.productsMap.get('AUD_DJI_MIC3'),
      this.productsMap.get('LGT_SMR_RC60B'),
      this.productsMap.get('RIG_SMR_UCAGE')
    ].filter(Boolean);

    const isBalRecommended = this.state.priority === 'BALANCED' || this.state.priority === 'MOBILITY_FIRST';

    return [
      {
        type: 'ECONOMY',
        title: 'Combo Tiết Kiệm',
        isRecommended: this.state.priority === 'COST_EFFICIENCY',
        costText: is2Host ? '3.135.000đ / bộ' : '2.560.000đ / bộ',
        totalCostText: is2Host ? `${Number(3135000 * this.state.kitCount).toLocaleString()}đ` : `${Number(2560000 * this.state.kitCount).toLocaleString()}đ`,
        bestFor: 'Nhu cầu cơ bản, ngân sách hạn chế',
        strength: 'Chi phí thấp nhất đáp ứng đủ danh mục kỹ thuật',
        limitation: 'Đèn công suất nhẹ hơn, ánh sáng phạm vi hẹp',
        mobilityText: 'Rất cơ động (Phù hợp 1 PM)',
        setupText: 'Đơn giản (1 PM tự cắm)',
        whyOption: 'Cấu hình tối ưu chi phí nhưng vẫn đảm bảo có micro thu âm chuẩn và đèn chiếu sáng cơ bản cho 1 PM.',
        products: econProds
      },
      {
        type: 'BALANCED',
        title: 'Combo Cân Bằng',
        isRecommended: isBalRecommended,
        costText: is2Host ? '3.335.000đ / bộ' : '2.760.000đ / bộ',
        totalCostText: is2Host ? `${Number(3335000 * this.state.kitCount).toLocaleString()}đ` : `${Number(2760000 * this.state.kitCount).toLocaleString()}đ`,
        bestFor: 'Livestream + Quay video cơ động tại shop',
        strength: 'Gọn nhẹ, đèn chuẩn màu sắc nét, 1 PM tự mang dễ dàng',
        limitation: 'Khả năng phủ sáng hẹp hơn dòng đèn studio cố định',
        mobilityText: 'Rất cơ động (Rất gọn nhẹ)',
        setupText: 'Đơn giản (Cắm là chạy)',
        whyOption: 'Đây là bộ thiết bị đạt sự cân bằng tối ưu nhất giữa mức giá và tính thực tế khi triển khai tại các cửa hàng.',
        products: balProds
      },
      {
        type: 'UPGRADE',
        title: 'Combo Nâng Cấp',
        isRecommended: this.state.priority === 'QUALITY_FIRST',
        costText: 'Đã xác định: 0đ (+2 món đang cập nhật)',
        totalCostText: 'Chưa đủ giá chính xác',
        bestFor: 'Quay chuyên nghiệp, thu âm dự phòng 32-bit float',
        strength: 'Thu âm dự phòng trực tiếp trên micro, đèn rọi COB 60W',
        limitation: 'Trọng lượng lớn hơn, đèn cần sạc 100W PD',
        mobilityText: 'Cơ động vừa phải',
        setupText: 'Cần thao tác thêm sạc PD',
        whyOption: 'Phù hợp khi công ty yêu cầu chất lượng âm thanh dự phòng tuyệt đối và ánh sáng COB công suất cao.',
        products: upgProds
      }
    ];
  }

  renderComboCard(combo) {
    const isSelected = this.state.selectedOptionType === combo.type;

    return `
      <div class="inv-combo-card" style="background: white; border-radius: var(--radius-xl); padding: var(--space-6); border: ${combo.isRecommended ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'}; position: relative; box-shadow: ${combo.isRecommended ? 'var(--shadow-md)' : 'var(--shadow-sm)'}; display: flex; flex-direction: column; justify-content: space-between;">
        
        ${combo.isRecommended ? `
          <div style="position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--color-primary); color: white; padding: 4px 14px; border-radius: 999px; font-weight: 800; font-size: 0.78rem; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(14, 116, 144, 0.3);">
            ⭐ ĐỀ XUẤT NÊN CHỌN
          </div>
        ` : ''}

        <div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary-dark); margin-top: 4px;">
            ${combo.title}
          </div>

          <div style="margin-top: 10px; margin-bottom: 14px;">
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary);">${combo.costText}</div>
            <div style="font-size: 0.82rem; color: var(--color-text-muted);">Tổng ${this.state.kitCount} bộ: <strong>${combo.totalCostText}</strong></div>
          </div>

          <div style="font-size: 0.85rem; color: #475569; margin-bottom: 12px; background: #F8FAFC; padding: 8px 12px; border-radius: var(--radius-md);">
            🎯 <strong>Phù hợp:</strong> ${combo.bestFor}
          </div>

          <div style="font-size: 0.83rem; margin-bottom: 6px; color: #166534;">
            ✓ <strong>Điểm mạnh:</strong> ${combo.strength}
          </div>
          <div style="font-size: 0.83rem; margin-bottom: 16px; color: #92400E;">
            ⚠️ <strong>Hạn chế:</strong> ${combo.limitation}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: auto;">
          <button type="button" class="btn ${isSelected ? 'btn-primary' : 'btn-outline'} btn-select-combo" data-combo-type="${combo.type}" style="width: 100%; font-weight: 700; border-radius: var(--radius-md);">
            ${isSelected ? '✓ ĐÃ CHỌN PHƯƠNG ÁN NÀY' : 'CHỌN PHƯƠNG ÁN NÀY'}
          </button>
        </div>

      </div>
    `;
  }

  renderProductCardInCombo(item) {
    const comm = marketplaceService.getProductCommercialData(item.Product_ID);
    
    return `
      <div class="inv-prod-card" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; justify-content: space-between;">
        
        <div>
          <div style="width: 100%; height: 160px; background: white; border-radius: var(--radius-md); border: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: center; padding: 10px; margin-bottom: 12px;">
            <img src="${comm.image}" alt="${comm.product_name}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
          </div>

          <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.5px;">
            ${item.Category} • ${comm.brand}
          </div>

          <div style="font-size: 1rem; font-weight: 800; color: var(--color-primary-dark); margin-top: 2px; margin-bottom: 6px;">
            ${comm.product_name}
          </div>

          <div style="font-size: 0.9rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 10px;">
            ${comm.preferred_price ? `${Number(comm.preferred_price).toLocaleString()}đ` : 'Giá đang cập nhật'}
            <span style="font-size: 0.75rem; font-weight: 400; color: var(--color-text-muted); display: block;">Cập nhật: ${comm.price_checked_date}</span>
          </div>

          <div style="font-size: 0.82rem; color: #334155; margin-bottom: 6px;">
            <strong>Tại sao chọn:</strong> ${item.Strength_1_Fact || 'Đáp ứng tiêu chuẩn kỹ thuật'}
          </div>
        </div>

        <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
          ${this.renderPurchaseActionButtons(comm)}
          <button type="button" class="btn btn-outline btn-sm btn-inv-detail" data-pid="${item.Product_ID}" style="font-size: 0.8rem; font-weight: 600;">
            🔍 Xem chi tiết sản phẩm
          </button>
        </div>

      </div>
    `;
  }

  renderPurchaseActionButtons(comm) {
    const btns = [];

    if (comm.tiktok && comm.tiktok.URL_Status === 'VERIFIED_ACTIVE') {
      btns.push(`
        <a href="${comm.tiktok.Product_URL}" target="_blank" rel="noopener" class="btn btn-sm" style="background: #000000; color: white; font-weight: 700; text-decoration: none; font-size: 0.78rem; text-align: center; border-radius: var(--radius-sm); padding: 6px 10px;">
          🛒 ĐẶT MUA TRÊN TIKTOK SHOP
        </a>
      `);
    }

    if (comm.shopee && comm.shopee.URL_Status === 'VERIFIED_ACTIVE') {
      btns.push(`
        <a href="${comm.shopee.Product_URL}" target="_blank" rel="noopener" class="btn btn-sm" style="background: #EE4D2D; color: white; font-weight: 700; text-decoration: none; font-size: 0.78rem; text-align: center; border-radius: var(--radius-sm); padding: 6px 10px;">
          🛒 ĐẶT MUA TRÊN SHOPEE MALL
        </a>
      `);
    }

    if (btns.length === 0 && comm.official) {
      btns.push(`
        <a href="${comm.official.Product_URL}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="font-size: 0.78rem; text-align: center; border-radius: var(--radius-sm); padding: 6px 10px;">
          🌐 XEM THÔNG TIN HÃNG
        </a>
      `);
    }

    return btns.join('');
  }

  translateMobility(m) {
    if (m === 'HIGH') return 'Di chuyển nhiều (Siêu gọn nhẹ)';
    if (m === 'MEDIUM') return 'Di chuyển vừa phải';
    if (m === 'LOW') return 'Chủ yếu cố định';
    return m;
  }

  bindEvents() {
    const invEl = document.getElementById('investmentModule');
    if (!invEl) return;

    // Update button
    const btnUpdate = invEl.querySelector('#btnUpdateInv');
    if (btnUpdate) {
      btnUpdate.addEventListener('click', () => {
        // Read form values
        const ucChecked = Array.from(invEl.querySelectorAll('input[name="uc"]:checked')).map(cb => cb.value);
        this.state.useCases = ucChecked.length > 0 ? ucChecked : ['Live'];
        this.state.hostCount = parseInt(invEl.querySelector('#invHostCount').value, 10);
        this.state.mobility = invEl.querySelector('#invMobility').value;
        this.state.installer = invEl.querySelector('#invInstaller').value;
        this.state.priority = invEl.querySelector('#invPriority').value;
        this.state.ownedDevice = invEl.querySelector('#invOwnedDevice').value;
        this.state.budgetPerKit = parseInt(invEl.querySelector('#invBudget').value, 10) || 5000000;
        this.state.kitCount = parseInt(invEl.querySelector('#invKitCount').value, 10) || 10;
        
        this.render();
      });
    }

    // Select combo buttons
    invEl.querySelectorAll('.btn-select-combo').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.selectedOptionType = btn.getAttribute('data-combo-type');
        this.render();
      });
    });

    // View product detail modal
    invEl.querySelectorAll('.btn-inv-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-pid');
        this.modalController.showProduct(pid);
      });
    });
  }
}
