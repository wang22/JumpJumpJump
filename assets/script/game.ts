// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    playerNode: cc.Node

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onJump, this);
    }

    onDstroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onJump, this);
    }

    onJump () {
        this.playerNode.emit("jump");
    }

}
