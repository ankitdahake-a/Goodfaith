import { Router } from 'express';
import { getLogisticsProtocols } from '../controllers/logisticsController.js';

const router = Router();

router.get('/protocols', getLogisticsProtocols);

export default router;
