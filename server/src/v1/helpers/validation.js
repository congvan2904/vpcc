const Joi = require('joi')

const userValidate = data => {
    const userSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(1).required(),
        fullname: Joi.string(),
        phonenumber: Joi.string(),
        email: Joi.string().lowercase().email(),
        role: Joi.string(),
        position: Joi.string(),
        imagepath: Joi.string(),
        note: Joi.string()
    })
    return userSchema.validate(data)
}

module.exports = {
    userValidate
}