import { specsData } from '../data/specsData.js';
import { compatibilityData } from '../data/compatibilityData.js';
import { alternativesData } from '../data/alternativesData.js';
import { comparisonsData } from '../data/comparisonsData.js';

const specsMap = new Map();
specsData.forEach(s => specsMap.set(s.Product_ID, s));

export class ModalController {
  constructor(engine) {
    this.engine = engine;
    this.modalBackdrop = document.getElementById('productDetailModal');
    this.setupListeners();
  }

  setupListeners() {
    if (!this.modalBackdrop) return;
    
    // Close on backdrop or close button click
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop || e.target.closest('.modal-close-btn')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  close() {
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.add('hidden');
    }
  }

  showProduct(productId) {
    const product = this.engine.getProduct(productId);
    if (!product) return;

    const specs = specsMap.get(productId) || {};
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;

    // Determine purchase CTA vs info CTA
    let ctaHtml = '';
    const linkStatus = product.Link_Status || 'NEED_VERIFY';
    const primaryLink = product.Primary_Link || '';
    const platform = product.Primary_Platform || 'OFFICIAL';

    if (platform === 'TIKTOK_SHOP' || platform === 'RETAILER') {
      if (linkStatus === 'ACTIVE' && primaryLink) {
        ctaHtml = `<a href="${primaryLink}" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-lg">🛒 ĐẶT MUA NGAY (${platform.replace('_', ' ')})</a>`;
      } else {
        ctaHtml = `<button class="btn btn-secondary btn-lg disabled" disabled>LINK CẦN CẬP NHẬT</button>`;
      }
    } else {
      if (primaryLink) {
        ctaHtml = `<a href="${primaryLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">🌐 XEM THÔNG TIN TỪ HÃNG</a>`;
      } else {
        ctaHtml = `<span class="badge badge-brand">THÔNG TIN ĐANG CẬP NHẬT</span>`;
      }
    }

    // Specialized Specs UI based on category
    let specsHtml = '';
    if (product.Category === 'AUDIO') {
      specsHtml = `
        <div class="card" style="background-color: var(--color-bg-subtle); margin-bottom: var(--space-4);">
          <h4 style="margin-bottom: var(--space-3); font-size: 0.95rem;">🎙️ THÔNG SỐ ÂM THANH CHUYÊN SÂU</h4>
          <div class="grid grid-3 gap-3" style="font-size: 0.85rem;">
            <div><strong>Số Bộ phát (TX):</strong> ${specs.TX_Count || product.TX_Count || '1 hoặc 2 by kit'}</div>
            <div><strong>Số Bộ nhận (RX):</strong> ${specs.RX_Count || product.RX_Count || '1'}</div>
            <div><strong>Số người nói (Host):</strong> ${specs.Host_Count || (product.Host_2 === 'Yes' ? '2 Host' : '1 Host')}</div>
            <div><strong>Không dây (Wireless):</strong> ${specs.Wireless || 'Yes'}</div>
            <div><strong>Ghi âm nội bộ (Internal):</strong> ${specs.Internal_Recording || 'Không'}</div>
            <div><strong>Khử ồn (Noise Cancel):</strong> ${specs.Noise_Cancellation || 'Có'}</div>
            <div><strong>Chuẩn Type-C / Lightning:</strong> Type-C ${product.iPhone_USB_C === 'Yes' ? '✓' : ''} | Lightning ${product.iPhone_Lightning === 'Yes' ? '✓' : 'Adapter'}</div>
            <div><strong>Timecode:</strong> ${specs.Timecode || 'Không'}</div>
            <div><strong>Cổng 3.5mm:</strong> ${specs.Audio_3_5mm || 'Có'}</div>
          </div>
        </div>
      `;
    } else if (product.Category === 'LIGHTING') {
      specsHtml = `
        <div class="card" style="background-color: var(--color-bg-subtle); margin-bottom: var(--space-4);">
          <h4 style="margin-bottom: var(--space-3); font-size: 0.95rem;">💡 THÔNG SỐ ÁNH SÁNG CHUYÊN SÂU</h4>
          <div class="grid grid-3 gap-3" style="font-size: 0.85rem;">
            <div><strong>Loại đèn (Type):</strong> ${specs.Light_Type || product.Subcategory || 'POCKET_LIGHT'}</div>
            <div><strong>Công suất (Watt):</strong> ${specs.Total_Output_W || product.Power_Watt || '25-32'}W</div>
            <div><strong>Nguồn / Pin (Power):</strong> ${product.Power_Type || 'Pin tích hợp'}</div>
            <div><strong>Đổi màu Bi-Color / RGB:</strong> ${specs.Bi_Color || 'Có'}</div>
            <div><strong>Chỉ số CRI / TLCI:</strong> ${specs.CRI || '95+'}</div>
            <div><strong>Chuẩn ngàm (Mount):</strong> ${specs.Mount_Type || 'Cold shoe / 1/4-20'}</div>
            <div><strong>Khung hình tối ưu:</strong> ${specs.Best_Frame || 'Cận cảnh / Bán thân'}</div>
            <div><strong>Chuẩn sạc PD:</strong> ${specs.PD || 'USB-C'}</div>
            <div><strong>Tản nhiệt (Cooling):</strong> ${specs.Cooling || 'Passive / Tự nhiên'}</div>
          </div>
        </div>
      `;
    } else if (product.Category === 'WEBCAM') {
      specsHtml = `
        <div class="card" style="background-color: var(--color-bg-subtle); margin-bottom: var(--space-4);">
          <h4 style="margin-bottom: var(--space-3); font-size: 0.95rem;">📹 THÔNG SỐ WEBCAM LIVESTREAM</h4>
          <div class="grid grid-3 gap-3" style="font-size: 0.85rem;">
            <div><strong>Độ phân giải:</strong> ${specs.Max_Resolution || '4K Ultra HD'}</div>
            <div><strong>Tốc độ khung hình (FPS):</strong> ${specs.Max_FPS || '60 FPS'}</div>
            <div><strong>Cảm biến (Sensor):</strong> ${specs.Sensor || 'CMOS'}</div>
            <div><strong>Tự động lấy nét (AF):</strong> ${specs.Autofocus || 'Có'}</div>
            <div><strong>Theo dõi thông minh (AI):</strong> ${specs.AI_Tracking || 'Auto Framing'}</div>
            <div><strong>Gimbal cơ học (PTZ):</strong> ${specs.Mechanical_Gimbal || 'Không'}</div>
            <div><strong>Tương thích OBS:</strong> ${product.OBS === 'Yes' ? 'Tương thích hoàn toàn' : 'Hỗ trợ'}</div>
            <div><strong>Cổng kết nối:</strong> ${specs.USB_Type || 'USB-C'}</div>
          </div>
        </div>
      `;
    }

    // Fact -> Impact Strengths
    let strengthsHtml = '';
    if (product.Strength_1_Fact) {
      strengthsHtml += `
        <div class="fact-impact-box">
          <div class="fact-title">✓ ${product.Strength_1_Fact}</div>
          <div class="fact-impact">→ <strong>Tác động thực tế:</strong> ${product.Strength_1_Impact || 'Tăng hiệu quả vận hành.'}</div>
        </div>
      `;
    }
    if (product.Strength_2_Fact) {
      strengthsHtml += `
        <div class="fact-impact-box">
          <div class="fact-title">✓ ${product.Strength_2_Fact}</div>
          <div class="fact-impact">→ <strong>Tác động thực tế:</strong> ${product.Strength_2_Impact || ''}</div>
        </div>
      `;
    }
    if (product.Strength_3_Fact) {
      strengthsHtml += `
        <div class="fact-impact-box">
          <div class="fact-title">✓ ${product.Strength_3_Fact}</div>
          <div class="fact-impact">→ <strong>Tác động thực tế:</strong> ${product.Strength_3_Impact || ''}</div>
        </div>
      `;
    }

    // Fact -> Impact Limitations
    let limitationsHtml = '';
    if (product.Limitation_1_Fact) {
      limitationsHtml += `
        <div class="fact-impact-box fact-impact-negative">
          <div class="fact-title" style="color: #92400E;">⚠️ ${product.Limitation_1_Fact}</div>
          <div class="fact-impact">→ <strong>Lưu ý vận hành:</strong> ${product.Limitation_1_Impact || ''}</div>
        </div>
      `;
    }
    if (product.Limitation_2_Fact) {
      limitationsHtml += `
        <div class="fact-impact-box fact-impact-negative">
          <div class="fact-title" style="color: #92400E;">⚠️ ${product.Limitation_2_Fact}</div>
          <div class="fact-impact">→ <strong>Lưu ý vận hành:</strong> ${product.Limitation_2_Impact || ''}</div>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <div style="display: flex; gap: var(--space-6); margin-bottom: var(--space-6); flex-wrap: wrap;">
        <div style="width: 240px; flex-shrink: 0;">
          <div class="product-placeholder" style="aspect-ratio: 1; padding: var(--space-6);">
            <div class="placeholder-icon">${this.getCategoryIcon(product.Category)}</div>
            <div class="placeholder-brand">${product.Brand || 'BRAND'}</div>
            <div class="placeholder-model" style="font-size: 1.1rem; margin-top: 4px;">${product.Model || product.Product_Name}</div>
          </div>
        </div>

        <div style="flex: 1; min-width: 280px;">
          <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);">
            <span class="badge badge-brand">${product.Brand}</span>
            <span class="badge badge-platform">${platform.replace('_', ' ')}</span>
            ${product.Best_Value_Status === 'Yes' ? '<span class="badge badge-winner">BEST VALUE</span>' : ''}
            ${product.Best_Compact_Status === 'Yes' ? '<span class="badge badge-winner">BEST COMPACT</span>' : ''}
          </div>

          <h2 style="font-size: 1.4rem; color: var(--color-primary-dark); margin-bottom: var(--space-2);">${product.Product_Name}</h2>
          
          <div style="display: flex; align-items: baseline; gap: var(--space-3); margin-bottom: var(--space-4);">
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--color-accent-hover);">
              ${product.Price_Current ? `${Number(product.Price_Current).toLocaleString()}đ` : 'Giá đang cập nhật'}
            </div>
            ${product.Price_Checked_Date ? `<span style="font-size: 0.8rem; color: var(--color-text-subtle);">Cập nhật: ${product.Price_Checked_Date}</span>` : ''}
          </div>

          <p style="margin-bottom: var(--space-4); font-size: 0.925rem;">
            <strong>Mục đích chính:</strong> ${product.Description_Short || product.Primary_Function || 'Thiết bị chuyên dụng trong hệ thống livestream, quay video và chụp ảnh.'}
          </p>

          <div style="margin-top: var(--space-4);">
            ${ctaHtml}
          </div>
        </div>
      </div>

      ${specsHtml}

      <div class="grid grid-2 gap-6" style="margin-bottom: var(--space-6);">
        <div>
          <h4 style="font-size: 1rem; color: var(--color-primary-dark); margin-bottom: var(--space-3);">💎 ĐIỂM MẠNH (FACT → IMPACT)</h4>
          ${strengthsHtml || '<p style="font-size: 0.85rem; color: var(--color-text-subtle);">Thông số cơ bản theo tiêu chuẩn nhà sản xuất.</p>'}
        </div>

        <div>
          <h4 style="font-size: 1rem; color: #92400E; margin-bottom: var(--space-3);">⚠️ HẠN CHẾ & LƯU Ý (FACT → IMPACT)</h4>
          ${limitationsHtml || '<p style="font-size: 0.85rem; color: var(--color-text-subtle);">Chưa ghi nhận hạn chế kỹ thuật đặc thù.</p>'}
        </div>
      </div>

      <div class="grid grid-2 gap-4" style="background-color: var(--color-bg-subtle); padding: var(--space-4); border-radius: var(--radius-md); font-size: 0.875rem;">
        <div>
          <strong style="color: var(--color-primary-dark);">🎯 Phù hợp nhất cho:</strong>
          <p style="margin-top: 4px; color: var(--color-text-muted);">${product.Best_For || 'Nhu cầu phổ thông theo hệ thống đã định nghĩa.'}</p>
        </div>
        <div>
          <strong style="color: #991B1B;">⛔ Không phù hợp cho:</strong>
          <p style="margin-top: 4px; color: var(--color-text-muted);">${product.Not_For || 'Các tác vụ vượt quá công suất thiết kế của sản phẩm.'}</p>
        </div>
      </div>

      ${product.Main_Tradeoff ? `
        <div style="margin-top: var(--space-4); background: #FEF9C3; border: 1px solid #FDE047; padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); font-size: 0.85rem; color: #713F12;">
          <strong>⚖️ Trade-off (Đánh đổi):</strong> ${product.Main_Tradeoff}
        </div>
      ` : ''}
    `;

    this.modalBackdrop.classList.remove('hidden');
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
