// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemSawChain extends cc.Component {

    @property(cc.Prefab)
    sawPrefab: cc.Prefab;

    @property
    sawCount: number = 1;

    onLoad() {
        if (this.sawCount === 1) {
            const node = cc.instantiate(this.sawPrefab);
            node.parent = this.node;
            const posY = (node.height - this.node.height) / 2;
            const startPoint = Math.abs(node.width/2);
            const width = this.node.width - startPoint;
            node.setPosition(-startPoint, -posY);
            node.runAction(cc.repeatForever(
                cc.sequence(
                    cc.moveTo(2, cc.v2(width, -posY)),
                    cc.moveTo(2, cc.v2(-startPoint, -posY))
                )
            ));
            const bc = node.getComponent(cc.BoxCollider);
            bc.enabled = true;
        }
    }
}
