import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import * as dotenv from 'dotenv';

import swaggerFile from '../../../swagger.json';

import '../../../database';
import '../../container';

import errorsHandler from '@shared/infra/http/middlewares/errors-handler.middleware';
import router from '@shared/infra/http/routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use(errorsHandler);

app.listen(3333, () => console.log('Server is running!'));
