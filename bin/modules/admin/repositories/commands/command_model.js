const joi = require('joi');

const login = joi.object({
    email: joi.string().email({ tlds: { allow: true } }).required(),
    password: joi.string().required(),
});

const signup = joi.object({
    email: joi.string().email({tlds: {allow: true}}).required(),
    password: joi.string().required(),
    linkPhoto: joi.string().required(),
    title : joi.string().required(),
    namaPanitia : joi.array().required()
});

const update = joi.object({
    findEmail: joi.string().email({tlds: {allow: true}}).required(),
    email: joi.string().email({tlds: {allow: true}}).optional(),
    password: joi.string().optional(),
    linkPhoto: joi.string().optional(),
    title : joi.string().optional(),
    namaPanitia : joi.array().optional()
});

const find = joi.object({
    email: joi.string().email({tlds: {allow: true}}).optional(),
    password: joi.string().optional(),
    linkPhoto: joi.string().optional(),
    title : joi.string().optional(),
    namaPanitia : joi.array().optional()
})

const remove = joi.object({
    email : joi.string().email({tlds: {allow: true}}).required()
})

module.exports = {
    login,
    signup,
    update,
    find,
    remove
};
