import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', router);
export default app;
