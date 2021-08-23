const joi = require("joi");

// Middleware for verfying the signup Data
const signupValidation = (req, res, next) => {
    // JOI validation object
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });

    // Validating Data and extracting the errors
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // If no error
    next();
};

const loginValidation = (req, res, next) => {
    // JOI validation object
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
    });

    // Validating Data while signing in the user and extracting errors
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // If no error
    next();
};

module.exports = { signupValidation, loginValidation };
