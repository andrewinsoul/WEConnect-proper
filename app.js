import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './server/routes/route';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', router);

const PORT = parseInt(process.env.PORT, 10) || 8000;

app.listen(PORT, () => console.log(`server live on port ${PORT}`));
export default app;
