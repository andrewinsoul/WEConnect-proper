import { config } from 'dotenv';

config();

export const dbConfig = {
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
    use_env_variable: 'DB_URL_TEST',
  },
  production: {
    use_env_variable: 'DB_URL_PROD',
  },
};
