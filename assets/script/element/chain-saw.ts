import EventDefine from '../event-definition'
const {ccclass, property} = cc._decorator;

@ccclass
export default class ElementChainSaw extends cc.Component {

    @property(cc.Prefab)
    sawPrefab: cc.Prefab

    onLoad() {
        this.node.on(EventDefine.Obstacle.SawChainRun, this.onRun, this);
    }

    onDestroy() {
        this.node.off(EventDefine.Obstacle.SawChainRun, this.onRun, this);
    }

    onRun(speed: number) {
        const sawNode = cc.instantiate(this.sawPrefab);
        sawNode.setPosition(0, -sawNode.height / 2 + 3);
        sawNode.parent = this.node;
        const seq = cc.sequence(cc.moveBy(speed, this.node.width - sawNode.width, 0), cc.moveTo(speed, 0, sawNode.position.y));
        sawNode.runAction(cc.repeatForever(seq));
    }

}
