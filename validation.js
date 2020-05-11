const Joi = require('joi');

const validate = data => {
    const regexPattern = /^[a-zA-Z0-9]{3,}$/;

    const schema = {
        username: Joi.string().regex(regexPattern).required(),
        password: Joi.string().regex(regexPattern).required(),
        image: Joi.string()
    };

    const validationResult = Joi.validate(data, schema);
    return validationResult.error && validationResult.error.details[0].message;
};

module.exports = validate;
