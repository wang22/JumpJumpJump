// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    sawPrefab: cc.Prefab

    onLoad() {
        const sawCount = Math.ceil(this.node.height/38);
        for (let i = 0; i < sawCount; i++) {
            const posY = this.node.height - i * 38;
            const node = cc.instantiate(this.sawPrefab);
            node.parent = this.node;
            node.setPosition(0, posY);
        }
    }
}
