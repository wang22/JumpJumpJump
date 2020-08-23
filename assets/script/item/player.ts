import logger from "../util/log";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemPlayer extends cc.Component {

    @property(cc.SpriteFrame)
    jumpFrame: cc.SpriteFrame

    @property
    speed: number = 300;

    @property
    jumpForce: number = 900;

    defaultFrame: cc.SpriteFrame

    isJump: boolean = false;

    isInDoor: boolean = false;

    onLoad() {
        // const seq = cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.3, 1), cc.scaleTo(0.2, 1, 1)));
        // this.node.runAction(seq);
        // 绑定事件
        this.node.on("onJump", this.onJump, this);
        this.node.on("run.direction", this.setDirection, this);
    }

    onDestroy() {
        // 注销事件
        this.node.off("onJump", this.onJump, this);
        this.node.off("run.direction", this.setDirection, this);
    }

    setDirection(direction) {
        const sprite = this.node.getComponent(cc.Sprite);
        this.defaultFrame = sprite.spriteFrame;
        if (direction === "right") {
            // 设置图像翻转
            sprite.spriteFrame.setFlipX(true);
        } else {
            this.speed = -this.speed;
        }
    }

    onJump() {
        if (this.isJump) {
            const rg = this.node.getComponent(cc.RigidBody);
            const lv = rg.linearVelocity;
            lv.y = this.jumpForce;
            lv.x = this.speed;
            rg.linearVelocity = lv;
        }
    }

    update() {
        if (this.isJump) {
            const rg = this.node.getComponent(cc.RigidBody);
            const lv = rg.linearVelocity;
            lv.x = this.speed;
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
                this.death("dead");
                break;
            case "wall":
                this.death("reset");
                break;
            case "score":
                this.getScore();
                otherCollider.node.destroy();
                break;
            case "door":
                if (!this.isInDoor) {
                    this.intoDoor();
                    this.isInDoor = true;   
                }
                break;
        }
    }
    death(type: string) {
        this.node.parent.emit("player.death", type);
        this.node.destroy();
    }

    getScore() {
        this.node.parent.emit("player.get.score");
    }

    intoDoor() {
        this.node.parent.emit("player.into.door");
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsBoxCollider, otherCollider: cc.PhysicsBoxCollider) {
        if (otherCollider.node.group === "ground") {
            const sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.jumpFrame;
            this.isJump = false;
        }
    }

}
