// In-memory data store for submitted RFQ manifests and export inquiries
export const rfqStore = [];
export const inquiryLogs = [];

export const saveRFQ = (rfq) => {
  rfqStore.unshift(rfq);
  return rfq;
};

export const getRFQByRef = (ref) => {
  return rfqStore.find(r => r.referenceId === ref);
};

export const getAllRFQs = () => {
  return rfqStore;
};
