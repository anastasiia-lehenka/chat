const Joi = require('joi');

const validateUser = data => {
    const regexPattern = /^[a-zA-Z0-9]{3,}$/;

    const schema = {
        username: Joi.string().regex(regexPattern).required(),
        password: Joi.string().regex(regexPattern).required(),
        image: Joi.string()
    };

    const validationResult = Joi.validate(data, schema);
    return validationResult.error && validationResult.error.details[0].message;
};

const validateMessage = data => {
    const regexPattern = /^[a-zA-Z0-9]{3,}$/;

    const schema = {
        author: Joi.string().regex(regexPattern).required(),
        text: Joi.string().min(1).required(),
    };

    const validationResult = Joi.validate(data, schema);
    return validationResult.error && validationResult.error.details[0].message;
};

module.exports = {
    validateUser,
    validateMessage
};
