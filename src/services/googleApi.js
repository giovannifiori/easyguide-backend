const axios = require('axios');

const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/',
  timeout: 10000
});

module.exports = api;
