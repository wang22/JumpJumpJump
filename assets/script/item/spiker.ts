// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemSpiker extends cc.Component {

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        const target = other.node.group;
        if (target === "player") {
            const anim = this.node.getComponent(cc.Animation);
            anim.play();
        }
    }

}
