const removeDotNumber = (number) => {
    const lengthNumber = number.length;
    if (lengthNumber < 4) return number
    const numberToString = `${number}`
    const numberResult = numberToString.replace('.', '')
    return +numberResult
}
export default removeDotNumber