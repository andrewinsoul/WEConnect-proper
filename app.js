import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import router from './server/routes/route';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(logger('dev'));
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', router);

const PORT = parseInt(process.env.PORT, 10) || 8000;

app.listen(PORT, () => console.log('server live on port 8000'));
export default app;
