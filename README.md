# Finance Watch API
Get information from different market stocks

## Usage
* Clone the repository in your file system using `git clone git@github.com:efrapp/finance-watch-api.git`
* To run the aplication you need to load the IEX Cloud api token. They are two ways to do this: save the token in the file
system as an environment variable or run the app including de token as a temporal variable in the command, for example:
  ```
    IEX_API_TOKEN=<toke id here> node server.js
  ```
  You can get the information of the token [here](https://storage.cloud.google.com/finance-watch-api-bucket/.env)
* To call the api you can use the following command:
  ```
  curl http://localhost:3001/api/stock/<ticker_name>
  ```
  Where `ticker_name` is the stock name you want to check, example: `curl http://localhost:3001/api/stock/goog`

## How the app was built

I created a factory for each responsibility in the app, so there is a factory in charge of handle the request to the IEX
service and there is another one to handle the log. The app was designed following the Functional Inheritance allowing us to
encapsulate private data using closures and, if need, we can extend the functionally of the created object using composition.
I didn't want to use a class-based approach because it restricts the application taxonomy to an `is-a` relationship so the
composition will play a better role in extension purposes.

There are a lot of things to improve, for example, the logic to check the url and get the ticker is basic, you won't find some
tickers if they don't follow the regular expression, an example of that is the ticker `BRK.A`.
