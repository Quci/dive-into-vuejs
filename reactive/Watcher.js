const {parsePath} = require('./parsePath')

module.exports.Watcher = class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get() {
        global.target = this
        let value = this.getter.call(this.vm, this.vm)
        global.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}


