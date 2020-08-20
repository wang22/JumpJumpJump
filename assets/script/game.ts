import logger from './util/log';
import { resize, calcX, calcY } from './util/calc';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {


    @property(cc.Label)
    deathCounterLabel: cc.Label

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
            resize("110%", 36, node);
            node.parent = this.node;
            node.setPosition(-10, 69);


            const node1 = cc.instantiate(prefab);
            resize(66, 56, node1);
            node1.parent = this.node;
            node1.setPosition(calcX(72), calcY(143));

            // const node1 = cc.instantiate(prefab);
            // resize("60%", 40, node1);
            // node1.parent = this.node;
            // node1.setPosition(700, 50);
        });
        // cc.resources.load("prefab/spikesGround", (err, prefab: cc.Prefab) => {
        //     const node = cc.instantiate(prefab);
        //     resize("30%", 40, node);
        //     node.parent = this.node;
        //     node.setPosition(500, 10);
        // });
        this.createPlayer();
        cc.resources.load("prefab/spikes", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            resize("110%", -1, node);
            node.parent = this.node;
            node.setPosition(-10, 0);
        });
    }

    createPlayer() {
        this.deathCounterLabel.node.emit("death.counter.update");
        cc.resources.load("prefab/player", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.setPosition(1, calcY("100%"));
            node.parent = this.node;
            node.emit("initNode", 15, 15 * 0.55);
            this.playerNode = node;
        });
    }

}
