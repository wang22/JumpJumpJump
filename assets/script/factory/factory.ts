interface Factory {
    build(data: any, parentNode: cc.Node): void
    destroyNode(): void
}

export default Factory