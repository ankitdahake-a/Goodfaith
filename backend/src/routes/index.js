import { Router } from 'express';
import catalogRoutes from './catalogRoutes.js';
import rfqRoutes from './rfqRoutes.js';
import complianceRoutes from './complianceRoutes.js';
import logisticsRoutes from './logisticsRoutes.js';

const apiRouter = Router();

apiRouter.use('/catalog', catalogRoutes);
apiRouter.use('/rfq', rfqRoutes);
apiRouter.use('/compliance', complianceRoutes);
apiRouter.use('/logistics', logisticsRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'GoodFaith Pharma IMPEX Core API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default apiRouter;
