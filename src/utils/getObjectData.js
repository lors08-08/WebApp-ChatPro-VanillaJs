function getObj(obj, path, defaultValue) {
    const keys = path.split('.')

    let res = obj

    for(let key of keys) {
        res = res[key]

        if(!res) {
            res = undefined
            break;
        }
    }

    return res || defaultValue
}

export default getObj
