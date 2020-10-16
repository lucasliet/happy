import express from 'express';

const app = express();

app.get('/', (request,response) => (
  response.json({ message: '🚀 Server is Running' })
));

app.listen(3333);