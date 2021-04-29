const {defineReactive} = require('./defineReactive')
const {Watcher} = require('./Watcher')
const vm = {}
vm.foo = {}
defineReactive(vm.foo, 'a', 'sdf')

new Watcher(vm, 'foo.a', function (val, prevVal){
    console.log('vvv', this)
    console.log('val', val)
    console.log('prevVal', prevVal)
})

vm.foo.a = 444

