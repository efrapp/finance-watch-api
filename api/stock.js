const https = require('https');

function Stock() {
  const baseUri = 'https://cloud.iexapis.com/stable/stock/';

  const getPrice = (stockName) => {
    const query = `${baseUri}/${stockName}/quote?token=${process.env.IEX_API_TOKEN}`;

    return new Promise((resolve, reject) => {
      let quote = {};

      https.get(query, (res) => {
        console.log('status code:', res.statusCode);
        console.log('headers', res.headers);
        if (res.statusCode === 200) {
          res.on('data', (hunk) => {
            quote = JSON.parse(hunk);
          });

          res.on('end', () => {
            resolve(quote);
          });
        } else {
          reject(res.statusMessage);
        }
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
