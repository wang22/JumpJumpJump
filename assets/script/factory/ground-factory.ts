import Factory from './factory';

class GroundFactory implements Factory {
    build(data: any, parentNode: cc.Node): void {
        cc.resources.load("prefab/ground", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
        })
    }
}

export default GroundFactory;