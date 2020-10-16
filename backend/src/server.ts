import express from 'express';

import './database/connection';

import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

const port = 3333;

app.get('/', (request, response) => (
  response.json({ message: '🚀 Server is Running' })
));

app.listen(port);

console.info(`🚀 Server is Running on port ${port}`);