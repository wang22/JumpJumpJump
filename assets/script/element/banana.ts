import BaseElement from './base-element';
import ColliderTag from '../collider-tag';
const {ccclass, property} = cc._decorator;

@ccclass
export default class ElementBanana extends BaseElement {


    onCollisionEnter(other: cc.BoxCollider, self: cc.BoxCollider) {
        if (other.tag === ColliderTag.Player) {
        }
    }

}
