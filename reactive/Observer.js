const {Dep} = require('./Dep')

const arrayProto = Object.create(Array.prototype)
const arrayMethods = arrayProto
;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
  const original = arrayProto[method]
  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      const ob = this.__ob__
      let result = original.apply(this, args)
      ob.dep.notify()
      return result
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}

class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  observeArray(items) {
    for(let item of items) {
      observe(item)
    }
  }

  walk(obj) {
    for (let [key, value] of Object.entries(obj)) {
      defineReactive(obj, key, value)
    }
  }
}

function defineReactive(obj, key, val) {
  let childOb = observe(val)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      dep.depend()
      if(childOb) {
        childOb.dep.depend()
      }
      return val
    },
    set(newValue) {
      if (newValue === val) {
        return
      }
      val = newValue
      dep.notify()
    }
  })
}

function observe(value, asRootData) {
  if(typeof value !== 'object') {
    return
  }
  let ob
  if(Object.hasOwnProperty.call(value, '__ob__') && value.__ob__ instanceof Observer ) {
    return value.__ob__
  }else {
    ob = new Observer(value)
  }
  return ob
}

module.exports.Observer = Observer
