import EventDefine from './event-definition';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        this.node.on(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
    }

    onDestroy() {
        this.node.off(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
    }

    onPlayerCreate(player: cc.Node) {
        this.node.parent.emit(EventDefine.OnPlayerCreate, player)
    }

}
