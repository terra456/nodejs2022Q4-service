import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, url, query, body } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${url} \n ${
        query ? 'Query: ' + JSON.stringify(query) + '\n' : ''
      } ${
        body ? 'Body: ' + JSON.stringify(body) + '\n' : ''
      } Response: ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LoggerMiddleware;
