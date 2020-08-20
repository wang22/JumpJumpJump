import { resize } from "../util/calc";
import logger from "../util/log"

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemPlayer extends cc.Component {

    isJump: boolean = false;

    onLoad() {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.jump, this);
        const seq = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1), cc.scaleTo(0.2, 1, 1)));
        this.node.runAction(seq);
        this.node.on("onJump", this.onJump, this);
    }

    onDestroy() {
        this.node.off("onJump", this.onJump, this);
    }

    onJump() {
        if (this.isJump) {
            const rg = this.node.getComponent(cc.RigidBody);
            const lv = rg.linearVelocity;
            lv.y = 900;
            rg.linearVelocity = lv;
        }
    }

    update() {
        const rg = this.node.getComponent(cc.RigidBody);
        const lv = rg.linearVelocity;
        lv.x = 300;
        rg.linearVelocity = lv;
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        const target = otherCollider.node.group;
        switch (target) {
            case "ground":
                this.isJump = true;
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
        logger.debug("Player死亡");
        this.node.parent.emit("player.death");
        this.node.destroy();
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        if (otherCollider.node.group === "ground") {
            this.isJump = false;
        }
    }

}
