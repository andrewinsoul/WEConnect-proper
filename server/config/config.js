const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  localTest: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    database: process.env.LOCAL_TEST_DB,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    use_env_variable: process.env.TEST_DB,
  },
  production: {
    use_env_variable: 'DB_URL_PROD',
  },
};
