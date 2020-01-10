const http = require('http');
const Stock = require('./api/stock');
const Log = require('./utils/log');

const log = Log();

http.createServer((req, res) => {
  if (/\/api\/stock\/[\w]+$/.test(req.url)) {
    const ticker = req.url.match(/[\w?]+$/);
    const stock = Stock({ name: ticker });

    log.record(req.url).recordDate();

    stock.getInfo().then((stockInfo) => {
      log.recordStatus(stockInfo.statusCode).end();
      res.writeHead(stockInfo.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stockInfo));
    }).catch((err) => {
      log.recordStatus(err.statusCode).end();
      res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  } else {
    log.record(req.url).recordDate().recordStatus(400).end();
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }
}).listen(3001, 'localhost');
