import logger from './util/log';
import { resize } from './util/calc';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    /**
     * 玩家节点
     */
    playerNode: cc.Node;

    onLoad() {
        const physicsMgr = cc.director.getPhysicsManager();
        physicsMgr.enabled = true;
        // physicsMgr.debugDrawFlags = 1;
        logger.debug("开启物理引擎");
        this.loadItem();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.on("player.death", this.createPlayer, this);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.off("player.death", this.createPlayer, this);
    }

    onTouch() {
        this.playerNode.emit("onJump");
    }

    loadItem() {
        cc.resources.load("prefab/ground", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            resize("60%", 40, node);
            node.parent = this.node;
            node.setPosition(-10, 50);

            const node1 = cc.instantiate(prefab);
            resize("60%", 40, node1);
            node1.parent = this.node;
            node1.setPosition(700, 50);
        });
        cc.resources.load("prefab/spikesGround", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            resize("30%", 40, node);
            node.parent = this.node;
            node.setPosition(500, 10);
        });
        this.createPlayer();
        cc.resources.load("prefab/spikes", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            resize("110%", -1, node);
            node.parent = this.node;
            node.setPosition(-10, 0);
        });
    }

    createPlayer() {
        cc.resources.load("prefab/player", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            resize(12, 6.6, node);
            node.setPosition(10, 300);
            node.parent = this.node;
            this.playerNode = node;
        });
    }

}
