const https = require('https');

function Stock() {
  const baseUri = 'https://cloud.iexapis.com/stable/stock/';
  const OK = 200;
  const INTERNAL_ERROR = 500;

  const request = (query) => {
    const response = new Promise((resolve, reject) => {
      let quote = {};
      let statusCode = {};

      https.get(query, (res) => {
        statusCode = { statusCode: res.statusCode };

        if (res.statusCode === OK) {
          res.on('data', (hunk) => {
            quote = JSON.parse(hunk);
          });

          res.on('end', () => {
            resolve(quote);
          });
        } else {
          reject(Object.assign(statusCode, { message: res.statusMessage }));
        }
      }).on('error', (err) => {
        process.stdout.write(err.toString());
        statusCode.statusCode = INTERNAL_ERROR;
        reject(Object.assign(statusCode, { message: err }));
      });
    });

    return response;
  };

  const getPrice = (stockName) => {
    const query = `${baseUri}/${stockName}/quote?token=${process.env.IEX_API_TOKEN}`;

    return request(query);
  };

  const getLogo = (stockName) => {
    const query = `${baseUri}/${stockName}/logo?token=${process.env.IEX_API_TOKEN}`;

    return request(query);
  };

  const getNews = (stockName) => {
    const query = `${baseUri}/${stockName}/news/last/1?token=${process.env.IEX_API_TOKEN}`;

    return request(query);
  };

  return Object.assign(this, {
    async getInfo() {
      const stockPrice = getPrice(this.name);
      const stockLogo = getLogo(this.name);
      const stockNews = getNews(this.name);

      try {
        const response = await Promise.all([stockPrice, stockLogo, stockNews]);
        const unifiedResponse = {
          latestPrice: response[0].latestPrice,
          logo: response[1].url,
          news: response[2][0],
          statusCode: OK,
        };
        return unifiedResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  });
}

module.exports = (stock) => Stock.call(stock);
