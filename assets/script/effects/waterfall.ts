const { ccclass, property } = cc._decorator;

@ccclass
export default class EffectsWaterfall extends cc.Component {


    onLoad() {
        const seq = cc.sequence(cc.moveBy(30, 0, -this.node.height/3*2), cc.callFunc(() => {
            this.node.y = 0;
        }))
        this.node.runAction(cc.repeatForever(seq));
    }

}
