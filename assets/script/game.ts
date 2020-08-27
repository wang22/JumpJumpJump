// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        // //获取视图的大小，以点为单位
        // let winSize=cc.director.getWinSize();
        // //获取视图的大小，以像素为单位
        // let winSizePixels=cc.director.getWinSizeInPixels();
        // // console.log(winSize, winSizePixels)
        // const width = cc.winSize.width;
        // const height = cc.winSize.height;
        // const scale = height/width;
        // this.node.width = cc.winSize.width * scale;
        // this.node.height = cc.winSize.height * scale;
        // console.log(this.node.width, this.node.height, scale);
        
        console.log(cc.winSize);
        console.log(this.node.width, this.node.height);
        console.log(cc.director.getWinSizeInPixels());
        console.log(cc.Canvas.instance.designResolution);
        
        
        
    }

}
