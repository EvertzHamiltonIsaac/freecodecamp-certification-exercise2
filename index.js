// index.js
// where your node app starts

// init project
const dns = require('dns').promises;
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const { hostname } = require('os');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const ipfinder = async (HOST) => {
  try {
    const adresses = await dns.resolve4(HOST);
    return adresses[0];
  } catch (error) {
    throw error;
  }
};

// your first API endpoint...
app.get('/api/whoami', async function (req, res) {
  let language = req.headers['accept-language'];
  let software = req.headers['user-agent'];

  const host = req.headers['host'].includes(':')
    ? req.headers['host'].split(':')[0]
    : req.headers['host'];

  res.json({
    ipaddress: `${await ipfinder(host)}`,
    language: `${language}`,
    software: `${software}`,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
