import { Router } from 'express';
import { getComplianceStatus, generateSampleCOA } from '../controllers/complianceController.js';

const router = Router();

router.get('/status', getComplianceStatus);
router.get('/coa/sample', generateSampleCOA);

export default router;
