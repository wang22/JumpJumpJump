import EventDefine from '../event-definition'
const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseElement extends cc.Component {


    eventMap: Map<string, string> = new Map();

    onLoad() {
        this.node.on(EventDefine.AccpetEventOffer, this.accpetEventOffer, this);
    }

    onDestroy() {
        this.node.off(EventDefine.AccpetEventOffer, this.accpetEventOffer, this);
    }

    accpetEventOffer(eventName: string, eventCMD: string) {
        this.eventMap.set(eventName, eventCMD);
    }

    emitEvent(eventName: string) {
        const event = this.eventMap.get(eventName);
        if (event) {
            this.node.parent.emit(eventName, event);
        }
    }
}
