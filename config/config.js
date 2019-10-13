module.exports = {
  development: {
    username: 'easyguide',
    password: 'eg1234',
    database: 'easyguide_db',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'easyguide',
    password: 'eg1234',
    database: 'easyguide_db',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres'
  }
};
