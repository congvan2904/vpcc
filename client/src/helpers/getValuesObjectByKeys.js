const getValuesObjectByKeys = (array, keys) => {
    // return array.map(obj => keys.reduce((acc, key) => [...acc, obj[key]], []));

    // return array.map(obj => keys.reduce((acc, key) => {
    //     if (typeof obj[key] === 'object' && obj[key] !== null) {
    //         return [...acc, ...getValuesObjectByKeys([obj[key]], Object.keys(obj[key]))];
    //     }
    //     return [...acc, obj[key]];
    // }, []));
    return array.map(obj => keys.reduce((acc, key) => {
        if (typeof key === 'string') {
            let value = key.split('.').reduce((o, k) => (o || {})[k], obj);
            return [...acc, value];
        }
        return acc;
    }, []));
}
export default getValuesObjectByKeys