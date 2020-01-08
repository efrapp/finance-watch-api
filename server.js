const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  res.end('Request completed');
}).listen(3001, 'localhost');
