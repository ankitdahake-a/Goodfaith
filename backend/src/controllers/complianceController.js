import { appConfig } from '../config/appConfig.js';
import { CATALOG_DATABASE } from '../data/catalogData.js';

export const getComplianceStatus = (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        entityName: appConfig.company.name,
        headquarters: appConfig.company.headquarters,
        licenseType: 'Wholesale Drug License Form 20B & 21B',
        licensingAuthority: 'Food and Drug Administration (FDA), Maharashtra State, India',
        cdscoRegistration: 'Active Export Registered Entity',
        dgftStatus: 'Authorized International Merchant Exporter',
        qualityStandards: ['WHO-GMP Compliance', 'GDP Cold-Chain 2-8°C Protocol', 'Batch-wise COA Traceability'],
        accreditedSourcingPartners: ['Cipla Ltd', 'Sun Pharma', "Dr. Reddy's", 'Zydus Lifesciences', 'Torrent', 'Glenmark', 'Abbott India', 'Menarini']
      }
    });
  } catch (err) {
    next(err);
  }
};

export const generateSampleCOA = (req, res, next) => {
  try {
    const { batchNo } = req.query;
    const item = CATALOG_DATABASE.find(p => p.batchNumber === batchNo) || CATALOG_DATABASE[0];

    const coaData = {
      specimenHeader: 'GOODFAITH PHARMA IMPEX — CERTIFICATE OF ANALYSIS',
      productName: item.name,
      molecule: item.molecule,
      casNumber: item.casNumber,
      batchNumber: item.batchNumber,
      mfgDate: 'August 2026',
      expDate: 'July 2028',
      manufacturer: item.manufacturer,
      storageStandard: item.storage,
      pharmacopeia: 'USP / BP / IP Standard',
      testParameters: [
        { parameter: 'Appearance', standard: 'Conforms to reference standard', result: 'Complies' },
        { parameter: 'Identification (HPLC)', standard: 'Retention time matches RS', result: 'Complies (100.2%)' },
        { parameter: 'Assay Purity', standard: '98.0% - 102.0%', result: '99.85%' },
        { parameter: 'Related Substances', standard: 'Total Impurities < 0.5%', result: '0.12%' },
        { parameter: 'Moisture Content (KF)', standard: 'Not more than 3.0%', result: '1.4%' },
        { parameter: 'Microbiological Assay', standard: 'TAMC < 1000 CFU/g | Pathogens Absent', result: 'Complies (Zero Pathogens)' }
      ],
      releaseDecision: 'APPROVED FOR INTERNATIONAL EXPORT & HOSPITAL USE'
    };

    res.json({
      success: true,
      data: coaData
    });
  } catch (err) {
    next(err);
  }
};
