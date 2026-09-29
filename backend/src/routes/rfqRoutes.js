import { Router } from 'express';
import { submitRFQ, getRFQByReference, getAllSubmissions } from '../controllers/rfqController.js';

const router = Router();

router.post('/submit', submitRFQ);
router.get('/all', getAllSubmissions);
router.get('/:referenceId', getRFQByReference);

export default router;
