const os = require('os');
const dotenv = require('dotenv');

//setup environment variables
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

const interfaces = os.networkInterfaces();
const environment = {
  host: '127.0.0.1',
  port: process.env.PORT || 3001
};

Object.values(interfaces).forEach(interface => {
  for (const interfaceProperty of interface) {
    if (interfaceProperty.family === 'IPv4' && !interfaceProperty.internal) {
      environment.host = interfaceProperty.address;
      break;
    }
  }
});

environment.address = `http://${environment.host}:${environment.port}`;

module.exports = environment;
