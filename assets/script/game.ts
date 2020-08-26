// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    playerNode: cc.Node

    onLoad() {
        const mgr = cc.director.getCollisionManager();
        mgr.enabled = true;
        // mgr.enabledDebugDraw = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onJump, this);
        // for (let i = 0; i < 100; i++) {
        //     cc.resources.load("prefab/spiker", (err: Error, prefab: cc.Prefab) => {
        //         const node = cc.instantiate(prefab);
        //         node.parent = this.node.getChildByName("active");
        //         node.setPosition(100 * i, 100 * i);
        //     });
        // }
    }

    onDstroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onJump, this);
    }

    onJump() {
        this.playerNode.emit("jump");
    }

}
