const https = require('https');
function getData(path) {
    const request = require('request');
    request('severalcircles.com/flames' + path, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body);
      return body;
    });
}
module.exports = {
    getData: getData
}