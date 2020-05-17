import { Application, Request, Response } from 'express';
import Logger from '../util/logger';

type App = Application & {
  log: Logger;
};

type Req = Request & {
  app: App;
};

type Res = Response & {
  app: App;
}

export {
  App,
  Req,
  Res
};
