const axios = require('axios');

function sendRequest (method, baseUrl, route, params, headers, body) {
    return new Promise((resolve, reject) => {
        const requestTimestamp = new Date();
        axios.request({
            method: method,
            url: baseUrl + route,
            data: body,
            params: params,
            headers: headers
        }).then(async (result) => {
            const apiLog = {
                url: baseUrl,
                path: route,
                method: method,
                requestData: body,
                requestTime: requestTimestamp,
                responseStatus: result.statusText,
                responseCode: result.status,
                responseData: result.data || null,
                responseTime: new Date()
            };
            resolve(result.data);
        }).catch(async (error) => {
            const apiLog = {
                url: baseUrl,
                path: route,
                method: method,
                requestData: body,
                requestTime: requestTimestamp,
                responseStatus: error.response.statusText,
                responseCode: error.response.status,
                responseData: error.response.data || null,
                responseTime: new Date()
            };
            reject(error.response);
        });
    })
}

module.exports = { sendRequest };
