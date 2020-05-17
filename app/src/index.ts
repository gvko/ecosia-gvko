import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import Logger from './util/logger';
import logReqRes from './middlewares/log-req-res';
import trees from './services/trees';
import healthz from './services/healthz';

// Initializing the logger before anything else, so we can log events, if we want to, during service initialization
const logger = new Logger();
const app = express();
app.log = logger;

app
  .use(bodyParser.json())
  .options('*', cors())
  .use(cors())
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(logReqRes)
  /*
   * Routes
   */
  .use('/tree', trees)
  .use('/healthz', healthz);

const hostname = process.env.HOSTNAME || 'localhost';
app.listen(3000, () => {
  app.log.info({ env: process.env.NODE_ENV }, `Service started ⚡ and listening on ${hostname}:3000`);
});
