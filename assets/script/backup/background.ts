// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start() {
        const startPosition = this.node.position;
        const _this = this;
        const seq = cc.repeatForever(cc.sequence(cc.moveBy(25, 0, -this.node.height / 2), cc.callFunc(() => {
            _this.node.y = startPosition.y;
        })));
        this.node.runAction(seq);
    }

}
