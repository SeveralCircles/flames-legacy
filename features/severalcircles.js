const https = require('https');
function getData(path) {
https.get('https://severalcircles.com/flames' + path, (resp) => {
  let data = '';
  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    return JSON.parse(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}
module.exports = {
    getData: getData
}