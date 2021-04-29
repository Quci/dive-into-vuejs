const {Dep} = require('./Dep')


class Observer {
    constructor(value) {
        this.value = value
        if (!Array.isArray(value)) {
            this.walk(value)
        }
    }

    walk(obj) {
        for (let [key, value] of Object.entries(obj)) {
            defineReactive(obj, key, value)
        }
    }
}

function defineReactive(obj, key, value) {
    if (typeof value === 'object') {
        new Observer(value)
        // for(let [key, v] of Object.entries(value)) {
        //     defineReactive(obj, key, v)
        // }
    }

    let dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            dep.depend()
            return value
        },
        set(newValue) {
            if (newValue === value) {
                return
            }
            value = newValue
            dep.notify()
        }
    })
}

module.exports.Observer = Observer