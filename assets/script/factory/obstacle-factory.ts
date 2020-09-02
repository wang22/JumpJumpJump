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
        const properties = data.properties;
        const prefab = `prefab/obstacle/spike-head${properties.style ? '-' + properties.style : ''}`;
        console.log(prefab);
        
        cc.resources.load(prefab, (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            // node.width = data.width;
            // node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            super.putNode(node);
        })
    }

    buildSawChain(data: any, parentNode: cc.Node) {
        const fixWidth = 6;
        const properties = data.properties;
        cc.resources.load("prefab/obstacle/saw-chain", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            let align = "hr";
            if (data.width > data.height) {
                node.width = data.width;
                node.height = fixWidth;
            } else {
                align = "ve";
                node.width = fixWidth;
                node.height = data.height;
            }
            if (!properties.style) {
                properties.style = "patrol";
            }
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
            node.emit(EventDefine.Obstacle.SawChainRun, {
                style: properties.style,
                align
            });
            super.putNode(node);
        })
    }
}

export default ObstacleFactory;