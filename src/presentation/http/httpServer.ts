import express from 'express';

function startHttpServer() {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.listen(3000, () => console.log('Server running at port 3000'));
}

export { startHttpServer }