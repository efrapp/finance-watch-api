const https = require('https');

function Stock() {
  const IEX_API_TOKE = 'pk_156f3833e9114f32b608e92cc799a480';
  const baseUri = 'https://cloud.iexapis.com/stable/stock/';

  const getPrice = async (stockName) => {
    const query = `${baseUri}/${stockName}/quote?token=${IEX_API_TOKE}`;
    let quote = {};

    const responsePromise = new Promise((resolve, reject) => {
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
        console.error(`getPrice error: ${err}`);
        reject(err);
      });
    });

    const response = await responsePromise;
    console.log('latest price', response.latestPrice);
    return response.latestPrice;
  };

  return Object.assign(this, {
    getInfo() {
      return getPrice(this.name);
    },
  });
}

module.exports = (stock) => Stock.call(stock);
