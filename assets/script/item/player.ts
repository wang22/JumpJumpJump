const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemPlayer extends cc.Component {

    @property(cc.Prefab)
    dustPrefab: cc.Prefab;

    @property(cc.Prefab)
    jumpDustPrefab: cc.Prefab;

    /**
     * 最高可跳跃次数
     */
    totalJumpCount: number = 1;

    /**
     * 跳跃次数
     */
    jumpCount: number = 0;

    startPosition: cc.Vec3;

    onLoad() {
        this.startPosition = this.node.position;
        this.node.on("jump", this.onJump, this);
        this.running();
    }

    onDestroy() {
        this.node.off("jump", this.onJump, this);
    }

    running() {
        const anim = this.node.getComponent(cc.Animation);
        anim.play("player1_run");
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, 130, 0)));
    }

    stopRunning() {
        this.node.stopAllActions();
    }

    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        const target = other.node.group;
        switch (target) {
            case "obstacle":
                this.reset();
                break;
        }
    }

    reset () {
        this.stopRunning();
        this.node.setPosition(this.startPosition);
        this.running();
        this.jumpCount = 0;
    }

    onJump() {
        if (this.totalJumpCount == this.jumpCount) {
            return;
        }
        this.jumpCount++;
        const anim = this.node.getComponent(cc.Animation);
        anim.play("player1_jump");
        const seq = cc.sequence(cc.jumpBy(0.5, cc.v2(0, 0), 80, 1), cc.callFunc(() => {
            anim.play("player1_run");
            this.jumpCount--;
        }))
        this.node.runAction(seq);
    }

    showDust() {
        const node = cc.instantiate(this.dustPrefab);
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

    showJumpDust() {
        const node = cc.instantiate(this.jumpDustPrefab);
        node.parent = this.node.parent;
        node.setPosition(this.node.position);
        const right = node.getChildByName("right");
        right.runAction(cc.spawn(
            cc.moveBy(0.2, -7, 3),
            cc.scaleBy(0.5, 1.5),
            cc.fadeOut(0.7)
        ));
        const left = node.getChildByName("left");
        left.runAction(cc.sequence(cc.spawn(
            cc.moveBy(0.2, 7, 3),
            cc.scaleBy(0.5, 1.5),
            cc.fadeOut(0.7)
        ), cc.callFunc(() => {
            node.destroy();
        })));
    }

}
