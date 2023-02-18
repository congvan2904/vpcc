const reverseObj = (obj) => {
    let newArray = []

    Object.keys(obj)
        .sort()
        .reverse()
        .forEach(key => {
            console.log(key)
            newArray.push({
                'key': key,
                'id': obj[key].id
            })
        })

    console.log(newArray)
    return newArray
}
export default reverseObj