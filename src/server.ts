import express from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import { connect } from './utils/db';

import { RESOURCES } from './resources';
import routing from './middleware/routing/routing';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(routing(RESOURCES.ROUTERS));

export const start = async (): Promise<void> => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
