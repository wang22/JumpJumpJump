const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    dustPrefab: cc.Prefab;

    @property(cc.Prefab)
    jumpDustPrefab: cc.Prefab;

    /**
     * 最高可跳跃次数
     */
    totalJumpCount: number = 2;

    /**
     * 跳跃次数
     */
    jumpCount: number = 0;

    onLoad() {
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, 100, 0)));
        this.node.on("jump", this.onJump, this);
    }

    onDestroy() {
        this.node.off("jump", this.onJump, this);
    }

    onJump() {
        if (this.totalJumpCount == this.jumpCount) {
            return ;
        }
        this.jumpCount ++;
        const anim = this.node.getComponent(cc.Animation);
        anim.play("player1_jump");
        const seq = cc.sequence(cc.jumpBy(0.5, cc.v2(0, 0), 60, 1), cc.callFunc(() => {
            anim.play("player1_run");
            this.jumpCount --;
        }))
        this.node.runAction(seq);
    }

    showDust() {
        const node = cc.instantiate(this.dustPrefab);
        node.parent = this.node.parent;
        node.setPosition(this.node.position);
        node.runAction(cc.spawn(
            cc.moveBy(0.2, -10, 3),
            cc.scaleBy(0.5, 2),
            cc.fadeOut(0.7)
        ));
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
        left.runAction(cc.spawn(
            cc.moveBy(0.2, 7, 3),
            cc.scaleBy(0.5, 1.5),
            cc.fadeOut(0.7)
        ));
    }

}
