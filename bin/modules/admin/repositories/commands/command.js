const request = require('../../../../helpers/utils/httpClient');
const config = require('config')
const Mongo = require('mongooo').Mongooo;
const { save } = require('mongooo').Save;
const { del } = require('mongooo').Delete;
const { find, findOne } = require('mongooo').Find;
const { set } = require('mongooo').Update;
const uuidv4 =  require('uuid').v4;

const mongo = new Mongo();

let con;
(async () => {
    con = await mongo.setup(config.get('mongoDbAdminUrl'), config.get('mongoDbAdmin'), config.get('mongoDbAdminCol'));
})()

const insertData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to insert admin data"
    };
    try{
        const findEmail = await findOne(con, {"email" : payloadData.data.email});

        if(findEmail !== null){
            result.err = true,
            result.message = "Email already exist"
        } else {
            const payloads = {
                ...payloadData.data,
                "insertedAt" : new Date(),
            }

            const roomPayload = {
                "emailAdmin" : payloadData.data.email,
                "nama" : payloadData.data.namaPanitia
            }

            if(await request.sendRequest('POST', config.get('roomEndpoint'), config.get('roomInsertPath'), null, null, roomPayload)){
                const dbResult = await save(con, payloads)
                if(dbResult == false){
                    result.err = true,
                    result.message = "Failed to insert admin data"
                } else{
                    result.err = false,
                    result.message = "Success to insert admin data"
                }
            } else {
                result.err = true,
                result.message = "Failed to insert admin data"
            }

        }
    }catch (e) {
        const tickets = uuidv4();
        result.err = true,
        result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-insertData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    console.log(result)
    return result;
}

const compareData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to signin admin data"
    };
    try{
        const dbResult = await find(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.err = true,
            result.message = "Username or Password was wrong"
        } else {
            result.err = false,
            result.message = "Success to login"
        }
    }catch (e) {
        const tickets = uuidv4();
        result.err = false,
        result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-compareData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    return result;
}

const updateData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to update admin data"
    };
    try{
        const payloads = (payloadData) => {
            delete payloadData.data.findEmail
            const data = {
                ...payloadData.data
            }
            return data
        }

        const roomPayload = {
            "find" : {
                "email" : payloadData.data.findEmail
            },
            "update" : {
                "email" : payloadData.data.email
            }
        }

        if(await request.sendRequest('PUT', config.get('roomEndpoint'), config.get('roomUpdatePath'), null, null, roomPayload)) {
            const dbResult = await set(con, {"email": payloadData.data.findEmail}, payloads(payloadData));
            if (!dbResult) {
                result.err = true,
                result.message = "Failed to update student data"
            } else {
                result.err = false,
                result.message = "Success to update"
            }
        } else {
            result.err = true,
            result.message = "Failed to update student data"
        }

    }catch (e) {
        const tickets = uuidv4();
        result.status = false,
        result.result = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-updateData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    return result;
}

const deleteData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to delete admin data"
    };
    try{
        const dbResult = await del(con, payloadData.data)
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.err = true,
                result.message = "Email not found"
        } else {
            result.err = false,
                result.message = "Success to delete admin ", payloadData.data;
        }
    }catch (e) {
        const tickets = uuidv4;
        result.err = true,
            result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-deleteData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    return result;
}

const findData = async (payloadData) => {
    const result = {
        "err" : true,
        "message" : "Failed to find admin data"
    };
    try{
        const dbResult = await find(con, payloadData.data, {});
        if(dbResult == null || dbResult == undefined || dbResult == ""){
            result.err = true,
                result.message = "Data not found"
        } else {
            result.err = false,
                result.message = dbResult;
        }
    }catch (e) {
        const tickets = uuidv4();
        result.err = true,
            result.message = "Something went wrong"
        result.ticketId = tickets
        new Error(`Error : ${e}, ticketId : ${tickets}`);
        console.log(`command-findData [x] Error : ${e}, \nTicketId : ${tickets}`);
    }
    return result;
}

module.exports = {
    insertData,
    compareData,
    updateData,
    deleteData,
    findData
}
