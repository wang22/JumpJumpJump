// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ObjectFactory from "./objects/objects";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    activeNode: cc.Node = null;

    LevelData: Array<any>

    currentLevel: number = 0;

    objectFactory: ObjectFactory = new ObjectFactory();

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
                this.objectFactory.build(obj.name, obj);
            }
        }
    }

}
