import { PHARMA_CATALOG } from '../data/pharmaData';

const BASE_URL = '/api';

export const apiClient = {
  // Fetch Catalog Products with optional filters
  async getCatalog(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${BASE_URL}/catalog?${query}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.warn('[ApiClient] Falling back to local catalog:', err.message);
      let results = [...PHARMA_CATALOG];
      if (params.category && params.category !== 'All Therapeutics') {
        results = results.filter(i => i.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        results = results.filter(i => 
          i.name.toLowerCase().includes(q) ||
          i.molecule.toLowerCase().includes(q) ||
          i.casNumber.toLowerCase().includes(q)
        );
      }
      return results;
    }
  },

  // Submit RFQ Manifest
  async submitRFQ(rfqPayload) {
    try {
      const res = await fetch(`${BASE_URL}/rfq/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rfqPayload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[ApiClient] Offline fallback RFQ generation:', err.message);
      const refId = `GF-RFQ-${Date.now().toString().slice(-6)}`;
      return {
        ...rfqPayload,
        referenceId: refId,
        createdAt: new Date().toISOString(),
        status: 'OFFLINE_GENERATED'
      };
    }
  },

  // Fetch Compliance Data
  async getCompliance() {
    try {
      const res = await fetch(`${BASE_URL}/compliance/status`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[ApiClient] Local compliance fallback:', err.message);
      return null;
    }
  },

  // Fetch Logistics Protocols
  async getLogistics() {
    try {
      const res = await fetch(`${BASE_URL}/logistics/protocols`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('[ApiClient] Local logistics fallback:', err.message);
      return null;
    }
  }
};
