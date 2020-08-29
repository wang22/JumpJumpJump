import PrefabFactory from "./factory/prefab-factory";
import EventDefine from './event-definition';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    activeNode: cc.Node = null;

    LevelData: Array<any>

    currentLevel: number = 0;

    prefabFactory: PrefabFactory = new PrefabFactory();

    playerNode: cc.Node;

    onLoad() {
        const mgr = cc.director.getCollisionManager();
        mgr.enabled = true;
        // mgr.enabledDebugDraw = true;
        const remoteURL = "http://localhost:1323/static/level.json";
        cc.assetManager.loadRemote(remoteURL, (err: Error, jsonData: cc.JsonAsset) => {
            this.LevelData = jsonData.json;
            this.nextLevel();
        })
        this.node.on(cc.Node.EventType.TOUCH_START, this.jump, this);
        this.node.on(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.jump, this);
        this.node.off(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
    }

    jump() {
        this.playerNode.emit(EventDefine.OnPlayerJump)
    }

    onPlayerCreate(player: cc.Node) {
        this.playerNode = player;
    }

    nextLevel() {
        const level = this.LevelData[this.currentLevel];
        if (level.objects) {
            for (let i = 0; i < level.objects.length; i++) {
                const obj = level.objects[i];
                this.prefabFactory.build(obj.name, obj, this.activeNode);
            }
        }
    }

}
