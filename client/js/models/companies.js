// company Collection - company-collection.js
var AmpCollection = require('ampersand-rest-collection');
var company = require('./company');


module.exports = AmpCollection.extend({
  model: company,
  url: '/api/company'
});