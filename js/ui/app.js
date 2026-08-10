import { productsData } from '../data/productsData.js';
import { RecommendationEngine } from '../engine/recommendationEngine.js';
import { ModalController } from './modalController.js';
import { WizardController } from './wizardController.js';
import { ResultRenderer } from './resultRenderer.js';
import { LibraryController } from './libraryController.js';
import { ComparisonController } from './comparisonController.js';

class App {
  constructor() {
    this.engine = new RecommendationEngine();
    this.modalController = new ModalController(this.engine);
    this.currentResult = null;

    this.initViews();
    this.setupRouting();
    this.setupHomeEvents();
  }

  initViews() {
    // Result Renderer
    this.resultRenderer = new ResultRenderer(
      this.engine, 
      this.modalController,
      () => {
        this.wizardController.setStep(1);
        this.navigateTo('configurator');
      }
    );

    // Wizard Controller
    this.wizardController = new WizardController(this.engine, (state) => {
      this.currentResult = this.engine.evaluate(state);
      this.resultRenderer.render(this.currentResult);
      this.navigateTo('result');
    });

    // Library Controller
    this.libraryController = new LibraryController(productsData, this.modalController);

    // Comparison Controller
    this.comparisonController = new ComparisonController(productsData, this.modalController);
  }

  setupRouting() {
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Header navigation links
    document.querySelectorAll('.nav-link[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        this.navigateTo(route);
      });
    });

    // Initial route
    this.handleRoute();
  }

  navigateTo(route) {
    window.location.hash = `#${route}`;
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    
    const views = {
      home: document.getElementById('homeView'),
      configurator: document.getElementById('configuratorWizard'),
      result: document.getElementById('recommendationResult'),
      library: document.getElementById('equipmentLibrary'),
      compare: document.getElementById('productComparison')
    };

    // Hide all views
    Object.values(views).forEach(v => {
      if (v) v.classList.add('hidden');
    });

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-route') === hash) {
        link.classList.add('active');
      }
    });

    // Show target view
    if (hash === 'result') {
      if (!this.currentResult) {
        // Run initial evaluation with default wizard state if not submitted yet
        this.currentResult = this.engine.evaluate(this.wizardController.state);
        this.resultRenderer.render(this.currentResult);
      }
      if (views.result) views.result.classList.remove('hidden');
      this.updateMobileBar(this.currentResult);
    } else if (views[hash]) {
      views[hash].classList.remove('hidden');
      this.hideMobileBar();
    } else {
      if (views.home) views.home.classList.remove('hidden');
      this.hideMobileBar();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupHomeEvents() {
    const heroFindBtn = document.getElementById('heroFindBtn');
    if (heroFindBtn) {
      heroFindBtn.addEventListener('click', () => this.navigateTo('configurator'));
    }

    const heroLibBtn = document.getElementById('heroLibBtn');
    if (heroLibBtn) {
      heroLibBtn.addEventListener('click', () => this.navigateTo('library'));
    }
  }

  updateMobileBar(result) {
    const mobileBar = document.getElementById('mobileStickyBar');
    if (!mobileBar || !result) return;

    const priceEl = document.getElementById('mobileBarPrice');
    if (priceEl) {
      priceEl.textContent = `${result.requiredTotal.toLocaleString()}đ`;
    }

    mobileBar.classList.add('show');
  }

  hideMobileBar() {
    const mobileBar = document.getElementById('mobileStickyBar');
    if (mobileBar) mobileBar.classList.remove('show');
  }
}

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.hcApp = new App();
});
