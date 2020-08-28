interface IObject {
    buildObject(data: any): void
}

class ObjectFactory {

    factoryMap: any = {}

    build(name: string, data: any) {
        if (this.factoryMap[name]) {
            this.factoryMap[name].buildObject(data)
        }
    }

    addFactory(name: string, factory: IObject) {
        this.factoryMap[name] = factory
    }
}

export {
    IObject,
    ObjectFactory
}