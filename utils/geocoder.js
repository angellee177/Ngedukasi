const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'N0ZPABTkTjJhhdgsYofqA7kr9rTT92yX',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;

