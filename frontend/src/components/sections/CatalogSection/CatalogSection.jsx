import React, { useState, useMemo } from 'react';
import { Search, Thermometer, CheckCircle2, ShoppingBag, Eye, X, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { PHARMA_CATALOG } from '../../../data/pharmaData';
import './CatalogSection.css';

/**
 * CatalogSection Component — Enterprise Pharmaceutical Sourcing Matrix & RFQ Drawer
 * Live Search, Category Filters, Cold-Chain Toggle, Data Table/Grid, COA Inspector Modal
 * Typography: Manrope 700 (Headings, IDs) & Inter 400/500/600 (Data, Buttons)
 */
export default function CatalogSection({ initialSearchQuery = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [prevSearchProp, setPrevSearchProp] = useState(initialSearchQuery);

  if (initialSearchQuery !== prevSearchProp) {
    setPrevSearchProp(initialSearchQuery);
    setSearchTerm(initialSearchQuery);
  }
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyColdChain, setOnlyColdChain] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [inspectItem, setInspectItem] = useState(null);
  const [rfqCart, setRfqCart] = useState([]);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    contactName: '',
    email: '',
    country: '',
    urgency: 'Standard (3-5 days)',
    notes: '',
  });

  const categories = [
    'All',
    'Oncology & Life-Saving',
    'Contrast Media & Imaging',
    'Critical Care & Biologics',
    'Gastroenterology',
    'Hepatology & Nephrology',
  ];

  const filteredMedicines = useMemo(() => {
    return PHARMA_CATALOG.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.molecule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.casNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.therapeuticClass.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchColdChain = !onlyColdChain || item.isColdChain;

      return matchSearch && matchCategory && matchColdChain;
    });
  }, [searchTerm, selectedCategory, onlyColdChain]);

  const handleAddToCart = (item) => {
    setRfqCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setRfqCart((prev) => prev.filter((p) => p.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setRfqCart((prev) =>
      prev
        .map((p) => {
          if (p.id === id) {
            const newQty = p.qty + delta;
            return newQty > 0 ? { ...p, qty: newQty } : null;
          }
          return p;
        })
        .filter(Boolean)
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => {
      setRfqModalOpen(false);
      setRfqSubmitted(false);
      setRfqCart([]);
    }, 2800);
  };

  return (
    <section className="catalog-section" id="catalog">
      <div className="container catalog-container">
        {/* ==========================================================================
            Section Header
            ========================================================================== */}
        <div className="catalog-header">
          <div className="catalog-header-left">
            <div className="catalog-eyebrow">
              <span className="catalog-eyebrow-dot"></span>
              <span className="catalog-eyebrow-text">Verified WHO-GMP / US-FDA Batches</span>
            </div>

            <h2 className="catalog-title">
              Pharmaceutical Sourcing <br />
              <span className="catalog-title-accent">& Named-Patient Terminal</span>
            </h2>
          </div>

          <div className="catalog-header-right">
            <p className="catalog-subtitle">
              Instant access to primary manufacturer batches, validated Certificates of Analysis (COA),
              and cold-chain temperature assurances across 45+ destination countries.
            </p>
          </div>
        </div>

        {/* ==========================================================================
            Interactive Search & Filter Bar
            ========================================================================== */}
        <div className="catalog-controls">
          {/* Search Box */}
          <div className="catalog-search-wrapper">
            <Search size={18} className="catalog-search-icon" />
            <input
              type="text"
              className="catalog-search-input"
              placeholder="Search by brand name, generic molecule, CAS number, or indication..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="catalog-search-clear" onClick={() => setSearchTerm('')}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="catalog-filter-row">
            {/* Category Pills */}
            <div className="catalog-category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cold Chain Toggle & View Switcher */}
            <div className="catalog-toggles">
              <button
                className={`cold-chain-toggle-btn ${onlyColdChain ? 'active' : ''}`}
                onClick={() => setOnlyColdChain((prev) => !prev)}
                title="Filter 2–8°C Cold Chain products"
              >
                <Thermometer size={15} />
                <span>2–8°C Cold Chain</span>
              </button>

              <div className="view-mode-switcher">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  Grid
                </button>
                <button
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Table View"
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================================
            Medicine Grid / Table Output
            ========================================================================== */}
        {filteredMedicines.length === 0 ? (
          <div className="catalog-empty-state">
            <AlertCircle size={32} className="empty-icon" />
            <h3>No formulations found matching "{searchTerm}"</h3>
            <p>Our regulatory medical affairs desk sources unlisted molecules on request.</p>
            <button className="empty-reset-btn" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setOnlyColdChain(false); }}>
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="medicine-grid">
            {filteredMedicines.map((item) => {
              const inCart = rfqCart.some((p) => p.id === item.id);
              return (
                <div className="medicine-card" key={item.id}>
                  <div className="card-top-header">
                    <span className="card-cas-badge">CAS: {item.casNumber}</span>
                    {item.isColdChain && (
                      <span className="card-cold-badge">
                        <Thermometer size={12} />
                        <span>2–8°C</span>
                      </span>
                    )}
                  </div>

                  <h3 className="card-medicine-name">{item.name}</h3>
                  <p className="card-molecule-name">{item.molecule}</p>

                  <div className="card-specs-list">
                    <div className="spec-row">
                      <span className="spec-label">Therapeutic:</span>
                      <span className="spec-val">{item.therapeuticClass}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Dosage / Pack:</span>
                      <span className="spec-val">{item.dosageForm} • {item.packaging}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Manufacturer:</span>
                      <span className="spec-val">{item.manufacturer}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Minimum Order:</span>
                      <span className="spec-val">{item.moq}</span>
                    </div>
                  </div>

                  <div className="card-actions-row">
                    <button
                      className="card-inspect-btn"
                      onClick={() => setInspectItem(item)}
                      title="View Clinical Dossier & COA"
                    >
                      <Eye size={14} />
                      <span>COA Details</span>
                    </button>

                    <button
                      className={`card-rfq-add-btn ${inCart ? 'in-cart' : ''}`}
                      onClick={() => handleAddToCart(item)}
                    >
                      {inCart ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>Added to RFQ</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>Request Quote</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="medicine-table-container">
            <table className="medicine-table">
              <thead>
                <tr>
                  <th>Product & Active Molecule</th>
                  <th>Therapeutic Class</th>
                  <th>Dosage & Pack</th>
                  <th>Manufacturer</th>
                  <th>Storage</th>
                  <th>MOQ</th>
                  <th className="th-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((item) => {
                  const inCart = rfqCart.some((p) => p.id === item.id);
                  return (
                    <tr key={item.id}>
                      <td className="td-name">
                        <div className="name-bold">{item.name}</div>
                        <div className="mol-sub">{item.molecule} • CAS: {item.casNumber}</div>
                      </td>
                      <td>{item.therapeuticClass}</td>
                      <td>{item.dosageForm} ({item.packaging})</td>
                      <td className="td-mfg">{item.manufacturer}</td>
                      <td>
                        {item.isColdChain ? (
                          <span className="table-cold-pill">2–8°C Cold Chain</span>
                        ) : (
                          <span className="table-ambient-pill">15–25°C Ambient</span>
                        )}
                      </td>
                      <td>{item.moq}</td>
                      <td className="td-action-cell">
                        <div className="table-btn-group">
                          <button className="table-eye-btn" onClick={() => setInspectItem(item)} title="Inspect COA">
                            <Eye size={14} />
                          </button>
                          <button
                            className={`table-rfq-btn ${inCart ? 'in-cart' : ''}`}
                            onClick={() => handleAddToCart(item)}
                          >
                            {inCart ? 'Added' : '+ RFQ'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ==========================================================================
            Sticky Bottom RFQ Manifest Bar (appears when items added)
            ========================================================================== */}
        {rfqCart.length > 0 && (
          <div className="sticky-rfq-manifest">
            <div className="manifest-inner">
              <div className="manifest-info">
                <div className="manifest-badge-count">{rfqCart.length}</div>
                <div className="manifest-text-wrap">
                  <span className="manifest-title">Active Sourcing Manifest</span>
                  <span className="manifest-sub">
                    {rfqCart.map((i) => `${i.name} (x${i.qty})`).slice(0, 2).join(', ')}
                    {rfqCart.length > 2 && ` +${rfqCart.length - 2} more`}
                  </span>
                </div>
              </div>

              <div className="manifest-actions">
                <button className="manifest-clear-btn" onClick={() => setRfqCart([])}>
                  Clear All
                </button>
                <button className="manifest-submit-btn" onClick={() => setRfqModalOpen(true)}>
                  <span>Review & Submit RFQ</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================================
            COA / Clinical Datasheet Modal
            ========================================================================== */}
        {inspectItem && (
          <div className="modal-backdrop" onClick={() => setInspectItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-eyebrow">Certificate of Analysis & Clinical Dossier</span>
                  <h3 className="modal-title">{inspectItem.name}</h3>
                </div>
                <button className="modal-close-btn" onClick={() => setInspectItem(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <div className="dossier-grid">
                  <div className="dossier-item">
                    <span className="dossier-label">Active Pharmaceutical Ingredient:</span>
                    <span className="dossier-val">{inspectItem.molecule}</span>
                  </div>
                  <div className="dossier-item">
                    <span className="dossier-label">Chemical CAS Registry:</span>
                    <span className="dossier-val">{inspectItem.casNumber}</span>
                  </div>
                  <div className="dossier-item">
                    <span className="dossier-label">Therapeutic Indication:</span>
                    <span className="dossier-val">{inspectItem.therapeuticClass}</span>
                  </div>
                  <div className="dossier-item">
                    <span className="dossier-label">Storage Integrity:</span>
                    <span className="dossier-val">{inspectItem.storage}</span>
                  </div>
                  <div className="dossier-item">
                    <span className="dossier-label">Packaging & Shelf Life:</span>
                    <span className="dossier-val">{inspectItem.packaging} • {inspectItem.shelfLife}</span>
                  </div>
                  <div className="dossier-item">
                    <span className="dossier-label">Manufacturer Facility:</span>
                    <span className="dossier-val">{inspectItem.manufacturer}</span>
                  </div>
                </div>

                <div className="dossier-compliance-box">
                  <ShieldCheck size={20} className="compliance-icon" />
                  <div>
                    <h4>100% Genuine Batch Release Guarantee</h4>
                    <p>Each shipment is dispatched with manufacturer batch release certification, primary COA, and export customs declarations.</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-secondary-btn" onClick={() => setInspectItem(null)}>
                  Close
                </button>
                <button
                  className="modal-primary-btn"
                  onClick={() => {
                    handleAddToCart(inspectItem);
                    setInspectItem(null);
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>Add to Sourcing RFQ</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================================
            RFQ Submission Modal
            ========================================================================== */}
        {rfqModalOpen && (
          <div className="modal-backdrop" onClick={() => setRfqModalOpen(false)}>
            <div className="modal-content rfq-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-eyebrow">Institutional / Named-Patient Order</span>
                  <h3 className="modal-title">Submit Sourcing Request (RFQ)</h3>
                </div>
                <button className="modal-close-btn" onClick={() => setRfqModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {rfqSubmitted ? (
                <div className="rfq-success-state">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h3>RFQ Submitted Successfully!</h3>
                  <p>Our regulatory medical affairs desk has received your manifest. A formal quote with landed pricing and cold-chain timelines will be dispatched to your email within 2 hours.</p>
                </div>
              ) : (
                <form className="rfq-form" onSubmit={handleFormSubmit}>
                  <div className="rfq-items-summary">
                    <span className="summary-label">Manifest Summary ({rfqCart.length} items):</span>
                    <div className="summary-tags">
                      {rfqCart.map((item) => (
                        <div className="summary-pill" key={item.id}>
                          <span>{item.name}</span>
                          <div className="qty-controls">
                            <button type="button" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                            <span>{item.qty}</span>
                            <button type="button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                            <button type="button" className="remove-pill-btn" onClick={() => handleRemoveFromCart(item.id)} title="Remove item">×</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Hospital / Institution / Entity *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. St. Jude Cancer Hospital or Personal"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Contact Name & Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. / Pharmacist / Patient Name"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Official Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@hospital.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Destination Country *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. United Kingdom, UAE, Germany"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="modal-secondary-btn" onClick={() => setRfqModalOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="modal-primary-btn">
                      <span>Dispatch RFQ Dossier</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
