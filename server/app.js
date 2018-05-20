import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import ExpressValidator from 'express-validator';
import { businessRouter } from './routes/business-routes';
import { reviewRouter } from './routes/review-routes';
import { userRouter } from './routes/user-routes';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(ExpressValidator());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', userRouter);
app.use('/api/v1', businessRouter);
app.use('/api/v1', reviewRouter);

export default app;
