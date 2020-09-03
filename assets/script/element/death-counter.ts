import EventDefine from '../event-definition';
const { ccclass, property } = cc._decorator;

@ccclass
export default class ElementDeathCounter extends cc.Component {

    count: number = 0

    onLoad() {
        this.node.on(EventDefine.DeathCounter.IncreaseCount, this.IncreaseCount, this);
    }

    onDestroy() {
        this.node.off(EventDefine.DeathCounter.IncreaseCount, this.IncreaseCount, this);
    }

    IncreaseCount() {
        this.count ++;
        const label = this.node.getComponent(cc.Label);
        label.string = `DEATH: ${this.count}`;
    }

}
