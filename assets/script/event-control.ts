import EventDefine from './event-definition';
const { ccclass, property } = cc._decorator;

@ccclass
export default class EventControl extends cc.Component {

    onLoad() {
        this.node.on(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
        this.node.on(EventDefine.Map.OnCollisionByPlayer, this.onCollisionByPlayer, this);
    }

    onDestroy() {
        this.node.off(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
        this.node.off(EventDefine.Map.OnCollisionByPlayer, this.onCollisionByPlayer, this);
    }

    onPlayerCreate(player: cc.Node) {
        this.node.parent.emit(EventDefine.OnPlayerCreate, player)
    }

    onCollisionByPlayer(cmd: string) {
        // 进入下一关
        if (cmd === "nextLevel") {
            this.node.parent.emit("goNextLevel")
        }
    }

}
