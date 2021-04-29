const {Observer} = require('../Observer')
const {Watcher} = require('../Watcher')

let vm = {}
vm.bar = new Observer({a: 123, d: 444, f: {z: 55, x: 76}})

new Watcher(vm, 'bar.value.a', function (newValue, value) {
    console.log(newValue);
    console.log(value);
})

vm.bar.value.a = 555