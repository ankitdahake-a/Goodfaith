import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  company: {
    name: 'GoodFaith Pharma IMPEX',
    brand: 'Good Faith Exim',
    headquarters: '102, Vidarbha Plaza, New Colony, Nagpur, Maharashtra 440001, India',
    licenseNo: 'Form 20B/21B (Food & Drug Administration, Maharashtra)',
    dgftCode: 'DGFT-IEC Verified Exporter',
    primaryPhone: '+91-9511742165',
    secondaryPhone: '+91-7038198809',
    whatsapp: '+917030393000',
    primaryEmail: 'info@goodfaithexim.com',
    supportEmail: 'Support@goodfaithexim.com'
  }
};
