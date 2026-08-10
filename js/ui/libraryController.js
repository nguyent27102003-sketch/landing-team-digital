import { marketplaceService } from '../data/marketplaceService.js';

export class LibraryController {
  constructor(productsData, modalController) {
    this.products = productsData;
    this.modalController = modalController;

    this.filters = {
      category: 'ALL',
      search: '',
      brand: [],
      priceRange: [],
      system: [],
      sort: 'default'
    };

    this.render();
  }

  render() {
    const libEl = document.getElementById('equipmentLibrary');
    if (!libEl) return;

    // Extract unique brands
    const brands = [...new Set(this.products.map(p => p.Brand).filter(Boolean))].sort();

    libEl.innerHTML = `
      <div class="library-container container">
        <div class="library-header">
          <div class="section-tag">CƠ SỞ DỮ LIỆU THIẾT BỊ</div>
          <h1 style="font-size: 1.85rem; color: var(--color-primary-dark); margin-bottom: var(--space-2);">
            Thư Viện 81 Thiết Bị Đã Được Kiểm Tra & Chuẩn Hóa
          </h1>
          <p style="color: var(--color-text-muted);">
            Tra cứu thông số kỹ thuật, giá tham khảo và đường dẫn mua trực tiếp của từng sản phẩm độc lập không qua Configurator.
          </p>
        </div>

        <!-- Category Tabs Bar -->
        <div class="category-tabs-bar">
          <button class="category-tab ${this.filters.category === 'ALL' ? 'active' : ''}" data-cat="ALL">Tất cả (${this.products.length})</button>
          <button class="category-tab ${this.filters.category === 'CAPTURE_ALL' ? 'active' : ''}" data-cat="CAPTURE_ALL">Thiết bị ghi hình</button>
          <button class="category-tab ${this.filters.category === 'AUDIO' ? 'active' : ''}" data-cat="AUDIO">Micro & Âm thanh</button>
          <button class="category-tab ${this.filters.category === 'LIGHTING' ? 'active' : ''}" data-cat="LIGHTING">Đèn chiếu sáng</button>
          <button class="category-tab ${this.filters.category === 'POWER' ? 'active' : ''}" data-cat="POWER">Nguồn & Pin</button>
          <button class="category-tab ${this.filters.category === 'CONNECTION' ? 'active' : ''}" data-cat="CONNECTION">Kết nối & Hub</button>
          <button class="category-tab ${this.filters.category === 'MOUNTING' ? 'active' : ''}" data-cat="MOUNTING">Rig & Gimbal</button>
          <button class="category-tab ${this.filters.category === 'STORAGE' ? 'active' : ''}" data-cat="STORAGE">Lưu trữ (microSD)</button>
          <button class="category-tab ${this.filters.category === 'LIGHT_MODIFIER' ? 'active' : ''}" data-cat="LIGHT_MODIFIER">Phụ kiện Modifier</button>
        </div>

        <!-- Library Layout: Sidebar + Products Grid -->
        <div class="library-layout">
          <!-- Sidebar Filters -->
          <div class="filter-sidebar">
            <div class="filter-sidebar-header">
              <span class="filter-sidebar-title">Bộ lọc chi tiết</span>
              <button type="button" class="filter-reset-btn" id="resetFiltersBtn">Xóa lọc</button>
            </div>

            <!-- Brand Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Thương hiệu</div>
              <div class="filter-options-list" style="max-height: 180px; overflow-y: auto;">
                ${brands.map(b => `
                  <label class="filter-checkbox-label">
                    <input type="checkbox" value="${b}" data-filter-type="brand" ${this.filters.brand.includes(b) ? 'checked' : ''} />
                    <span>${b}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- Price Band Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Khoảng giá</div>
              <div class="filter-options-list">
                <label class="filter-checkbox-label">
                  <input type="checkbox" value="under_2m" data-filter-type="price" ${this.filters.priceRange.includes('under_2m') ? 'checked' : ''} />
                  <span>Dưới 2 triệu</span>
                </label>
                <label class="filter-checkbox-label">
                  <input type="checkbox" value="2m_5m" data-filter-type="price" ${this.filters.priceRange.includes('2m_5m') ? 'checked' : ''} />
                  <span>2 triệu – 5 triệu</span>
                </label>
                <label class="filter-checkbox-label">
                  <input type="checkbox" value="above_5m" data-filter-type="price" ${this.filters.priceRange.includes('above_5m') ? 'checked' : ''} />
                  <span>Trên 5 triệu</span>
                </label>
              </div>
            </div>

            <!-- System Fit Filter -->
            <div class="filter-group">
              <div class="filter-group-title">Hệ máy tương thích</div>
              <div class="filter-options-list">
                <label class="filter-checkbox-label">
                  <input type="checkbox" value="SMARTPHONE" data-filter-type="system" ${this.filters.system.includes('SMARTPHONE') ? 'checked' : ''} />
                  <span>Smartphone</span>
                </label>
                <label class="filter-checkbox-label">
                  <input type="checkbox" value="PC" data-filter-type="system" ${this.filters.system.includes('PC') ? 'checked' : ''} />
                  <span>PC / Laptop / OBS</span>
                </label>
                <label class="filter-checkbox-label">
                  <input type="checkbox" value="POCKET" data-filter-type="system" ${this.filters.system.includes('POCKET') ? 'checked' : ''} />
                  <span>DJI Pocket</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Main Products Area -->
          <div>
            <!-- Search & Sort Top Bar -->
            <div class="products-top-bar">
              <div class="search-input-wrap">
                <span class="search-icon">🔍</span>
                <input type="text" class="search-input" id="libSearchInput" placeholder="Tìm theo tên model, thương hiệu..." value="${this.filters.search}" />
              </div>

              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <span style="font-size: 0.825rem; color: var(--color-text-subtle);">Sắp xếp:</span>
                <select class="sort-select" id="libSortSelect">
                  <option value="default" ${this.filters.sort === 'default' ? 'selected' : ''}>Mặc định (Workbook)</option>
                  <option value="price_asc" ${this.filters.sort === 'price_asc' ? 'selected' : ''}>Giá: Thấp đến Cao</option>
                  <option value="price_desc" ${this.filters.sort === 'price_desc' ? 'selected' : ''}>Giá: Cao đến Thấp</option>
                  <option value="name_asc" ${this.filters.sort === 'name_asc' ? 'selected' : ''}>Tên: A → Z</option>
                </select>
              </div>
            </div>

            <!-- Product Grid -->
            <div class="library-products-grid" id="libraryGridContainer">
              ${this.renderProductCards()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  getFilteredProducts() {
    return this.products.filter(p => {
      // Category filter
      if (this.filters.category !== 'ALL') {
        if (this.filters.category === 'CAPTURE_ALL') {
          if (p.Category !== 'CAPTURE' && p.Category !== 'WEBCAM') return false;
        } else if (p.Category !== this.filters.category) {
          return false;
        }
      }

      // Search filter
      if (this.filters.search) {
        const q = this.filters.search.toLowerCase();
        const matchName = (p.Product_Name || '').toLowerCase().includes(q);
        const matchBrand = (p.Brand || '').toLowerCase().includes(q);
        const matchModel = (p.Model || '').toLowerCase().includes(q);
        const matchId = (p.Product_ID || '').toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchModel && !matchId) return false;
      }

      // Brand filter
      if (this.filters.brand.length > 0) {
        if (!this.filters.brand.includes(p.Brand)) return false;
      }

      // Price Range filter
      if (this.filters.priceRange.length > 0) {
        const price = Number(p.Price_Current) || 0;
        const matchRange = this.filters.priceRange.some(range => {
          if (range === 'under_2m') return price > 0 && price < 2000000;
          if (range === '2m_5m') return price >= 2000000 && price <= 5000000;
          if (range === 'above_5m') return price > 5000000;
          return false;
        });
        if (!matchRange) return false;
      }

      // System filter
      if (this.filters.system.length > 0) {
        const matchSys = this.filters.system.some(s => {
          if (s === 'SMARTPHONE') return p.iPhone_USB_C === 'Yes' || p.Android_USB_C === 'Yes' || p.System === 'SMARTPHONE' || p.System === 'ALL';
          if (s === 'PC') return p.PC === 'Yes' || p.OBS === 'Yes' || p.System === 'WEBCAM_PC' || p.System === 'ALL';
          if (s === 'POCKET') return p.Pocket_3 === 'Yes' || p.System === 'POCKET' || p.System === 'ALL';
          return false;
        });
        if (!matchSys) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.filters.sort === 'price_asc') {
        const pa = Number(a.Price_Current) || 999999999;
        const pb = Number(b.Price_Current) || 999999999;
        return pa - pb;
      }
      if (this.filters.sort === 'price_desc') {
        const pa = Number(a.Price_Current) || 0;
        const pb = Number(b.Price_Current) || 0;
        return pb - pa;
      }
      if (this.filters.sort === 'name_asc') {
        return (a.Product_Name || '').localeCompare(b.Product_Name || '');
      }
      return 0;
    });
  }

  renderProductCards() {
    const list = this.getFilteredProducts();
    if (list.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-12); background: var(--color-bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--color-border);">
          <div style="font-size: 2rem; margin-bottom: var(--space-2);">🔍</div>
          <h4 style="color: var(--color-primary-dark);">Không tìm thấy thiết bị phù hợp</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-subtle);">Vui lòng thử bỏ bớt bộ lọc hoặc tìm kiếm từ khóa khác.</p>
        </div>
      `;
    }

    return list.map(p => {
      const comm = marketplaceService.getProductCommercialData(p.Product_ID);
      const priceStr = comm.preferred_price ? `${Number(comm.preferred_price).toLocaleString()}đ` : 'Giá đang cập nhật';

      let ctaHtml = '';
      if (comm.tiktok && comm.tiktok.URL_Status === 'VERIFIED_ACTIVE') {
        ctaHtml += `<a href="${comm.tiktok.Product_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:#000;color:#fff;margin-right:4px;">🛒 TikTok</a>`;
      }
      if (comm.shopee && comm.shopee.URL_Status === 'VERIFIED_ACTIVE') {
        ctaHtml += `<a href="${comm.shopee.Product_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:#EE4D2D;color:#fff;margin-right:4px;">🛒 Shopee</a>`;
      }
      if (!ctaHtml && comm.official) {
        ctaHtml = `<a href="${comm.official.Product_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">🌐 Xem hãng</a>`;
      }

      const imgHtml = `<img src="${comm.image}" alt="${p.Product_Name}" class="product-img" style="margin-bottom: var(--space-3); width:100%; height:160px; object-fit:contain;" />`;

      return `
        <div class="library-product-card">
          ${imgHtml}

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-1);">
            <span class="lib-card-brand">${p.Brand}</span>
            ${p.Best_Value_Status === 'Yes' ? '<span class="badge badge-winner">BEST VALUE</span>' : ''}
            ${p.Best_Compact_Status === 'Yes' ? '<span class="badge badge-winner">BEST COMPACT</span>' : ''}
          </div>

          <div class="lib-card-name">${p.Product_Name}</div>
          <div class="lib-card-price">${priceStr}</div>

          <div class="lib-card-best-for">
            <strong>Phù hợp:</strong> ${p.Best_For || p.Description_Short || 'Livestream / Video theo phân loại thiết bị.'}
          </div>

          <div class="lib-card-actions">
            <button type="button" class="btn btn-secondary btn-sm lib-detail-btn" data-pid="${p.Product_ID}">
              🔍 Chi tiết
            </button>
            ${ctaHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    const libEl = document.getElementById('equipmentLibrary');
    if (!libEl) return;

    // Category tabs
    libEl.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.filters.category = tab.getAttribute('data-cat');
        this.render();
      });
    });

    // Reset filters
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = {
          category: 'ALL',
          search: '',
          brand: [],
          priceRange: [],
          system: [],
          sort: 'default'
        };
        this.render();
      });
    }

    // Search input
    const searchInput = document.getElementById('libSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value;
        const grid = document.getElementById('libraryGridContainer');
        if (grid) {
          grid.innerHTML = this.renderProductCards();
          this.bindCardEvents();
        }
      });
    }

    // Sort select
    const sortSelect = document.getElementById('libSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filters.sort = e.target.value;
        const grid = document.getElementById('libraryGridContainer');
        if (grid) {
          grid.innerHTML = this.renderProductCards();
          this.bindCardEvents();
        }
      });
    }

    // Checkbox filters (Brand, Price, System)
    libEl.querySelectorAll('input[type="checkbox"][data-filter-type]').forEach(cb => {
      cb.addEventListener('change', () => {
        const type = cb.getAttribute('data-filter-type');
        const val = cb.value;
        if (type === 'brand') {
          if (cb.checked) this.filters.brand.push(val);
          else this.filters.brand = this.filters.brand.filter(x => x !== val);
        } else if (type === 'price') {
          if (cb.checked) this.filters.priceRange.push(val);
          else this.filters.priceRange = this.filters.priceRange.filter(x => x !== val);
        } else if (type === 'system') {
          if (cb.checked) this.filters.system.push(val);
          else this.filters.system = this.filters.system.filter(x => x !== val);
        }
        const grid = document.getElementById('libraryGridContainer');
        if (grid) {
          grid.innerHTML = this.renderProductCards();
          this.bindCardEvents();
        }
      });
    });

    this.bindCardEvents();
  }

  bindCardEvents() {
    const libEl = document.getElementById('equipmentLibrary');
    if (!libEl) return;

    libEl.querySelectorAll('.lib-detail-btn[data-pid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-pid');
        this.modalController.showProduct(pid);
      });
    });
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
