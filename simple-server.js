const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// Handle React routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Metronic Theme Preview running at http://localhost:${port}`);
  console.log(`📱 Your Banking Call Center with beautiful Metronic design is ready!`);
});