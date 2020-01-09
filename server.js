const http = require('http');
const Stock = require('./api/stock');

http.createServer((req, res) => {
  if (req.url === '/api/stock/aapl') {
    const stock = Stock({ name: 'aapl' });

    stock.getInfo().then((stockInfo) => {
      res.writeHead(stockInfo.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stockInfo));
    }).catch((err) => {
      res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  }
}).listen(3001, 'localhost');
