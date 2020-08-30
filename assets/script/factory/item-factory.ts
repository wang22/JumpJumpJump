import Factory from './factory';

class ItemFactory implements Factory {
    build(data: any, parentNode: cc.Node): void {
        const properties = data.properties;
        if (properties.type === "apple") {
            this.buildApple(data, parentNode);
        }
    }

    buildApple(data: any, parentNode: cc.Node) {
        cc.resources.load("prefab/item/apple", (err: Error, prefab: cc.Prefab) => {
            const node = cc.instantiate(prefab);
            node.width = data.width;
            node.height = data.height;
            node.setPosition(data.x, data.y);
            node.parent = parentNode;
        })
    }
}

export default ItemFactory;