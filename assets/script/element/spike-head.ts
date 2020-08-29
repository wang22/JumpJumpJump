import ColliderTag from '../collider-tag';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ElementSpikeHead extends cc.Component {


    isBlink: boolean = false;

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        if (other.tag === ColliderTag.Player) {
            if (!this.isBlink) {
                this.isBlink = true;
                const anim = this.node.getComponent(cc.Animation);
                anim.play();
            }
        }
    }

    animationComplete() {
        this.isBlink = false;
    }
}
