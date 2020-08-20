import { resize, calcX } from "../util/calc";
import logger from "../util/log"

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemPlayer extends cc.Component {

    @property(cc.SpriteFrame)
    jumpFrame: cc.SpriteFrame

    @property
    speed: number = 300;

    defaultFrame: cc.SpriteFrame

    isJump: boolean = false;

    onLoad() {
        // const seq = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1), cc.scaleTo(0.2, 1, 1)));
        // this.node.runAction(seq);
        // 绑定事件
        this.node.on("initNode", this.initNode, this);
        this.node.on("onJump", this.onJump, this);
        const sprite = this.node.getComponent(cc.Sprite);
        this.defaultFrame = sprite.spriteFrame;
        // 设置图像翻转
        sprite.spriteFrame.setFlipX(true);
    }

    onDestroy() {
        // 注销事件
        this.node.off("initNode", this.initNode, this);
        this.node.off("onJump", this.onJump, this);
    }

    initNode(width: number, height: number) {
        logger.debug("init player size")
        this.node.width = calcX(width);
        this.node.height = calcX(height);
        const collider = this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width = this.node.width;
        collider.size.height = this.node.height;
        collider.offset.x = Math.ceil(this.node.width / 2);
        collider.offset.y = Math.ceil(this.node.height / 2 + 1);
        collider.apply();
    }

    onJump() {
        if (this.isJump) {
            const rg = this.node.getComponent(cc.RigidBody);
            const lv = rg.linearVelocity;
            lv.y = 900;
            lv.x = 300;
            rg.linearVelocity = lv;
        }
    }

    update() {
        if (this.isJump) {
            const rg = this.node.getComponent(cc.RigidBody);
            const lv = rg.linearVelocity;
            lv.x = 300;
            rg.linearVelocity = lv;
        }
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        const target = otherCollider.node.group;
        const sprite = this.node.getComponent(cc.Sprite);
        switch (target) {
            case "ground":
                this.isJump = true;
                sprite.spriteFrame = this.defaultFrame;
                break;
            case "obstacle":
                this.death();
                break;
            case "wall":
                this.death();
                break;
        }
    }

    death() {
        this.node.parent.emit("player.death");
        this.node.destroy();
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        if (otherCollider.node.group === "ground") {
            const sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.jumpFrame;
            this.isJump = false;
        }
    }

}
