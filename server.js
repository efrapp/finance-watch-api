const http = require('http');
const Stock = require('./api/stock');
const Log = require('./utils/log');

http.createServer((req, res) => {
  if (/\/api\/stock\/[\w]+$/.test(req.url)) {
    const ticker = req.url.match(/[\w?]+$/);
    const stock = Stock({ name: ticker });

    Log();

    stock.getInfo().then((stockInfo) => {
      res.writeHead(stockInfo.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stockInfo));
    }).catch((err) => {
      res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }
}).listen(3001, 'localhost');
