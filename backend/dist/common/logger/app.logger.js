"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
class AppLogger extends common_1.Logger {
    logApi(endpoint, payload) {
        this.log(`${endpoint} ${JSON.stringify(payload)}`);
    }
}
exports.AppLogger = AppLogger;
//# sourceMappingURL=app.logger.js.map