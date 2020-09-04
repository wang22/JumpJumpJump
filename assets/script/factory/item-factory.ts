import EventDefine from '../event-definition'
import BaseFactory from './base-factory';

class ItemFactory extends BaseFactory {
    build(data: any, parentNode: cc.Node): void {
        const properties = data.properties;
        if (properties.type === "apple") {
            this.buildApple(data, parentNode);
        } else if (properties.type === "flag") {
            this.buildFlag(data,parentNode);
        }
    }

    buildApple(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/item/apple", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            super.putNode(node);
        })
    }

    buildFlag(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/item/flag", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            if (data.properties.onCollisionByPlayer) {
                node.emit(EventDefine.AccpetEventOffer, EventDefine.Map.OnCollisionByPlayer, data.properties.onCollisionByPlayer);
            }
            super.putNode(node);
        })
    }

    buildBanana(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/item/banana", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            if (data.properties.onCollisionByPlayer) {
                node.emit(EventDefine.AccpetEventOffer, EventDefine.Map.OnCollisionByPlayer, data.properties.onCollisionByPlayer);
            }
            super.putNode(node);
        })
    }
}

export default ItemFactory;