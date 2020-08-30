import Factory from './factory';
import EventDefine from '../event-definition';
import BaseFactory from './base-factory';

class ObstacleFactory extends BaseFactory {
    build(data: any, parentNode: cc.Node): void {
        const properties = data.properties;
        if (properties.type === "saw") {
            this.buildSaw(data, parentNode);
        } else if (properties.type === "spike-head") {
            this.buildSpikeHead(data, parentNode);
        } else if (properties.type === "saw-chain") {
            this.buildSawChain(data, parentNode);
        }
    }

    buildSaw(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/obstacle/saw", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            super.putNode(node);
        })
    }

    buildSpikeHead(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/obstacle/spike-head", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            super.putNode(node);
        })
    }

    buildSawChain(data: any, parentNode: cc.Node) {
        const fixWidth = 6;
        cc.resources.load("prefab/obstacle/saw-chain", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            if (data.width > data.height) {
                node.width = data.width;
                node.height = fixWidth;
            } else {
                node.width = fixWidth;
                node.height = data.height;
            }
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            node.emit(EventDefine.Obstacle.SawChainRun, 1);
            super.putNode(node);
        })
    }
}

export default ObstacleFactory;