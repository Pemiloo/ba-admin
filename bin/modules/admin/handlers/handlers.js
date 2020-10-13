const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');
const { signup, login, update, remove, find } = require('../repositories/commands/command_model')
const { insertDataAdmin, signinDataAdmin, updateDataAdmin, deleteDataAdmin, findDataAdmin } = require('../repositories/commands/command_handler');

const SigninAdmin = async (req, res) => {

    const validate = validator.isValidPayload(req.body, login);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await signinDataAdmin(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
    };
    sendResponse(await postRequest(validate));

}

const SignupAdmin = async (req, res) => {

    const validate = validator.isValidPayload(req.body, signup);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await insertDataAdmin(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));

}

const UpdateAdmin = async (req, res) => {
    const validate = validator.isValidPayload(req.body, update);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await updateDataAdmin(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));
}

const DeleteAdmin = async (req, res) => {
    const validate = validator.isValidPayload({email : req.params.userId}, remove);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await deleteDataAdmin(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));
}

const FindAdmin = async (req, res) => {
    const validate = validator.isValidPayload(req.body, find);
    const postRequest = async (result) => {
        console.log("\nIni Result : ", result)
        if (result.err) {
            return result;
        }
        const output = await findDataAdmin(result);
        console.log("Ini output : ", output)
        return output;
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result, result.message, 400)
            : wrapper.response(res, 'success', result, result.message, 200);
        console.log("\nIni Result : ", result)

    };
    sendResponse(await postRequest(validate));
}

module.exports = {
    SigninAdmin,
    SignupAdmin,
    UpdateAdmin,
    DeleteAdmin,
    FindAdmin
}
