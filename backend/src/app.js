import './bootstrap';

import * as Sentry from '@sentry/node';
import Youch from 'youch';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';

// Uncomment this line to enable database access
// --------
import './database';

Sentry.init({ dsn: process.env.SENTRY_DSN });

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(helmet());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
