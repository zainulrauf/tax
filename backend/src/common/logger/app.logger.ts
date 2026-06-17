import { Logger } from '@nestjs/common';

export class AppLogger
  extends Logger
{
  logApi(
    endpoint: string,
    payload?: any,
  ) {
    this.log(
      `${endpoint} ${JSON.stringify(
        payload,
      )}`,
    );
  }
}