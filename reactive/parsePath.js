module.exports.parsePath = parserPath

const bailRE = /[^\w.$]/

function parserPath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segment = path.split('.')
    return obj => segment.reduce((accu, curr) => accu[curr], obj)
}
