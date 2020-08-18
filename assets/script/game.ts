// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    playerPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    groundPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    backgroundPrefab: cc.Prefab = null;

    groundNode: cc.Node;

    playerNode: cc.Node

    isJump: boolean = false;

    groundRotation: number = 3;

    row: number = 120;

    col: number;

    onLoad() {
        // 开启碰撞引擎
        var collisionMgr = cc.director.getCollisionManager();
        collisionMgr.enabled = true;
        // collisionMgr.enabledDebugDraw = true;
        // collisionMgr.enabledDrawBoundingBox = true;
        // 计算格子
        this.col = cc.winSize.width / this.row;
        // 初始化主元素
        this.initMap();
        // 绑定事件
        this.node.on(cc.Node.EventType.TOUCH_START, this.jump, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.jump, this);
    }

    onDestroy() {
        // 解除绑定事件
        this.node.off(cc.Node.EventType.TOUCH_START, this.jump, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.jump, this);
    }

    initMap() {
        this.initBackground();
        this.initGround();
        this.initPlayer();
    }

    initBackground() {
        const backgroundNode = cc.instantiate(this.backgroundPrefab);
        backgroundNode.parent = this.node;
    }

    initGround() {
        this.groundNode = cc.instantiate(this.groundPrefab);
        this.groundNode.parent = this.node;
        this.groundNode.rotation = 3;
    }

    initPlayer() {
        this.playerNode = cc.instantiate(this.playerPrefab);
        this.playerNode.parent = this.groundNode;
    }

    /**
     * 玩家跳跃动作
     */
    jump() {
        this.playerNode.emit("onJump");
    }

}
