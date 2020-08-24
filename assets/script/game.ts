import logger from './util/log';
import { resize, calcX, calcY, xRow } from './util/calc';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {


    @property(cc.Label)
    deathCounterLabel: cc.Label

    @property(cc.Node)
    scoreCounter: cc.Node

    @property(cc.Node)
    levelCounter: cc.Node

    /**
     * 玩家节点
     */
    playerNode: cc.Node;

    /**
     * 服务器地址
     */
    remoteUrl: string = "http://localhost:1323/static/level.json";

    /**
     * 当前关卡
     */
    currentLevelIndex: number = 0;

    /**
     * 关卡数据
     */
    levelData: Array<any>;

    /**
     * 当前关卡
     */
    currentLevel: any;

    /**
     * 当前关卡的节点
     */
    levelNode: Array<cc.Node> = [];

    onLoad() {
        const physicsMgr = cc.director.getPhysicsManager();
        physicsMgr.enabled = true;
        // physicsMgr.debugDrawFlags = 1;
        logger.debug("开启物理引擎");
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.on("player.death", this.createPlayer, this);
        this.node.on("player.get.score", this.getScore, this);
        this.node.on("player.into.door", this.intoDoor, this);
        console.log(cc.director.getPhysicsManager().gravity, "ddd");
        cc.assetManager.loadRemote(this.remoteUrl, (err: Error, data: cc.JsonAsset) => {
            // 获取关卡数据
            this.levelData = data.json;
            // 加载关卡
            this.loadNextLevel();
            // TODO 处理错误
            // console.log('response json: ', json.json);
            // for (let i = 0; i < json.json.length; i++) {
            //     this.levelArray.push(new MapConfig().initOfJson(json.json[i]));
            // }
            // this.nextLevel();
            // this.node.on(cc.Node.EventType.TOUCH_START, this.jump, this);
            // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeydown, this);
        })
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.off("player.death", this.createPlayer, this);
        this.node.off("player.get.score", this.getScore, this);
    }

    onTouch() {
        this.playerNode.emit("onJump");
    }

    loadNextLevel() {
        this.currentLevel = this.levelData[this.currentLevelIndex];
        logger.debug("level data: " + JSON.stringify(this.currentLevel));
        this.initGround(this.currentLevel);
        this.initScore(this.currentLevel);
        this.initDoor(this.currentLevel);
        this.initDoor(this.currentLevel);
        this.initObstacle(this.currentLevel);
        this.createPlayer("create");
        this.currentLevelIndex++;
        this.levelCounter.emit("level.counter.update", this.currentLevelIndex, this.levelData.length);
    }

    initGround(level: any) {
        if (!level.grounds) {
            return;
        }
        const grounds: Array<any> = level.grounds
        cc.resources.load("prefab/ground", (err, prefab: cc.Prefab) => {
            grounds.forEach(item => {
                const node = cc.instantiate(prefab);
                const width = item.width === xRow ? '110%' : item.width;
                const posX = item.width === xRow ? -20 : calcX(item.x);
                resize(width, item.height, node);
                node.parent = this.node;
                node.setPosition(posX, calcY(item.y));
                this.levelNode.push(node);
            })
        });
    }

    initScore(level: any) {
        if (!level.scores) {
            return;
        }
        const scores: Array<any> = level.scores
        cc.resources.load("prefab/score", (err, prefab: cc.Prefab) => {
            scores.forEach(item => {
                const node = cc.instantiate(prefab);
                node.parent = this.node;
                node.setPosition(calcX(item.x), calcY(item.y));
                this.levelNode.push(node);
            })
        });
    }

    initDoor(level: any) {
        if (!level.doors) {
            return;
        }
        const doors: Array<any> = level.doors
        cc.resources.load("prefab/door_normal", (err, prefab: cc.Prefab) => {
            doors.forEach(item => {
                const node = cc.instantiate(prefab);
                node.parent = this.node;
                node.setPosition(calcX(item.x), calcY(item.y));
                this.levelNode.push(node);
            })
        });
    }

    initObstacle(level: any) {
        if (!level.obstacles) {
            return;
        }
        const obstacles: Array<any> = level.obstacles
        obstacles.forEach(item => {
            cc.resources.load(`prefab/${item.type}`, (err: Error, prefab: cc.Prefab) => {
                const node = cc.instantiate(prefab);
                let posX =  calcX(item.x);
                let posY = calcY(item.y);
                if (item.type.indexOf('obstacle_spikes') > -1) {
                    const width = item.width === xRow ? '110%' : item.width;
                    posX = item.width === xRow ? -20 : calcX(item.x);
                    resize(width, item.height, node);
                }
                node.setPosition(posX, posY);
                node.parent = this.node;
                this.levelNode.push(node);
            })
        })
    }

    createPlayer(type: string) {
        if (type === "dead") {
            this.deathCounterLabel.node.emit("death.counter.update");
        }
        cc.resources.load("prefab/player", (err, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            if (this.currentLevel.direction === "right") {
                node.setPosition(calcX(1), calcY("100%"));
            } else {
                node.setPosition(calcX("100%") - calcX(16), calcY("100%"));
            }
            node.parent = this.node;
            node.emit("run.direction", this.currentLevel.direction)
            this.levelNode.push(node);
            this.playerNode = node;
        });
    }

    getScore() {
        this.scoreCounter.emit("score.counter.update")
    }

    intoDoor() {
        this.levelNode.forEach(item => {
            item.destroy();
        });
        this.levelNode = [];
        this.loadNextLevel();
    }

}
