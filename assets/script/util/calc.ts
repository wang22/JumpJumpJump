/**
 * 计算工具类
 */

const xRow = 240;
let xCol = 0;
const yRow = 120;
let yCol = 0;
let isInit = false;

/**
 * 根据屏幕，计算长度
 * @param size 长度，支持使用百分比
 */
function calcSize(size: number | string, coor: string): number {
    if (!isInit) {
        xCol = cc.winSize.width / xRow;
        yCol = cc.winSize.width / xRow;
    }
    if (coor === "x") {
        if ((<string>size).trim !== undefined) {
            return xCol * (xRow * (parseInt((<string>size)) * 0.01));
        } else {
            return xCol * (<number>size);
        }   
    } else {
        if ((<string>size).trim !== undefined) {
            return yCol * (yRow * (parseInt((<string>size)) * 0.01));
        } else {
            return yCol * (<number>size);
        }
    }
}

function resize(width: number | string, height: number | string, node: cc.Node) {
    if (width !== -1) {
        node.width = calcSize(width, "x");
    }
    if (height !== -1) {
        node.height = calcSize(height, "y");
    }
    const collider = node.getComponent(cc.PhysicsBoxCollider);
    if (collider) {
        collider.size.width = node.width;
        collider.size.height = node.height;
        collider.offset.x = Math.ceil(node.width / 2);
        collider.offset.y = Math.ceil(node.height / 2 + 1);
        collider.apply();
    }
}

export {
    calcSize,
    resize
}