const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);

  // API Endpoints
  if (req.url === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      console.log('[API CONTACT RECV]', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', message: 'Contact message received successfully.' }));
    });
    return;
  }

  if (req.url === '/api/donate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      console.log('[API DONATE RECV]', body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', message: 'Donation intent received successfully.' }));
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  if (!path.extname(filePath)) {
    filePath += '.html';
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  SIDRA Foundation Web Server Running!`);
  console.log(`  Local URL: http://localhost:${PORT}/`);
  console.log(`==================================================\n`);
});
