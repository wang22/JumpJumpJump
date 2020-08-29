import PrefabFactory from "../event-definition";
import Factory from './factory';

class PlayerFactory implements Factory {
    build(data: any, parentNode: cc.Node): void {
        cc.resources.load("prefab/player", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            parentNode.emit(PrefabFactory.OnPlayerCreate, node);
        })
    }
}

export default PlayerFactory;