import * as bunyan from 'bunyan';
import * as bunyanPretty from 'bunyan-pretty';

enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

const levelNumbers = {
  20: LogLevel.DEBUG,
  30: LogLevel.INFO,
  40: LogLevel.WARN,
  50: LogLevel.ERROR
};

/**
 * Creates and initializes the logger object.
 *
 * @return {*}
 */
export default class Logger {
  private readonly logger: bunyan;

  constructor(opts = { serviceName: 'ecosia-gvko-api' }) {
    this.logger = bunyan.createLogger({
      name: opts.serviceName,
      streams: []
    });

    const consoleStream = {
      formatter: 'pretty',
      level: process.env.LOG_LEVEL || LogLevel.DEBUG,
      stream: bunyanPretty()
    };

    const streams: any[] = [consoleStream];
    const streamDestinations: string = 'console';

    if (process.env.NODE_ENV === 'test') {
      console.log(`===> TEST env... do not log`);
    } else {
      for (const stream of streams) {
        this.logger.addStream(Object.assign(stream));
      }
      console.log(`===> Logging to ${streamDestinations}`);
    }
  }

  getLevel(): LogLevel {
    return levelNumbers[this.logger.level()];
  }

  setLevel(): void {
  }

  setName(): void {
  }

  child(props: any): any {
    return this.logger.child(props);
  }

  debug(data: any, message = 'Debug'): void {
    this.logger.debug(data, message);
  }

  info(data: any, message = 'Info'): void {
    this.logger.info(data, message);
  }

  warn(data: any, message = 'Warning'): void {
    this.logger.warn(data, message);
  }

  error(data: any, message = 'Internal Server Error'): void {
    if (!data.err) {
      this.logger.error(data, message);
    } else {
      const error = {
        message: data.err.message,
        data: data.err.data
      };

      /*
       * Bunyan (the logging library in use) filters objects from redundant data. The error stack trace is being
       * filtered, if passed as an object. That's why we strip it out as an array of strings.
       * We only send the stack trace to the logs, but not in the response to the client.
       */
      const stack = data.err.stack !== undefined ? data.err.stack.toString().split('\n') : undefined;

      this.logger.error({ error, stack }, data.err.message);
    }
  }
}
