import { Req, Res } from '../types/app';

export default function (req: Req, res: Res, next): any {
  const start: number = Date.now();

  req.app.log.info({}, `Incoming request: ${req.method} ${req.url}`);

  res.on('finish', () => {
    res.app.log.info({
      status: res.statusCode,
      duration: `${Date.now() - start} ms`
    }, 'Outgoing response');
  });

  return next();
}
