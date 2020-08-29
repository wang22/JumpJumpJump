import Factory from './factory';

class ObstacleFactory implements Factory {
    build(data: any, parentNode: cc.Node): void {
        let resource = "prefab/obstacle/saw";
        if (data.type === "saw") {
            this.buildSaw(data, parentNode);
        } else if (data.type === "spike-head") {
            this.buildSpikeHead(data, parentNode);
        }
    }

    buildSaw(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/obstacle/saw", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
        })
    }

    buildSpikeHead(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/obstacle/spike-head", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
        })
    }
}

export default ObstacleFactory;