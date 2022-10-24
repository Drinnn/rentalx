import express from 'express';
import swaggerUI from 'swagger-ui-express';
import * as dotenv from 'dotenv';

import swaggerFile from './swagger.json';

import './database';
import './shared/container';

import router from './routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log('Server is running!'));
