import logger from './util/log';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    row: number = 240;
    col: number = 0;

    onLoad() {
        this.col = cc.winSize.width / this.row;
        logger.debug(`system.col: ${this.col}`);
        const physicsMgr = cc.director.getPhysicsManager();
        physicsMgr.enabled = true;
        logger.debug("开启物理引擎");
    }

}
