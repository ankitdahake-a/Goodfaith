import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FaqAccordion.css';

/**
 * FaqAccordion Component — Ultra-Minimal HeroUI Style with 21st.dev Background
 * Pure, clean, zero unnecessary fluff:
 * - 21st.dev Signature Vignette Grid + Ambient Glow Background
 * - Tightly fitted closed state (shows question text only with zero extra space)
 * - Fluid, dynamic height expansion matching the exact answer content when opened
 * - Translucent tactile frosted cards with sharp contrast
 */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does Named-Patient medicine access work?',
      a: 'Licensed physicians and hospitals can legally import unapproved or rare therapies directly for individual patients through authorized Named-Patient and compassionate access regulations.',
    },
    {
      q: 'How is temperature controlled during global transit?',
      a: 'All cold-chain shipments are sealed in validated thermal shippers equipped with real-time IoT temperature data loggers guaranteeing strict 2°C–8°C or -20°C integrity.',
    },
    {
      q: 'How fast is international delivery?',
      a: 'Standard priority air transit takes 24–48 hours to the Middle East, 48–72 hours to Europe and Asia, and 72–96 hours to Latin America and Africa.',
    },
    {
      q: 'How do you guarantee authentic manufacturer batches?',
      a: 'We procure directly from licensed innovator manufacturers. Every package includes full 2D batch serialization and an official Certificate of Analysis (COA).',
    },
    {
      q: 'Can individual patients order directly with a prescription?',
      a: 'Yes. Patients can share a valid prescription from their treating doctor, and our clinical team handles all regulatory permits and coordinates delivery to their clinic or home.',
    },
    {
      q: 'Do you support large-scale hospital and tender procurement?',
      a: 'Yes. We provide institutional volume pricing, formal RFQ quotes within 4 hours, and chartered cold-chain cargo logistics for hospitals and health ministries.',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      {/* 21st.dev Signature Background Layers */}
      <div className="faq-bg-layers" aria-hidden="true">
        <div className="faq-spotlight"></div>
        <div className="faq-grid-pattern"></div>
      </div>

      <div className="container faq-container">
        {/* Minimal Header */}
        <div className="faq-header">
          <h2 className="faq-title">Frequently asked questions</h2>
        </div>

        {/* Minimal HeroUI-style Accordion */}
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`faq-card ${isOpen ? 'faq-card-open' : ''}`}
              >
                <button
                  className="faq-trigger"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron ${isOpen ? 'faq-chevron-rotated' : ''}`}
                  />
                </button>

                <div
                  className={`faq-collapse ${isOpen ? 'faq-collapse-open' : ''}`}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <div className="faq-answer-content">
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
