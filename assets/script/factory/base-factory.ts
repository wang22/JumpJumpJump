import Factory from "./factory";

export default class BaseFactory implements Factory {

    nodePool: Array<cc.Node> = []

    build(data: any, parentNode: cc.Node): void { }

    destroyNode(): void {
        if (this.nodePool) {
            this.nodePool.forEach(item => {
                item.destroy();
            })
            this.nodePool = [];
        }
    }

    putNode(node: cc.Node) {
        this.nodePool.push(node);
    }

}
