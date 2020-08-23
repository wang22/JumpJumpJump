import { resizeItem } from "../util/calc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Resize extends cc.Component {

    @property
    width: number = 1;

    @property
    height: number = 1;

    onLoad () {
        resizeItem(this.width,this.height, this.node);
    }

}
