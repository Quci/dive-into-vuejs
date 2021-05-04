const {Observer} = require('../Observer')
const {Watcher} = require('../Watcher')

let obj = {}
// obj.bar ={a: [1,2,3], d: 444, f: {z: 55, x: 76}}
obj.arr = [0,1,2,3]

const vm = new Observer(obj)

new Watcher(vm.value, 'arr', function (newValue, value) {
    console.log('newValue', newValue);
    console.log('value', value);
})

vm.value.arr.push(22222)
