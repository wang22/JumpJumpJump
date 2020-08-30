import ColliderTag from '../collider-tag';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ElementFlag extends cc.Component {

    isCheck: boolean = false;

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        if (other.tag === ColliderTag.Player) {
            if (this.isCheck) {
                return;
            }
            this.isCheck = true;
            const anim = this.node.getComponent(cc.Animation);
            anim.play("flag-out");
        }
    }

    flagOut() {
        const anim = this.node.getComponent(cc.Animation);
        anim.play("flag-ldle");
    }

}
