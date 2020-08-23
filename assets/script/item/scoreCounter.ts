// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    count: number = 0

    onLoad () {
        this.node.on("score.counter.update", this.updateCounter, this);
    }

    updateCounter() {
        this.count ++;
        const label = this.node.getChildByName("score").getComponent(cc.Label);
        label.string = `x ${this.count}`
    }

}
