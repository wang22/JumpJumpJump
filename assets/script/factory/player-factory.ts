import PrefabFactory from "../event-definition";
import Factory from './factory';
import EventDefine from '../event-definition';
import BaseFactory from "./base-factory";

class PlayerFactory extends BaseFactory {
    build(data: any, parentNode: cc.Node): void {
        const properties = data.properties;
        cc.resources.load("prefab/player", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            node.emit(EventDefine.Player.Running, properties.direction)
            parentNode.emit(PrefabFactory.OnPlayerCreate, node);
            super.putNode(node);
        })
    }
}

export default PlayerFactory;