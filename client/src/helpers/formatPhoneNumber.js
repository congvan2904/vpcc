const formatPhoneNumber = (number) => {
    if (!number) return number
    const phoneNumber = number.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 5) return phoneNumber
    if (phoneNumberLength < 8) return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`
    return `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 10)}`

}
export default formatPhoneNumber