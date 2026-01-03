/**
 * Utility to refresh portfolio data
 * Can be called from browser console: window.refreshPortfolioData()
 */

import { clearAllCache } from '../services/api';

/**
 * Clear all API cache and reload the page
 */
export function refreshPortfolioData() {
  clearAllCache();
  window.location.reload();
}

// Make it available globally for easy access from console
if (typeof window !== 'undefined') {
  window.refreshPortfolioData = refreshPortfolioData;
}

