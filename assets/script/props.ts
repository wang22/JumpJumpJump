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
        const seq = cc.repeatForever(
            cc.sequence(
                cc.moveTo(1, this.node.position.x, this.node.height/4),
                cc.moveTo(1, this.node.position.x, this.node.height)
            ));
        this.node.runAction(seq);
    }

}
