const formatContractId = (number) => {
    if (!number) return number
    const phoneNumber = number.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    // if (phoneNumberLength < 8) return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`
    return `${phoneNumber.slice(0, 3)}.${phoneNumber.slice(3, 5)}`

}
export default formatContractId