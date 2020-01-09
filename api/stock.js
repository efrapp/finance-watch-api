const https = require('https');

function Stock() {
  const baseUri = 'https://cloud.iexapis.com/stable/stock/';

  const getPrice = (stockName) => {
    const query = `${baseUri}/${stockName}/quote?token=${process.env.IEX_API_TOKEN}`;
    let quote = {};

    return new Promise((resolve, reject) => {
      https.get(query, (res) => {
        console.log('status code:', res.statusCode);
        console.log('headers', res.headers);
        res.on('data', (hunk) => {
          quote = JSON.parse(hunk);
        });

        res.on('end', () => {
          resolve(quote);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  };

  return Object.assign(this, {
    async getInfo() {
      const stockInfo = await getPrice(this.name);
      return stockInfo.latestPrice;
    },
  });
}

module.exports = (stock) => Stock.call(stock);
