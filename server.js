import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Enable basic JSON parsing & headers
app.use(express.json());

// Basic Health Check endpoint for Render
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: Date.now() });
});

// Path to compiled frontend
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

// Check if production build exists
if (fs.existsSync(distPath)) {
  // Serve static assets with caching
  app.use(express.static(distPath, {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  // SPA fallback: Send index.html for any unmatched routes
  app.get('*', (_req, res) => {
    res.sendFile(indexPath);
  });
} else {
  // Helpful fallback if build hasn't run yet
  app.get('*', (_req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>ToonPlay - Building</title></head>
        <body style="background:#0b0c16;color:#e2e8f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;">
            <h1 style="color:#818cf8;">ToonPlay Streaming App</h1>
            <p>Application server is active. Run <code>npm run build</code> to generate the client build.</p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(Number(PORT), HOST, () => {
  console.log(`[ToonPlay] Production server is running on http://${HOST}:${PORT}`);
});
