import Factory from './factory';

class ObstacleFactory implements Factory {
    build(data: any, parentNode: cc.Node): void {
        if (data.type === "saw") {
            cc.resources.load("prefab/obstacle/saw", (err: Error, prefab: cc.Prefab) => {
                const node = cc.instantiate(prefab);
                node.width = data.width;
                node.height = data.height;
                node.setPosition(data.x, data.y);
                node.parent = parentNode;
            })
        }
    }
}

export default ObstacleFactory;