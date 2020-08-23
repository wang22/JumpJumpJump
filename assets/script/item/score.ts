const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemScore extends cc.Component {

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        if (otherCollider.node.group === "player") {
            this.node.destroy();
        }
    }

}
