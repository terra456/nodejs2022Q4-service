import { LoggerService } from '@nestjs/common';
import { access, constants, writeFile, appendFile } from 'node:fs/promises';

export class CustomLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.writeInFile('log: ' + message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.writeInFile('error: ' + message);
    this.writeErrors(message.toString());
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.writeInFile('warn: ' + message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this.writeInFile('debug: ' + message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this.writeInFile('verbose: ' + message);
  }

  private async writeInFile(message: string) {
    access('./logs.txt', constants.R_OK | constants.W_OK)
      .then(() => {
        appendFile('./logs.txt', message + '\n').then(() =>
          process.stdout.write(message + '\n'),
        );
      })
      .catch((e) => {
        writeFile('./logs.txt', message + '\n').then(() =>
          console.log('file created'),
        );
      });
  }

  private async writeErrors(message: string) {
    access('./logs-error.txt', constants.R_OK | constants.W_OK)
      .then(() => {
        appendFile('./logs-error.txt', message + '\n').then(() =>
          process.stdout.write(message + '\n'),
        );
      })
      .catch((e) => {
        writeFile('./logs-error.txt', message + '\n').then(() =>
          console.log('file created'),
        );
      });
  }
}
