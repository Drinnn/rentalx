import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import * as dotenv from 'dotenv';

import swaggerFile from './swagger.json';

import './database';
import './shared/container';

import router from './routes';
import errorsHandler from 'middlewares/errors-handler.middleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errorsHandler);

app.listen(3333, () => console.log('Server is running!'));
