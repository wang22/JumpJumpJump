import Factory from './factory';
import GroundFactory from './ground-factory';
import PlayerFactory from './player-factory';
import ObstacleFactory from './obstacle-factory';

class PrefabFactory {
    factoryMap: Map<string, Factory> = new Map();

    constructor() {
        this.factoryMap.set("ground", new GroundFactory());
        this.factoryMap.set("player", new PlayerFactory());
        this.factoryMap.set("obstacle", new ObstacleFactory());
    }

    
    build(name: string, data: any, parentNode: cc.Node): void {
        const factory = this.factoryMap.get(name);
        if (factory) {
            factory.build(data, parentNode);
        }
    }
}

export default PrefabFactory