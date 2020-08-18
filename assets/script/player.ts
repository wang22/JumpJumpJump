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
    flashAnimPrefab: cc.Prefab = null;

    bodyProps: Array<cc.Node> = new Array();

    isJump: boolean = false;

    boomAnimArr: Array<string> = ["flash", "fart", "puff", "smoke"]

    onLoad () {
        const start = cc.winSize.width / 2;
        this.node.setPosition(-start + this.node.width/2, this.node.position.y);
        this.node.runAction(cc.moveBy(3, cc.v2(cc.winSize.width + cc.winSize.width * 0.2, 0)));
        this.node.on('colliderKey', this.colliderKey, this);
        this.node.on('onJump', this.onJump, this);
    }

    onDestroy () {
        this.node.off('colliderKey', this.colliderKey, this);
        this.node.off('onJump', this.onJump, this);
    }

    onCollisionEnter(otherCollider: cc.BoxCollider,selfCollider : cc.BoxCollider) {
        if (otherCollider.node.group === 'key') {
            selfCollider.node.emit('colliderKey', otherCollider);
        }
    }

    colliderKey (otherCollider: cc.BoxCollider) {
        let height = 0;
        for (let i = 0; i < this.bodyProps.length; i++) {
            const node = this.bodyProps[i];
            height += node.height/2;
        }
        console.log(height);
        const otherNode = otherCollider.node;
        const imgNode = otherNode.getChildByName("keyImg")
        imgNode.setPosition(0, 14.5);
        imgNode.stopAllActions();
        otherNode.removeComponent(cc.BoxCollider);
        otherNode.removeComponent(cc.Widget);
        otherNode.width = imgNode.width;
        otherNode.height = imgNode.height;
        otherNode.setScale(cc.v2(-otherNode.scaleX, otherNode.scaleY));
        otherNode.setPosition(this.node.width - this.node.width/4, this.node.height - 10 + height);
        otherNode.parent = this.node;
        this.bodyProps.push(imgNode);


        const flashNode = cc.instantiate(this.flashAnimPrefab);
        flashNode.parent = this.node;
        const anim = flashNode.getComponent(cc.Animation)
        const index = this.getRandomInt(0, 4);
        console.log(index);
        anim.play(this.boomAnimArr[index]);
    }

    onJump () {
        if (this.isJump) {
            return;
        }
        this.isJump = true;
        const step = this.node.width;
        const dura = .4;
        let seq = cc.sequence(cc.jumpBy(dura, (step * 2), 0, step * 2, 1), cc.callFunc(() => {
            this.isJump = false;
        }));
        this.node.runAction(seq);
    }

    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
    }

}
