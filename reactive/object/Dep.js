module.exports.Dep = class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if(global.target) {
            this.addSub(global.target)
        }
    }

    notify() {
        this.subs.forEach(item => item.update())
    }
}

function remove(arr, item) {
    if(arr.length) {
        const index = arr.indexOf(item)
        if(index > -1) {
            return arr.splice(index, 1)
        }
    }
}