import EventDefine from '../event-definition';
import ColliderTag from '../collider-tag';
const { ccclass, property } = cc._decorator;

@ccclass
export default class ElementPlayer extends cc.Component {

    @property(cc.Prefab)
    runDustPrefab: cc.Prefab;

    totalJumpCount: number = 1;
    jumpCount: number = 0;

    startPosition: cc.Vec3

    onLoad() {
        this.startPosition = this.node.position;
        this.node.on(EventDefine.OnPlayerJump, this.onJump, this);
        this.running();
    }

    onDestroy() {
        this.node.off(EventDefine.OnPlayerJump, this.onJump, this);
    }

    onJump() {
        if (this.jumpCount >= this.totalJumpCount) {
            return;
        }
        this.jumpCount++;
        // const anim = this.node.getComponent(cc.Animation);
        // anim.play("player1_jump");
        const seq = cc.sequence(cc.jumpBy(0.5, cc.v2(0, 0), 70, 1), cc.callFunc(() => {
            // anim.play("player1_run");
            this.jumpCount--;
        }))
        this.node.runAction(seq);
    }

    running() {
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, 100, 0)));
    }

    runComplete() {
        const node = cc.instantiate(this.runDustPrefab);
        node.parent = this.node.parent;
        node.setPosition(this.node.position);
        node.runAction(cc.sequence(cc.spawn(
            cc.moveBy(0.2, -10, 3),
            cc.scaleBy(0.5, 2),
            cc.fadeOut(0.7)
        ), cc.callFunc(() => {
            node.destroy();
        })));
    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        if (other.tag === ColliderTag.Obstacle) {
            this.reset();
        }
    }

    reset() {
        this.node.stopAllActions();
        this.node.setPosition(this.startPosition);
        this.jumpCount = 0;
        this.running();
    }
}
