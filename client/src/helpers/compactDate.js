const compactDate = (date) => {
    const compact = new Date(date)

    return `${compact.getFullYear()}-${compact.getMonth() + 1}-${compact.getDate()}`
}
export default compactDate