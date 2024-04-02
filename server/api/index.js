// server/index.js
import express from 'express';
import { createServer } from 'http';
// import { loadNuxt, build } from 'nuxt';
import api from './api/index.js';

import cors from "cors"
async function start() {
  const app = express();
  app.use(cors({origin: "*"}));
  // const nuxt = await loadNuxt(process.env.NODE_ENV !== 'production' ? 'dev' : 'start');
  const server = createServer(app);
  // Apply API middleware
  app.use('/api', api);

  // Build in development
  // if (nuxt.options.dev) {
  //   build(nuxt);
  // }

  // app.use(nuxt.render);
  const port = process.env.PORT || 3001;
  server.listen(port, () => console.log(`Server listening on port: ${port}`));
}

start();