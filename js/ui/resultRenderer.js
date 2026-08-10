import { marketplaceService } from '../data/marketplaceService.js';

export class ResultRenderer {
  constructor(engine, modalController, onEdit) {
    this.engine = engine;
    this.modalController = modalController;
    this.onEdit = onEdit;
  }

  render(result) {
    const resultEl = document.getElementById('recommendationResult');
    if (!resultEl) return;

    // Handle Error State: OVER_BUDGET
    if (result.overallStatus === 'OVER_BUDGET') {
      resultEl.innerHTML = this.renderOverBudgetView(result);
      this.bindErrorEvents();
      return;
    }

    // Handle Error State: MISSING_DATA
    if (result.overallStatus === 'MISSING_DATA') {
      resultEl.innerHTML = this.renderMissingDataView(result);
      this.bindErrorEvents();
      return;
    }

    // Handle Error State: NO_MATCH
    if (result.overallStatus === 'NO_MATCH') {
      resultEl.innerHTML = this.renderNoMatchView(result);
      this.bindErrorEvents();
      return;
    }

    // Group items into 4 tiers
    const requiredItems = result.items.filter(i => i.tier === 'REQUIRED');
    const recommendedItems = result.items.filter(i => i.tier === 'RECOMMENDED');
    const optionalItems = result.items.filter(i => i.tier === 'OPTIONAL');
    const upgradeItems = []; // Populated if style upgrade available

    let systemHeadline = "HỆ THỐNG ĐỀ XUẤT";
    if (result.recommendedSystem === 'SMARTPHONE') systemHeadline = "HỆ SMARTPHONE CƠ ĐỘNG";
    else if (result.recommendedSystem === 'POCKET') systemHeadline = "HỆ DJI POCKET 3 GHI HÌNH CHUYÊN SÂU";
    else if (result.recommendedSystem === 'WEBCAM_PC') systemHeadline = "HỆ WEBCAM PC & OBS CỐ ĐỊNH";

    resultEl.innerHTML = `
      <div class="result-container container">
        <!-- 1. Top Decision Summary Card -->
        <div class="decision-summary-card">
          <div class="decision-summary-header">
            <div>
              <div class="decision-system-badge">⚡ ĐỀ XUẤT CHÍNH THỨC</div>
              <h1 class="decision-headline">${systemHeadline}</h1>
              <p class="decision-subtext">Hệ thống đề xuất dựa trên thiết bị anh đang có, ưu tiên tính cơ động và tối ưu chi phí.</p>
            </div>
            <div>
              <button type="button" class="btn btn-outline" id="editAnswersBtn" style="color: #FFFFFF; border-color: rgba(255,255,255,0.3);">
                ✏️ CHỈNH LẠI NHU CẦU
              </button>
            </div>
          </div>

          <div class="decision-metrics-grid">
            <div class="metric-item">
              <div class="metric-label">Hệ đề xuất</div>
              <div class="metric-value metric-value-highlight">${result.recommendedSystem}</div>
            </div>

            <div class="metric-item">
              <div class="metric-label">Cần mua thêm</div>
              <div class="metric-value metric-value-highlight">${result.requiredTotal.toLocaleString()}đ</div>
            </div>

            <div class="metric-item">
              <div class="metric-label">Dự toán ngân sách</div>
              <div class="metric-value">${result.budgetVND.toLocaleString()}đ</div>
            </div>

            <div class="metric-item">
              <div class="metric-label">Trạng thái</div>
              <div>
                <span class="metric-badge badge-status-within">✓ Trong ngân sách</span>
                <span class="metric-badge badge-status-valid" style="margin-left: 4px;">✓ Tương thích</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. System Reason -->
        <div class="system-reason-section">
          <div class="section-tag">CƠ SỞ RA QUYẾT ĐỊNH</div>
          <h3 class="section-heading">Tại sao hệ thống chọn phương án này?</h3>
          <div class="system-reason-text">
            ${result.systemReason}
          </div>
        </div>

        <!-- 3. Existing Equipment Summary -->
        ${result.existingList.length > 0 ? `
          <div class="reused-section card">
            <div class="section-tag">TIẾT KIỆM NGÂN SÁCH</div>
            <h3 class="section-heading">Thiết bị anh đang tận dụng (0đ — Đã có sẵn)</h3>
            <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: var(--space-3);">
              Hệ thống ưu tiên tận dụng các thiết bị sẵn có dưới đây để giảm thiểu chi phí đầu tư mới:
            </p>
            <div class="reused-chips-grid">
              ${result.existingList.map(item => `
                <div class="reused-card">
                  <div class="reused-check-icon">✓</div>
                  <div class="reused-card-info">
                    <div class="reused-card-name">${item.name}</div>
                    <div class="reused-card-caption">${item.note}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 4. Purchase Tiers (4 Tiers) -->
        <div class="purchase-tiers-container">
          <div class="section-tag">DANH MỤC THIẾT BỊ MUA BỔ SUNG</div>
          <h2 style="font-size: 1.5rem; color: var(--color-primary-dark); margin-bottom: var(--space-6);">Chi tiết 4 Tầng Thiết Bị Cần Trang Bị</h2>

          <!-- Tier 1: REQUIRED -->
          <div class="tier-block">
            <div class="tier-header">
              <span class="tier-badge tier-badge-required">1. BẮT BUỘC MUA</span>
              <span class="tier-desc">Những thiết bị cốt lõi bắt buộc phải có để hệ thống vận hành đúng chuẩn.</span>
            </div>
            ${requiredItems.length > 0 ? `
              <div class="tier-products-grid">
                ${requiredItems.map(item => this.renderProductCard(item)).join('')}
              </div>
            ` : `
              <p style="font-size: 0.875rem; color: var(--color-text-subtle); padding: var(--space-3); background: var(--color-bg-subtle); border-radius: var(--radius-md);">
                ✓ Đã có đủ thiết bị cốt lõi từ danh sách đang sở hữu.
              </p>
            `}
          </div>

          <!-- Tier 2: RECOMMENDED -->
          ${recommendedItems.length > 0 ? `
            <div class="tier-block">
              <div class="tier-header">
                <span class="tier-badge tier-badge-recommended">2. NÊN MUA THÊM</span>
                <span class="tier-desc">Giúp hệ thống ổn định và thao tác tiện lợi hơn, nhưng thiếu vẫn có thể chạy tạm.</span>
              </div>
              <div class="tier-products-grid">
                ${recommendedItems.map(item => this.renderProductCard(item)).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Tier 3: OPTIONAL -->
          ${optionalItems.length > 0 ? `
            <div class="tier-block">
              <div class="tier-header">
                <span class="tier-badge tier-badge-optional">3. TÙY CHỌN BỔ SUNG</span>
                <span class="tier-desc">Phụ kiện nguồn dự phòng, gimbal hoặc đồ gá cho phiên live dài.</span>
              </div>
              <div class="tier-products-grid">
                ${optionalItems.map(item => this.renderProductCard(item)).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- 5. Deep Combo Evaluation (2 Columns) -->
        <div class="combo-evaluation-card">
          <div class="section-tag">PHÂN TÍCH CHUYÊN SÂU</div>
          <h2 style="font-size: 1.5rem; color: var(--color-primary-dark); margin-bottom: var(--space-6);">Đánh Giá Toàn Diện Phương Án Này</h2>

          <div class="evaluation-grid">
            <div>
              <div class="eval-col-title" style="color: var(--color-success-text);">
                <span>✓</span> Combo này mạnh ở đâu?
              </div>
              ${result.comboStrengths.map(s => `
                <div class="eval-item">
                  <div class="eval-item-title">${s.title}</div>
                  <div class="eval-item-desc">${s.desc}</div>
                </div>
              `).join('')}
            </div>

            <div>
              <div class="eval-col-title" style="color: #92400E;">
                <span>⚠️</span> Anh cần lưu ý những hạn chế gì?
              </div>
              ${result.comboLimitations.map(l => `
                <div class="eval-item eval-item-limitation">
                  <div class="eval-item-title" style="color: #92400E;">${l.title}</div>
                  <div class="eval-item-desc">${l.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Trade-off Card -->
          <div class="tradeoff-card">
            <div class="tradeoff-title">
              <span>⚖️</span> Anh đang đánh đổi điều gì với phương án này?
            </div>
            <div class="tradeoff-desc">
              ${result.comboTradeoff}
            </div>
          </div>

          <!-- Fit / Not Fit Parallel Boxes -->
          <div class="fit-grid">
            <div class="fit-box" style="border-left: 4px solid var(--color-success);">
              <div class="fit-title" style="color: var(--color-success-text);">🎯 PHÙ HỢP NHẤT KHI:</div>
              <ul class="fit-list">
                ${result.bestForList.map(item => `<li><span style="color: var(--color-success);">✓</span> ${item}</li>`).join('')}
              </ul>
            </div>

            <div class="fit-box" style="border-left: 4px solid var(--color-error);">
              <div class="fit-title" style="color: var(--color-error-text);">⛔ KHÔNG PHÙ HỢP KHI:</div>
              <ul class="fit-list">
                ${result.notForList.map(item => `<li><span style="color: var(--color-error);">✕</span> ${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- 6. Why Not Other Systems Accordion -->
        <div class="card" style="margin-bottom: var(--space-8);">
          <div class="section-tag">ĐỐI CHIẾU HỆ THỐNG</div>
          <h3 class="section-heading">Tại sao không chọn các phương án khác?</h3>
          
          <div class="accordion">
            <button class="accordion-header">
              <span>Tại sao không chọn hệ Smartphone?</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-body">
              ${result.whyNot.smartphone}
            </div>
          </div>

          <div class="accordion">
            <button class="accordion-header">
              <span>Tại sao không chọn hệ Webcam PC?</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-body">
              ${result.whyNot.webcam}
            </div>
          </div>

          <div class="accordion">
            <button class="accordion-header">
              <span>Tại sao không chọn hệ DJI Pocket?</span>
              <span class="accordion-icon">▼</span>
            </button>
            <div class="accordion-body">
              ${result.whyNot.pocket}
            </div>
          </div>
        </div>

        <!-- 7. Alternatives Section -->
        <div class="alternatives-section">
          <div class="section-tag">LỰA CHỌN THAY THẾ</div>
          <h3 class="section-heading">Các phương án thay thế có sẵn</h3>

          <div class="alternatives-grid">
            <!-- Cheaper -->
            <div class="alt-card">
              <div class="alt-card-type" style="color: var(--color-success-text);">💰 TIẾT KIỆM HƠN</div>
              ${result.cheaperAlternative ? `
                <div class="alt-price">${(result.requiredTotal + result.cheaperAlternative.costDiff).toLocaleString()}đ</div>
                <div class="alt-desc">
                  <strong>${result.cheaperAlternative.title}</strong><br />
                  ${result.cheaperAlternative.strength}<br />
                  <span style="color: #92400E; font-size: 0.8rem;">⚠️ Đánh đổi: ${result.cheaperAlternative.tradeoff}</span>
                </div>
                <button type="button" class="btn btn-outline btn-sm view-prod-btn" data-pid="${result.cheaperAlternative.productId}">
                  Xem chi tiết phương án
                </button>
              ` : `
                <div class="alt-price">${result.requiredTotal.toLocaleString()}đ</div>
                <div class="alt-desc">Cấu hình hiện tại đã là phương án tối thiểu tiết kiệm nhất.</div>
              `}
            </div>

            <!-- Current -->
            <div class="alt-card alt-card-current">
              <div class="alt-card-type" style="color: var(--color-accent-hover);">⭐ ĐANG ĐỀ XUẤT (CÂN BẰNG)</div>
              <div class="alt-price" style="color: var(--color-accent-hover);">${result.requiredTotal.toLocaleString()}đ</div>
              <div class="alt-desc">
                Phương án cân bằng tối ưu giữa chất lượng, độ cơ động và ngân sách thực tế của anh.
              </div>
              <button type="button" class="btn btn-accent btn-sm" disabled style="opacity: 1;">
                Phương án tối ưu
              </button>
            </div>

            <!-- Upgrade -->
            <div class="alt-card">
              <div class="alt-card-type" style="color: #7C3AED;">🚀 NÂNG CẤP CHUYÊN NGHIỆP</div>
              ${result.upgradeAlternative ? `
                <div class="alt-price">${result.upgradeAlternative.costDiff ? `${(result.requiredTotal + result.upgradeAlternative.costDiff).toLocaleString()}đ` : 'Tùy cấu hình'}</div>
                <div class="alt-desc">
                  <strong>${result.upgradeAlternative.title}</strong><br />
                  ${result.upgradeAlternative.strength}<br />
                  <span style="color: var(--color-text-subtle); font-size: 0.8rem;">⚖️ Đánh đổi: ${result.upgradeAlternative.tradeoff}</span>
                </div>
                <button type="button" class="btn btn-outline btn-sm view-prod-btn" data-pid="${result.upgradeAlternative.productId}">
                  Xem chi tiết nâng cấp
                </button>
              ` : `
                <div class="alt-price">Tùy cấu hình</div>
                <div class="alt-desc">Đã là cấu hình cao cấp nhất trong phân khúc.</div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderProductCard(item) {
    const p = item.product || {};
    const comm = marketplaceService.getProductCommercialData(p.Product_ID);
    const priceStr = comm.preferred_price ? `${Number(comm.preferred_price).toLocaleString()}đ` : 'Giá đang cập nhật';

    let ctaHtml = '';
    if (comm.tiktok && comm.tiktok.URL_Status === 'VERIFIED_ACTIVE') {
      ctaHtml += `<a href="${comm.tiktok.Product_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:#000;color:#fff;margin-right:4px;">🛒 TikTok</a>`;
    }
    if (comm.shopee && comm.shopee.URL_Status === 'VERIFIED_ACTIVE') {
      ctaHtml += `<a href="${comm.shopee.Product_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:#EE4D2D;color:#fff;margin-right:4px;">🛒 Shopee</a>`;
    }
      if (!ctaHtml) {
        ctaHtml = `<span class="badge badge-brand" style="background:#F1F5F9;color:#64748B;font-size:0.75rem;">⏳ Đang cập nhật sàn VN</span>`;
      }

    const imgHtml = `<img src="${comm.image}" alt="${p.Product_Name}" class="product-img" style="margin-bottom: var(--space-3); width:100%; height:160px; object-fit:contain;" />`;

    return `
      <div class="result-product-card">
        ${imgHtml}

        <div class="card-top-meta">
          <span class="badge badge-brand">${p.Brand}</span>
          <span class="badge badge-platform">${platform.replace('_', ' ')}</span>
        </div>

        <div class="card-product-title">${p.Product_Name}</div>

        <div class="card-price-row">
          <div class="card-price">${priceStr}</div>
          ${p.Price_Checked_Date ? `<div class="card-price-date">Cập nhật: ${p.Price_Checked_Date}</div>` : ''}
        </div>

        <div class="card-why-selected">
          <strong>Vì sao chọn:</strong> ${item.whySelected}
        </div>

        <div class="card-actions">
          <button type="button" class="btn btn-secondary btn-sm view-prod-btn" data-pid="${item.productId}">
            🔍 Xem chi tiết
          </button>
          ${ctaHtml}
        </div>
      </div>
    `;
  }

  renderOverBudgetView(result) {
    const gap = result.requiredTotal - result.budgetVND;

    return `
      <div class="result-container container container-narrow">
        <div class="error-view-card">
          <div class="error-view-icon">⚠️</div>
          <h2 class="error-view-title" style="color: #991B1B;">Ngân Sách Chưa Đủ Cho Cấu Hình Tối Thiểu</h2>
          <p class="error-view-desc">
            Ngân sách hiện tại (<strong>${result.budgetVND.toLocaleString()}đ</strong>) chưa đủ cho cấu hình bắt buộc đáp ứng nhu cầu (Tổng bắt buộc: <strong>${result.requiredTotal.toLocaleString()}đ</strong>).<br />
            Hệ thống không tự ý cắt bỏ Micro hoặc Đèn bắt buộc để ép vừa ngân sách vì sẽ làm hỏng chất lượng livestream/video.
          </p>

          <div class="alert alert-warning" style="text-align: left; margin-bottom: var(--space-6);">
            <div>
              <strong>Khoảng cách ngân sách:</strong> Thiếu <strong>${gap.toLocaleString()}đ</strong>.<br />
              <strong>Thiết bị bắt buộc cần mua:</strong><br />
              ${result.items.filter(i => i.tier === 'REQUIRED').map(i => `• ${i.product?.Product_Name} (${Number(i.product?.Price_Current || 0).toLocaleString()}đ)`).join('<br />')}
            </div>
          </div>

          <div style="display: flex; gap: var(--space-4); justify-content: center;">
            <button type="button" class="btn btn-primary btn-lg" id="adjustNeedsBtn">
              ✏️ Điều chỉnh nhu cầu
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderMissingDataView(result) {
    return `
      <div class="result-container container container-narrow">
        <div class="error-view-card">
          <div class="error-view-icon">❓</div>
          <h2 class="error-view-title" style="color: #92400E;">Cần Bổ Sung Thêm Thông Tin</h2>
          <p class="error-view-desc">
            Cổng kết nối điện thoại hoặc model Pocket đang được chọn là "Không biết".<br />
            Hệ thống cần thông tin này để đảm bảo micro và phụ kiện tương thích 100% không bị cắm sai cổng.
          </p>

          <button type="button" class="btn btn-primary btn-lg" id="adjustNeedsBtn">
            ← Quay lại bước 1 bổ sung thông tin
          </button>
        </div>
      </div>
    `;
  }

  renderNoMatchView(result) {
    return `
      <div class="result-container container container-narrow">
        <div class="error-view-card">
          <div class="error-view-icon">❌</div>
          <h2 class="error-view-title">Không Tìm Thấy Cấu Hình Phù Hợp</h2>
          <p class="error-view-desc">
            Anh chưa chọn thiết bị ghi hình có sẵn (Điện thoại, Laptop hoặc Pocket) và chưa có đủ thông tin đầu vào.
          </p>

          <button type="button" class="btn btn-primary btn-lg" id="adjustNeedsBtn">
            ← Bắt đầu cấu hình lại
          </button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const resultEl = document.getElementById('recommendationResult');
    if (!resultEl) return;

    // Edit answers
    const editBtn = document.getElementById('editAnswersBtn');
    if (editBtn && this.onEdit) {
      editBtn.addEventListener('click', () => this.onEdit());
    }

    // View Product Detail modal
    resultEl.querySelectorAll('.view-prod-btn[data-pid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-pid');
        this.modalController.showProduct(pid);
      });
    });

    // Accordions
    resultEl.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const acc = header.closest('.accordion');
        acc.classList.toggle('open');
      });
    });
  }

  bindErrorEvents() {
    const adjustBtn = document.getElementById('adjustNeedsBtn');
    if (adjustBtn && this.onEdit) {
      adjustBtn.addEventListener('click', () => this.onEdit());
    }
  }

  getCategoryIcon(cat) {
    const icons = {
      'AUDIO': '🎙️',
      'LIGHTING': '💡',
      'WEBCAM': '📹',
      'CAPTURE': '🎥',
      'MOUNTING': '📱',
      'POWER': '🔋',
      'CONNECTION': '🔌',
      'STORAGE': '💾',
      'LIGHT_MODIFIER': '🔆'
    };
    return icons[cat] || '📦';
  }
}
