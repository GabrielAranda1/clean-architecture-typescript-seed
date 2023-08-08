import { env } from '@/main/env';
import express from 'express';

function startHttpServer() {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.listen(env.port, () => console.log(`Server running at port ${env.port}`));
}

export { startHttpServer }