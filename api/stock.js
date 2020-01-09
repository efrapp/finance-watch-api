const https = require('https');

function Stock() {
  const baseUri = 'https://cloud.iexapis.com/stable/stock/';
  const OK = 200;

  const getPrice = (stockName) => {
    const query = `${baseUri}/${stockName}/quote?token=${process.env.IEX_API_TOKEN}`;

    return new Promise((resolve, reject) => {
      let quote = {};

      https.get(query, (res) => {
        console.log('status code:', res.statusCode);
        console.log('headers', res.headers);
        if (res.statusCode === OK) {
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

  const getLogo = (stockName) => {
    const query = `${baseUri}/${stockName}/logo?token=${process.env.IEX_API_TOKEN}`;

    return new Promise((resolve, reject) => {
      let quote = {};

      https.get(query, (res) => {
        if (res.statusCode === OK) {
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
      const stockPrice = getPrice(this.name);
      const stockLogo = getLogo(this.name);

      try {
        const response = await Promise.all([stockPrice, stockLogo]);
        return response;
      } catch (error) {
        return new Error(error);
      }
    },
  });
}

module.exports = (stock) => Stock.call(stock);
