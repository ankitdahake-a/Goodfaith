import express from 'express';
import cors from 'cors';
import { appConfig } from './config/appConfig.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// Middlewares
app.use(cors({ origin: appConfig.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Routes
app.use('/api', apiRouter);

// Root Route
app.get('/', (req, res) => {
  res.json({
    service: 'GoodFaith Pharma IMPEX API Gateway',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      catalog: '/api/catalog',
      categories: '/api/catalog/categories',
      rfqSubmit: 'POST /api/rfq/submit',
      compliance: '/api/compliance/status',
      sampleCOA: '/api/compliance/coa/sample',
      logistics: '/api/logistics/protocols'
    }
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
