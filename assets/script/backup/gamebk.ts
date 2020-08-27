// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Node)
    // playerNode: cc.Node

    // 活动窗口
    @property(cc.Node)
    activeNode: cc.Node

    rowX: number = 440;
    roxY: number = 280;

    colX: number
    colY: number

    realWidth: number
    realHeight: number

    activeWidth: number
    activeHeight: number

    onLoad() {
        // console.log(`width:${cc.winSize.width}, height: ${cc.winSize.height}`);
        // console.log(`nWidth:${this.node.width}, nHeight: ${this.node.height}`);
        // this.realWidth = cc.view.getViewportRect().width;
        // this.realHeight = cc.view.getViewportRect().height;

        // const scale = this.realHeight / this.node.height;
        // this.activeHeight = this.node.height * scale;
        // this.activeWidth = this.node.width * scale;
        // console.log(`scale: ${scale}, width: ${this.activeWidth}, height: ${this.activeHeight}`);

        // this.node.width = this.activeWidth;
        // this.node.height = this.activeHeight;

        // console.log(this.node.getContentSize());
        console.log(cc.view.getVisibleSize());
        
        console.log(this.node.width, this.node.height);
        this.node.width = this.node.width/2;

        // console.log(cc.view.getVisibleSizeInPixel());

        // if (this.realHeight < this.node.height) {

        // }
        
        // 计算X和Y的长度
        this.colX = cc.winSize.width / this.rowX;
        this.colY = cc.winSize.height / this.roxY;

        // 开启碰撞引擎
        const mgr = cc.director.getCollisionManager();
        mgr.enabled = true;
        mgr.enabledDebugDraw = true;

        // touch event
        this.node.on(cc.Node.EventType.TOUCH_START, this.onJump, this);
    }

    onDstroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onJump, this);
    }

    onJump() {
        this.playerNode.emit("jump");
    }

}
