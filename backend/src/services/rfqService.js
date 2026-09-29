import { saveRFQ, getRFQByRef, getAllRFQs } from '../data/inMemoryStore.js';
import { appConfig } from '../config/appConfig.js';

export const processRFQSubmission = async (rfqData) => {
  const { items, buyer, destinationCountry, incoterm, additionalNotes, attachedFile } = rfqData;

  if (!items || !Array.isArray(items) || items.length === 0) {
    const error = new Error('RFQ Manifest must contain at least one pharmaceutical item.');
    error.statusCode = 400;
    throw error;
  }

  const referenceId = `GF-RFQ-${Date.now().toString().slice(-6)}`;
  const createdAt = new Date().toISOString();

  // Check if any cold chain items are included
  const hasColdChain = items.some(item => item.isColdChain);

  // Format WhatsApp message
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formattedManifestText = `*OFFICIAL B2B EXPORT QUOTATION REQUEST*
Reference: ${referenceId}
Date: ${dateStr}

*BUYER INFORMATION:*
Organization: ${buyer?.organization || 'Institutional Client'}
Contact: ${buyer?.name || 'Authorized Officer'}
Email: ${buyer?.email || 'N/A'}
Phone: ${buyer?.phone || 'N/A'}

*LOGISTICS SPECIFICATIONS:*
Destination Port: ${destinationCountry || 'Not Specified'}
Incoterms: ${incoterm || 'CIF Air Freight'}
${hasColdChain ? 'Storage Requirement: 2-8°C Validated Cold-Chain Thermal Box Required\n' : ''}${additionalNotes ? `Notes: ${additionalNotes}\n` : ''}

*REQUESTED PHARMACEUTICAL MANIFEST:*
${items.map((it, idx) => `${idx + 1}. ${it.name} (${it.molecule || 'Standard Formulation'})
   - Mfg: ${it.manufacturer || 'Certified Producer'}
   - Volume: ${it.requestedQty || `Standard MOQ (${it.moq || '1 Unit'})`}
   - Storage: ${it.storage || 'Room Temperature'}`).join('\n\n')}

--------------------------------------------------
Recipient: ${appConfig.company.name}, Nagpur (India)
Wholesale Drug License: ${appConfig.company.licenseNo}`;

  const whatsappUrl = `https://wa.me/${appConfig.company.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(formattedManifestText)}`;

  const savedRecord = saveRFQ({
    referenceId,
    createdAt,
    buyer: buyer || {},
    items,
    destinationCountry: destinationCountry || 'Not Specified',
    incoterm: incoterm || 'CIF Air Freight',
    hasColdChain,
    additionalNotes: additionalNotes || '',
    attachedFile: attachedFile || null,
    formattedManifestText,
    whatsappUrl,
    status: 'RECEIVED_PENDING_PROFORMA'
  });

  return savedRecord;
};

export const fetchRFQDetails = (refId) => {
  const rfq = getRFQByRef(refId);
  if (!rfq) {
    const error = new Error(`RFQ with Reference ID ${refId} not found.`);
    error.statusCode = 404;
    throw error;
  }
  return rfq;
};

export const listAllRFQs = () => {
  return getAllRFQs();
};
