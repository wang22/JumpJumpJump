/**
 * 计算工具类
 */

const row = 240;
let col = 0;
let isInit = false;

/**
 * 根据屏幕，计算长度
 * @param size 长度，支持使用百分比
 */
function calcSize(size: number | string): number {
    if (!isInit) {
        col = cc.winSize.width / row;
    }
    if ((<string>size).trim !== undefined) {
        return col * (row * (parseInt((<string>size)) * 0.01));
    } else {
        return col * (<number>size);
    }
}

function resize(width: number | string, height: number | string, node: cc.Node) {
    node.width = calcSize(width);
    node.height = calcSize(height);
    const collider = node.getComponent(cc.PhysicsBoxCollider);
    if (collider) {
        collider.size.width = node.width;
        collider.size.height = node.height;
        collider.offset.x = Math.ceil(node.width / 2);
        collider.offset.y = Math.ceil(node.height / 2 + 1);
    }
}

export {
    calcSize,
    resize
}