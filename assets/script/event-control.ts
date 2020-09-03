import EventDefine from './event-definition';
const { ccclass, property } = cc._decorator;

@ccclass
export default class EventControl extends cc.Component {

    @property(cc.Node)
    deathCounter: cc.Node

    onLoad() {
        this.node.on(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
        this.node.on(EventDefine.Map.OnCollisionByPlayer, this.onCollisionByPlayer, this);
        this.node.on(EventDefine.Player.Death, this.onPlayerDeath, this);
    }

    onDestroy() {
        this.node.off(EventDefine.OnPlayerCreate, this.onPlayerCreate, this);
        this.node.off(EventDefine.Map.OnCollisionByPlayer, this.onCollisionByPlayer, this);
        this.node.off(EventDefine.Player.Death, this.onPlayerDeath, this);
    }

    onPlayerCreate(player: cc.Node) {
        this.node.parent.emit(EventDefine.OnPlayerCreate, player)
    }

    onPlayerDeath() {
        this.deathCounter.emit(EventDefine.DeathCounter.IncreaseCount)
    }

    onCollisionByPlayer(cmd: string) {
        // 进入下一关
        if (cmd === "nextLevel") {
            this.node.parent.emit("goNextLevel")
        }
    }

}
