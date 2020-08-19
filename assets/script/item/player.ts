import { resize } from "../util/calc";
import logger from "../util/log"

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemPlayer extends cc.Component {

    width: number = 8 * 1.5;
    height: number = 5 * 1.5

    onLoad() {
        resize(this.width, this.height, this.node);
        logger.debug(`重置Player大小，界面大小为：${this.node.width}x${this.node.height}`);
    }

}
