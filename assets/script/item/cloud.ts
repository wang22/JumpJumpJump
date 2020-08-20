// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemCloud extends cc.Component {


    onLoad() {
        const node = this.node;
        const action = cc.repeatForever(
            cc.sequence(
                cc.moveBy(10, 100, 0), 
                cc.moveBy(10, -100, 0)
            )
        );
        this.node.runAction(action);
    }

}
