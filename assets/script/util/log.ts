import config from '../config/config';

class Logger {

    constructor(level: number){
        this.level = level;
    }

    level: number = 1 // 日志级别 debug = 1, warn = 2, info = 3

    debug(msg: any) {
        if (this.level <= 1) {
            console.log(`debug: ${msg}`);
        }
    }

    warn(msg: any) {
        if (this.level <= 2) {
            console.log(`warn: ${msg}`);
        }
    }

    info(msg: any) {
        if (this.level <= 3) {
            console.log(`info: ${msg}`);
        }
    }
}

export default new Logger(config.logLevel);