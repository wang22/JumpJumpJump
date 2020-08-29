import PrefabFactory from "./factory/prefab-factory";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    activeNode: cc.Node = null;

    LevelData: Array<any>

    currentLevel: number = 0;

    prefabFactory: PrefabFactory = new PrefabFactory();

    onLoad() {
        const remoteURL = "http://localhost:1323/static/level.json";
        cc.assetManager.loadRemote(remoteURL, (err: Error, jsonData: cc.JsonAsset) => {
            this.LevelData = jsonData.json;
            this.nextLevel();
        })
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
