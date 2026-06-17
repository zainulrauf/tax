import { Logger } from '@nestjs/common';
export declare class AppLogger extends Logger {
    logApi(endpoint: string, payload?: any): void;
}
