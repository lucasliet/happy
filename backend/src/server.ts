import express from 'express';

import './database/connection';

const app = express();
app.use(express.json());

app.get('/', (request,response) => (
  response.json({ message: '🚀 Server is Running' })
));

app.listen(3333);