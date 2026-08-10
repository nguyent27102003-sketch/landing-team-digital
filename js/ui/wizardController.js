export class WizardController {
  constructor(engine, onComplete) {
    this.engine = engine;
    this.onComplete = onComplete;
    this.currentStep = 1;
    this.totalSteps = 6;

    // State
    this.state = {
      // Step 1: Existing Equipment
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

      // Step 2: Needs
      needLive: true,
      needShortVideo: true,
      needLongVideo: false,
      needProductPhoto: true,
      needHostPhoto: false,

      // Step 3: Live conditions
      hostCount: '1',
      obs: 'No',

      // Step 4: Operating conditions
      mobility: 'High',
      operator: '1 PM',
      space: 'Small',

      // Step 5: Style
      style: 'Compact',

      // Step 6: Budget
      budgetVND: 5000000
    };

    this.render();
  }

  setStep(step) {
    if (step < 1) step = 1;
    if (step > this.totalSteps) step = this.totalSteps;

    // Skip step 3 if Live is not selected
    if (step === 3 && !this.state.needLive) {
      step = this.currentStep < 3 ? 4 : 2;
    }

    this.currentStep = step;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  next() {
    if (this.currentStep === 6) {
      if (this.onComplete) {
        this.onComplete(this.state);
      }
      return;
    }
    this.setStep(this.currentStep + 1);
  }

  prev() {
    this.setStep(this.currentStep - 1);
  }

  render() {
    const wizardEl = document.getElementById('configuratorWizard');
    if (!wizardEl) return;

    // Calculate progress percentage
    const progressPct = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;

    const steps = [
      { num: 1, label: 'Đang có gì?' },
      { num: 2, label: 'Cần làm gì?' },
      { num: 3, label: 'Livestream' },
      { num: 4, label: 'Điều kiện' },
      { num: 5, label: 'Phong cách' },
      { num: 6, label: 'Ngân sách' }
    ];

    wizardEl.innerHTML = `
      <div class="wizard-container container container-narrow">
        <div class="wizard-header">
          <h2 class="wizard-title">Cấu hình Bộ Thiết Bị Theo Nhu Cầu</h2>
          <p class="wizard-subtitle">Hệ thống phân tích thiết bị đang có để tránh mua trùng và chọn combo tối ưu nhất.</p>
        </div>

        <div class="stepper-wrap">
          <div class="stepper">
            <div class="stepper-progress-bar" style="width: ${progressPct}%;"></div>
            ${steps.map(s => `
              <div class="step-item ${s.num === this.currentStep ? 'active' : ''} ${s.num < this.currentStep ? 'completed' : ''}" data-step="${s.num}">
                <div class="step-circle">${s.num < this.currentStep ? '✓' : s.num}</div>
                <div class="step-label">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="step-card">
          ${this.renderStepContent()}
        </div>

        <div class="wizard-nav">
          ${this.currentStep > 1 ? `
            <button type="button" class="btn btn-outline" id="wizardPrevBtn">← Quay lại</button>
          ` : '<div></div>'}
          
          ${this.currentStep < 6 ? `
            <button type="button" class="btn btn-primary btn-lg" id="wizardNextBtn">Tiếp tục →</button>
          ` : `
            <button type="button" class="btn btn-accent btn-lg" id="wizardSubmitBtn">🚀 TÌM CẤU HÌNH PHÙ HỢP</button>
          `}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderStepContent() {
    switch (this.currentStep) {
      case 1:
        return this.renderStep1();
      case 2:
        return this.renderStep2();
      case 3:
        return this.renderStep3();
      case 4:
        return this.renderStep4();
      case 5:
        return this.renderStep5();
      case 6:
        return this.renderStep6();
      default:
        return '';
    }
  }

  // STEP 1: Existing Equipment
  renderStep1() {
    // Generate active list of selected equipment
    const activeSelected = [];
    if (this.state.hasSmartphone) activeSelected.push(`Điện thoại (${this.state.smartphoneOS} - ${this.state.smartphoneConnector})`);
    if (this.state.hasLaptopPC) activeSelected.push('Laptop / PC');
    if (this.state.hasPocket) activeSelected.push(`Pocket Camera (${this.state.pocketModel})`);
    if (this.state.hasWebcam) activeSelected.push('Webcam');
    if (this.state.hasMic) activeSelected.push('Microphone');
    if (this.state.hasLight) activeSelected.push('Đèn chiếu sáng');
    if (this.state.hasTripod) activeSelected.push('Chân máy / Tripod');
    if (this.state.hasPower) activeSelected.push('Pin sạc dự phòng');
    if (this.state.hasHubAdapter) activeSelected.push('Hub / Adapter');
    if (this.state.hasStorage) activeSelected.push('Thẻ nhớ microSD');

    return `
      <div class="step-card-header">
        <h3 class="step-question">Bước 1: Anh đang có sẵn những thiết bị gì?</h3>
        <p class="step-hint">Hệ thống sẽ tận dụng tối đa đồ đang có và không tính tiền mua lại nếu chúng tương thích.</p>
      </div>

      <div class="selection-grid selection-grid-4">
        <div class="selection-card ${this.state.hasSmartphone ? 'selected' : ''}" data-field="hasSmartphone">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">📱</div>
          <div class="selection-card-title">Điện thoại</div>
          <div class="selection-card-desc">iPhone hoặc Android</div>
        </div>

        <div class="selection-card ${this.state.hasLaptopPC ? 'selected' : ''}" data-field="hasLaptopPC">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">💻</div>
          <div class="selection-card-title">Laptop / PC</div>
          <div class="selection-card-desc">Máy tính vận hành</div>
        </div>

        <div class="selection-card ${this.state.hasPocket ? 'selected' : ''}" data-field="hasPocket">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">🎥</div>
          <div class="selection-card-title">Pocket Camera</div>
          <div class="selection-card-desc">DJI Pocket 3 / Khác</div>
        </div>

        <div class="selection-card ${this.state.hasWebcam ? 'selected' : ''}" data-field="hasWebcam">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">📹</div>
          <div class="selection-card-title">Webcam</div>
          <div class="selection-card-desc">Ghi hình cắm máy tính</div>
        </div>
      </div>

      ${this.state.hasSmartphone ? `
        <div class="conditional-box">
          <div class="conditional-title">Chi tiết điện thoại đang dùng:</div>
          <div style="display: flex; gap: var(--space-6); flex-wrap: wrap;">
            <div>
              <div style="font-size: 0.8rem; color: var(--color-text-subtle); margin-bottom: 6px;">Hệ điều hành:</div>
              <div class="radio-group">
                <div class="radio-pill ${this.state.smartphoneOS === 'iOS' ? 'selected' : ''}" data-prop="smartphoneOS" data-val="iOS">iPhone (iOS)</div>
                <div class="radio-pill ${this.state.smartphoneOS === 'Android' ? 'selected' : ''}" data-prop="smartphoneOS" data-val="Android">Android</div>
              </div>
            </div>

            <div>
              <div style="font-size: 0.8rem; color: var(--color-text-subtle); margin-bottom: 6px;">Cổng kết nối vật lý:</div>
              <div class="radio-group">
                <div class="radio-pill ${this.state.smartphoneConnector === 'USB-C' ? 'selected' : ''}" data-prop="smartphoneConnector" data-val="USB-C">Cổng Type-C (iPhone 15+/Android)</div>
                <div class="radio-pill ${this.state.smartphoneConnector === 'Lightning' ? 'selected' : ''}" data-prop="smartphoneConnector" data-val="Lightning">Cổng Lightning (iPhone cũ)</div>
                <div class="radio-pill ${this.state.smartphoneConnector === 'Unknown' ? 'selected' : ''}" data-prop="smartphoneConnector" data-val="Unknown">Không biết rõ</div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      ${this.state.hasPocket ? `
        <div class="conditional-box">
          <div class="conditional-title">Phiên bản Pocket đang có:</div>
          <div class="radio-group">
            <div class="radio-pill ${this.state.pocketModel === 'Pocket 3' ? 'selected' : ''}" data-prop="pocketModel" data-val="Pocket 3">DJI Osmo Pocket 3</div>
            <div class="radio-pill ${this.state.pocketModel === 'Other' ? 'selected' : ''}" data-prop="pocketModel" data-val="Other">Pocket 1 / 2 hoặc camera khác</div>
            <div class="radio-pill ${this.state.pocketModel === 'Unknown' ? 'selected' : ''}" data-prop="pocketModel" data-val="Unknown">Không biết</div>
          </div>
        </div>
      ` : ''}

      <div class="accessories-section">
        <div class="accessories-title">Phụ kiện & Thiết bị hỗ trợ đã có sẵn:</div>
        <div class="accessories-grid">
          <div class="accessory-chip ${this.state.hasMic ? 'selected' : ''}" data-field="hasMic">
            <span class="accessory-chip-icon">🎙️</span>
            <span class="accessory-chip-label">Microphone</span>
          </div>
          <div class="accessory-chip ${this.state.hasLight ? 'selected' : ''}" data-field="hasLight">
            <span class="accessory-chip-icon">💡</span>
            <span class="accessory-chip-label">Đèn chiếu sáng</span>
          </div>
          <div class="accessory-chip ${this.state.hasTripod ? 'selected' : ''}" data-field="hasTripod">
            <span class="accessory-chip-icon">📐</span>
            <span class="accessory-chip-label">Chân máy / Tripod</span>
          </div>
          <div class="accessory-chip ${this.state.hasPower ? 'selected' : ''}" data-field="hasPower">
            <span class="accessory-chip-icon">🔋</span>
            <span class="accessory-chip-label">Pin sạc dự phòng</span>
          </div>
          <div class="accessory-chip ${this.state.hasHubAdapter ? 'selected' : ''}" data-field="hasHubAdapter">
            <span class="accessory-chip-icon">🔌</span>
            <span class="accessory-chip-label">Hub / Adapter</span>
          </div>
          <div class="accessory-chip ${this.state.hasStorage ? 'selected' : ''}" data-field="hasStorage">
            <span class="accessory-chip-icon">💾</span>
            <span class="accessory-chip-label">Thẻ nhớ microSD</span>
          </div>
        </div>
      </div>

      <div class="reused-summary-box">
        <div class="reused-box-icon">✓</div>
        <div class="reused-box-content">
          <div class="reused-box-title">Thiết bị sẽ được tận dụng tự động (${activeSelected.length} món)</div>
          <div class="reused-box-desc">
            ${activeSelected.length > 0 ? `<strong>Đang tận dụng:</strong> ${activeSelected.join(' · ')}.` : 'Chưa chọn thiết bị có sẵn nào.'}
            <br />Hệ thống sẽ không tính lại chi phí những món anh đã chọn nếu chúng tương thích với luồng công việc.
          </div>
        </div>
      </div>
    `;
  }

  // STEP 2: Needs (Multi-select)
  renderStep2() {
    return `
      <div class="step-card-header">
        <h3 class="step-question">Bước 2: Anh cần làm những công việc gì?</h3>
        <p class="step-hint">Có thể chọn nhiều mục. Hệ thống sẽ cân đối để một cấu hình phục vụ trọn vẹn các tác vụ.</p>
      </div>

      <div class="selection-grid selection-grid-3">
        <div class="selection-card ${this.state.needLive ? 'selected' : ''}" data-field="needLive">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">🔴</div>
          <div class="selection-card-title">Livestream</div>
          <div class="selection-card-desc">Bán hàng / tương tác trực tiếp</div>
        </div>

        <div class="selection-card ${this.state.needShortVideo ? 'selected' : ''}" data-field="needShortVideo">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">📱</div>
          <div class="selection-card-title">Video ngắn</div>
          <div class="selection-card-desc">TikTok / Reels / Shorts</div>
        </div>

        <div class="selection-card ${this.state.needLongVideo ? 'selected' : ''}" data-field="needLongVideo">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">🎬</div>
          <div class="selection-card-title">Video dài</div>
          <div class="selection-card-desc">YouTube / Phỏng vấn / Đào tạo</div>
        </div>

        <div class="selection-card ${this.state.needProductPhoto ? 'selected' : ''}" data-field="needProductPhoto">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">📦</div>
          <div class="selection-card-title">Chụp sản phẩm</div>
          <div class="selection-card-desc">Ảnh sản phẩm thực tế tại shop</div>
        </div>

        <div class="selection-card ${this.state.needHostPhoto ? 'selected' : ''}" data-field="needHostPhoto">
          <div class="selection-card-checkbox">✓</div>
          <div class="selection-card-icon">👤</div>
          <div class="selection-card-title">Chụp Host / Người</div>
          <div class="selection-card-desc">Ảnh truyền thông, KOL, Dược sĩ</div>
        </div>
      </div>
    `;
  }

  // STEP 3: Livestream conditions
  renderStep3() {
    return `
      <div class="step-card-header">
        <h3 class="step-question">Bước 3: Thiết lập buổi Livestream</h3>
        <p class="step-hint">Thông tin này quyết định cấu hình Micro (1 hay 2 người) và luồng phần mềm OBS.</p>
      </div>

      <div style="margin-bottom: var(--space-6);">
        <div style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-3);">Số lượng Host / Người nói cùng lúc:</div>
        <div class="selection-grid selection-grid-3">
          <div class="selection-card ${this.state.hostCount === '1' ? 'selected' : ''}" data-prop="hostCount" data-val="1">
            <div class="selection-card-icon">👤</div>
            <div class="selection-card-title">1 Host</div>
            <div class="selection-card-desc">1 người dẫn chính</div>
          </div>
          <div class="selection-card ${this.state.hostCount === '2' ? 'selected' : ''}" data-prop="hostCount" data-val="2">
            <div class="selection-card-icon">👥</div>
            <div class="selection-card-title">2 Hosts</div>
            <div class="selection-card-desc">2 người nói song song (2TX)</div>
          </div>
          <div class="selection-card ${this.state.hostCount === '3+' ? 'selected' : ''}" data-prop="hostCount" data-val="3+">
            <div class="selection-card-icon">👥👥</div>
            <div class="selection-card-title">3+ Hosts</div>
            <div class="selection-card-desc">Nhóm hoặc hội trường</div>
          </div>
        </div>
      </div>

      <div>
        <div style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-3);">Có sử dụng phần mềm OBS / Live Studio trên máy tính không?</div>
        <div class="radio-group">
          <div class="radio-pill ${this.state.obs === 'Yes' ? 'selected' : ''}" data-prop="obs" data-val="Yes">Có sử dụng OBS trên PC</div>
          <div class="radio-pill ${this.state.obs === 'No' ? 'selected' : ''}" data-prop="obs" data-val="No">Không (Live trực tiếp trên điện thoại)</div>
          <div class="radio-pill ${this.state.obs === 'Unknown' ? 'selected' : ''}" data-prop="obs" data-val="Unknown">Chưa rõ / Không biết</div>
        </div>
      </div>
    `;
  }

  // STEP 4: Operating conditions
  renderStep4() {
    return `
      <div class="step-card-header">
        <h3 class="step-question">Bước 4: Điều kiện triển khai & Không gian</h3>
        <p class="step-hint">Yếu tố quyết định tính cơ động của đèn, pin và thiết bị ghi hình.</p>
      </div>

      <div style="margin-bottom: var(--space-6);">
        <div style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-3);">Mức độ di chuyển:</div>
        <div class="selection-grid selection-grid-3">
          <div class="selection-card ${this.state.mobility === 'High' ? 'selected' : ''}" data-prop="mobility" data-val="High">
            <div class="selection-card-icon">🚗</div>
            <div class="selection-card-title">Di chuyển nhiều</div>
            <div class="selection-card-desc">Đi nhiều shop, ưu tiên nhẹ và ít dây</div>
          </div>
          <div class="selection-card ${this.state.mobility === 'Medium' ? 'selected' : ''}" data-prop="mobility" data-val="Medium">
            <div class="selection-card-icon">🚶</div>
            <div class="selection-card-title">Di chuyển vừa phải</div>
            <div class="selection-card-desc">Cơ động trong tòa nhà / phòng ban</div>
          </div>
          <div class="selection-card ${this.state.mobility === 'Fixed' ? 'selected' : ''}" data-prop="mobility" data-val="Fixed">
            <div class="selection-card-icon">🏢</div>
            <div class="selection-card-title">Setup cố định</div>
            <div class="selection-card-desc">Phòng live / Bàn làm việc cố định</div>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
        <div>
          <div style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-2);">Ai vận hành setup?</div>
          <div class="radio-group">
            <div class="radio-pill ${this.state.operator === '1 PM' ? 'selected' : ''}" data-prop="operator" data-val="1 PM">1 PM tự setup</div>
            <div class="radio-pill ${this.state.operator === '2 People' ? 'selected' : ''}" data-prop="operator" data-val="2 People">2 người</div>
            <div class="radio-pill ${this.state.operator === 'Team' ? 'selected' : ''}" data-prop="operator" data-val="Team">Team chuyên trách</div>
          </div>
        </div>

        <div>
          <div style="font-weight: 700; color: var(--color-primary-dark); margin-bottom: var(--space-2);">Không gian ghi hình:</div>
          <div class="radio-group">
            <div class="radio-pill ${this.state.space === 'Small' ? 'selected' : ''}" data-prop="space" data-val="Small">Không gian nhỏ</div>
            <div class="radio-pill ${this.state.space === 'Shop' ? 'selected' : ''}" data-prop="space" data-val="Shop">Shop / Chi nhánh</div>
            <div class="radio-pill ${this.state.space === 'Live Room' ? 'selected' : ''}" data-prop="space" data-val="Live Room">Phòng Live Studio</div>
            <div class="radio-pill ${this.state.space === 'Large' ? 'selected' : ''}" data-prop="space" data-val="Large">Hội trường lớn</div>
          </div>
        </div>
      </div>
    `;
  }

  // STEP 5: Style
  renderStep5() {
    return `
      <div class="step-card-header">
        <h3 class="step-question">Bước 5: Định hướng phong cách thiết bị</h3>
        <p class="step-hint">Lựa chọn ưu tiên về trọng lượng, dây nhợ hay khả năng mở rộng.</p>
      </div>

      <div class="selection-grid selection-grid-3">
        <div class="selection-card ${this.state.style === 'Compact' ? 'selected' : ''}" data-prop="style" data-val="Compact">
          <div class="selection-card-icon">⚡</div>
          <div class="selection-card-title">GỌN NHẸ</div>
          <div class="selection-card-desc">Ưu tiên nhỏ, nhẹ, ít dây, setup nhanh và dễ mang theo.</div>
        </div>

        <div class="selection-card ${this.state.style === 'Balanced' ? 'selected' : ''}" data-prop="style" data-val="Balanced">
          <div class="selection-card-icon">⚖️</div>
          <div class="selection-card-title">CÂN BẰNG</div>
          <div class="selection-card-desc">Cân bằng chất lượng, độ cơ động và chi phí hợp lý.</div>
        </div>

        <div class="selection-card ${this.state.style === 'Professional' ? 'selected' : ''}" data-prop="style" data-val="Professional">
          <div class="selection-card-icon">🏆</div>
          <div class="selection-card-title">CHUYÊN NGHIỆP</div>
          <div class="selection-card-desc">Ưu tiên chất lượng, độ ổn định và khả năng nâng cấp lâu dài.</div>
        </div>
      </div>

      <div class="alert alert-info">
        <span>ℹ️</span>
        <div><strong>Lưu ý:</strong> "Chuyên nghiệp" không đồng nghĩa với việc hệ thống sẽ tự chọn món đắt nhất; "Gọn nhẹ" không đồng nghĩa với chất lượng thấp.</div>
      </div>
    `;
  }

  // STEP 6: Budget
  renderStep6() {
    const formattedBudget = Number(this.state.budgetVND).toLocaleString();

    return `
      <div class="step-card-header">
        <h3 class="step-question">Bước 6: Dự toán ngân sách mua thêm</h3>
        <p class="step-hint">Ngân sách chỉ tính những thiết bị cần mua bổ sung. Thiết bị anh đã có không tính vào đây.</p>
      </div>

      <div class="budget-presets">
        <div class="radio-pill ${this.state.budgetVND === 3000000 ? 'selected' : ''}" data-budget="3000000">< 3 triệu</div>
        <div class="radio-pill ${this.state.budgetVND === 5000000 ? 'selected' : ''}" data-budget="5000000">3 – 5 triệu</div>
        <div class="radio-pill ${this.state.budgetVND === 7000000 ? 'selected' : ''}" data-budget="7000000">5 – 7 triệu</div>
        <div class="radio-pill ${this.state.budgetVND === 10000000 ? 'selected' : ''}" data-budget="10000000">7 – 10 triệu</div>
      </div>

      <div class="budget-input-wrap">
        <input type="number" class="budget-input" id="budgetInput" value="${this.state.budgetVND}" step="500000" min="500000" max="100000000" />
        <span class="budget-input-unit">VND</span>
      </div>

      <p style="font-size: 0.85rem; color: var(--color-text-subtle); margin-bottom: var(--space-6);">
        Dự toán: <strong>${formattedBudget}đ</strong>
      </p>

      <div class="reused-summary-box">
        <div class="reused-box-icon">💡</div>
        <div class="reused-box-content">
          <div class="reused-box-title">Ngân sách hiệu quả nhất</div>
          <div class="reused-box-desc">Hệ thống sẽ lọc những sản phẩm có link mua và giá VND được xác thực thực tế từ workbook backend.</div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const wizardEl = document.getElementById('configuratorWizard');
    if (!wizardEl) return;

    // Stepper click
    wizardEl.querySelectorAll('.step-item').forEach(el => {
      el.addEventListener('click', () => {
        const targetStep = Number(el.getAttribute('data-step'));
        if (targetStep < this.currentStep) {
          this.setStep(targetStep);
        }
      });
    });

    // Next / Prev buttons
    const nextBtn = document.getElementById('wizardNextBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    const prevBtn = document.getElementById('wizardPrevBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());

    const submitBtn = document.getElementById('wizardSubmitBtn');
    if (submitBtn) submitBtn.addEventListener('click', () => this.next());

    // Toggle Checkbox Cards (Field booleans)
    wizardEl.querySelectorAll('.selection-card[data-field], .accessory-chip[data-field]').forEach(card => {
      card.addEventListener('click', () => {
        const field = card.getAttribute('data-field');
        this.state[field] = !this.state[field];
        this.render();
      });
    });

    // Single Select Radio Cards / Pills
    wizardEl.querySelectorAll('[data-prop][data-val]').forEach(item => {
      item.addEventListener('click', () => {
        const prop = item.getAttribute('data-prop');
        const val = item.getAttribute('data-val');
        this.state[prop] = val;
        this.render();
      });
    });

    // Budget presets
    wizardEl.querySelectorAll('[data-budget]').forEach(pill => {
      pill.addEventListener('click', () => {
        this.state.budgetVND = Number(pill.getAttribute('data-budget'));
        this.render();
      });
    });

    // Budget manual input
    const budgetInput = document.getElementById('budgetInput');
    if (budgetInput) {
      budgetInput.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        if (!isNaN(val)) {
          this.state.budgetVND = val;
        }
      });
    }
  }
}
