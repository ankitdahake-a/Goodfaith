import app from './src/app.js';
import { appConfig } from './src/config/appConfig.js';

const server = app.listen(appConfig.port, () => {
  console.log(`[GoodFaith Backend] Server active on port ${appConfig.port} in ${appConfig.env} mode.`);
  console.log(`[GoodFaith Backend] Health check: http://localhost:${appConfig.port}/api/health`);
});

process.on('SIGTERM', () => {
  console.log('[GoodFaith Backend] SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    console.log('[GoodFaith Backend] Process terminated.');
  });
});
