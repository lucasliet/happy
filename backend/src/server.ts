import express from 'express';
import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = 3333;

app.get('/', (request, response) => (
  response.json({ message: '🚀 Server is Running' })
));

app.listen(port);

console.info(`🚀 Server is Running on port ${port}`);