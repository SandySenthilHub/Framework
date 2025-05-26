const express = require('express');
const path = require('path');
const { createServer } = require('vite');

async function startPreviewServer() {
  const app = express();
  
  // Create Vite server in middleware mode
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: path.join(__dirname, 'client')
  });
  
  // Use vite's connect instance as middleware
  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
  
  const port = 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Metronic Theme Preview Server running at http://localhost:${port}`);
    console.log(`📱 Banking Call Center with beautiful Metronic design is ready!`);
  });
}

startPreviewServer().catch(console.error);