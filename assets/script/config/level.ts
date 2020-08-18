// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const {ccclass, property} = cc._decorator;

// @ccclass
// export default class NewClass extends cc.Component {


// }

class Ground {
    rotation: number
}

class Props {
    type: string // key, gems
    position: number
}

class Obstacle {
    type: string // 
    position: number // 
}

class Door {
    type: string // yellow, orange, gren, blue, normal
    position: number
}

class MapConfig {
    theme: string // autumn | desert | forest | green
    grounds: Array<Ground>
    direction: string // left | right
    props: Array<Props>
    obstacles: Array<Obstacle>
    doors: Array<Door>
}

const ground = new Ground();
ground.rotation = -3;

const map = new MapConfig();
map.theme = "autumn"
map.grounds = [ground]

export default map;