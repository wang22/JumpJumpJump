// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, 150, 0)));
    }

    // showDust () {
    //     this.node.getChildByName("dust").active = true;
    // }

    // hideDust () {
    //     this.node.getChildByName("dust").active = false;
    // }

}
