const addDotNumber = (number) => {

    const phoneNumber = `${number}`
    let phoneNumberLength = phoneNumber.length
    // console.log('length----', phoneNumberLength)
    if (phoneNumberLength < 4) return phoneNumber

    if (phoneNumberLength > 5) {
        phoneNumberLength = 5
        return `${phoneNumber.slice(0, phoneNumberLength - 3)}.${phoneNumber.slice(phoneNumberLength - 3, 5)}`
    }
    return `${phoneNumber.slice(0, phoneNumberLength - 3)}.${phoneNumber.slice(phoneNumberLength - 3, 5)}`


}
export default addDotNumber