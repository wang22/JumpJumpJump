import ColliderTag from '../collider-tag';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ElementApple extends cc.Component {

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        if (other.tag === ColliderTag.Player) {
            const anim = this.node.getComponent(cc.Animation);
            anim.play("fruits-boom");
        }
    }

    appleBoom() {
        this.node.destroy();
    }

}
