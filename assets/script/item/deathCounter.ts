// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class DeathCounter extends cc.Component {

    count: number = 0

    onLoad() {
        this.node.on("death.counter.update", this.updateCounter, this);
    }


    updateCounter() {
        this.count ++;
        const label = this.node.getComponent(cc.Label);
        label.string = `DEATH: ${this.count}`
    }

}
