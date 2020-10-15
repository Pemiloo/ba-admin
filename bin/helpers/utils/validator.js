const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('../../helpers/utils/wrapper');

const isValidPayload = (payload, models) => {
    const { value, error } = joi.validate(payload, models);
    if(!validate.isEmpty(error)){
        return wrapper.error(error, 400);
    }
    return wrapper.data(value, 'success', 200);

};

module.exports = {
    isValidPayload
};
