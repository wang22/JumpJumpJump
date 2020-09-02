import EventDefine from '../event-definition'
const { ccclass, property } = cc._decorator;

@ccclass
export default class ElementChainSaw extends cc.Component {

    @property(cc.Prefab)
    sawPrefab: cc.Prefab

    sawWidth: number = 38

    onLoad() {
        this.node.on(EventDefine.Obstacle.SawChainRun, this.onRun, this);
    }

    onDestroy() {
        this.node.off(EventDefine.Obstacle.SawChainRun, this.onRun, this);
    }

    onRun(prop: any) {
        const style: string = prop.style;
        const align: string = prop.align;
        if (style === "full") {
            this.buildFullSaw(align);
        } else {
            this.buildPatrolSaw(align);
        }
    }

    buildFullSaw(align: string) {
        if (align === "hr") {
            const count = Math.ceil(this.node.width / this.sawWidth);
            for (let i = 0; i < count; i++) {
                const sawNode = cc.instantiate(this.sawPrefab);
                sawNode.setPosition(i * this.sawWidth, -this.sawWidth / 2 + 3);
                sawNode.parent = this.node;        
            }
        }
    }

    buildPatrolSaw(align: string) {
        const sawNode = cc.instantiate(this.sawPrefab);
        sawNode.parent = this.node;
        let seq: cc.ActionInterval
        if (align === "hr") {
            sawNode.setPosition(0, -sawNode.height / 2 + 3);
            seq = cc.sequence(cc.moveBy(1, this.node.width - sawNode.width, 0), cc.moveTo(1, 0, sawNode.position.y));
        }
        sawNode.runAction(cc.repeatForever(seq));
    }

}
