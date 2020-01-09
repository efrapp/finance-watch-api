const http = require('http');
const Stock = require('./api/stock');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/api/stock/appl') {
    const stock = Stock({ name: 'aapl' });
    stock.getInfo().then((stockPrice) => {
      res.end(stockPrice.toString());
    });
  }
}).listen(3001, 'localhost');
