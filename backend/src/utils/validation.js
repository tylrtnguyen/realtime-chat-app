import Joi from '@hapi/joi'


export const registerValidation = (userInput) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(userInput);
}


export const loginValidation = (userInput) => {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(userInput);
}