// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onLoad() {
        const seq = cc.sequence(cc.moveBy(15, 0, -this.node.height/3*2), cc.callFunc(() => {
            this.node.y = 0;
        }))
        this.node.runAction(cc.repeatForever(seq));
    }

}
