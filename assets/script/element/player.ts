// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ElementPlayer extends cc.Component {

    @property(cc.Prefab)
    runDustPrefab: cc.Prefab

    onLoad() {
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, 100, 0)));
    }

    runComplete() {
        const node = cc.instantiate(this.runDustPrefab);
        node.parent = this.node.parent;
        node.setPosition(this.node.position);
        node.runAction(cc.sequence(cc.spawn(
            cc.moveBy(0.2, -10, 3),
            cc.scaleBy(0.5, 2),
            cc.fadeOut(0.7)
        ), cc.callFunc(() => {
            node.destroy();
        })));
    }

}
