const command = require('./command');

const insertDataAdmin = (payloadDataSignup) => {
    return command.insertData(payloadDataSignup);
}

const signinDataAdmin = (payloadDataSignup) => {
    return command.compareData(payloadDataSignup)
}

const updateDataAdmin = (payloadDataUpdate) =>{
    return command.updateData(payloadDataUpdate)
}

const deleteDataAdmin = (payloadDataDelete) => {
    return command.deleteData(payloadDataDelete)
}

const findDataAdmin = (payloadDataFind) => {
    return command.findData(payloadDataFind)
}

module.exports = {
    insertDataAdmin,
    signinDataAdmin,
    updateDataAdmin,
    deleteDataAdmin,
    findDataAdmin
}
