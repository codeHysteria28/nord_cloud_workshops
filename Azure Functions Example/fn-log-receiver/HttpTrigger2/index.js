module.exports = async function (context, req) {
    context.log('Azure Log Analysis Data Collector Function received a request');

    const request = require('request');
    const crypto = require('crypto');

    const workspaceId = req.body.workspaceId;
    const sharedKey = req.body.sharedKey;

    const apiVersion = '2016-04-01';
    const processingDate = new Date().toUTCString();

    const body = JSON.stringify({
        "temperature": Number(req.body.logEntry.temperature),
        "humidity": Number(req.body.logEntry.humidity),
        "timestamp": req.body.logEntry.timestamp
    });

    context.log('Body is: ' + body);

    let contentLength = Buffer.byteLength(body, 'utf8');
    let stringToSign = 'POST\n' + contentLength + '\napplication/json\nx-ms-date:' + processingDate + '\n/api/logs';
    let signature = crypto.createHmac('sha256', new Buffer(sharedKey, 'base64')).update(stringToSign, 'utf-8').digest('base64');
    let authorization = 'SharedKey ' + workspaceId + ':' + signature;

    let headers = {
        "content-type": "application/json", 
        "Authorization": authorization,
        "Log-Type": req.body.type,
        "x-ms-date": processingDate
    }

    context.log( 'Request Headers: ' + JSON.stringify(headers) );

    let url = 'https://' + workspaceId + '.ods.opinsights.azure.com/api/logs?api-version=' + apiVersion;

    request.post({url: url, headers: headers, body: body}, (error, response, body) => {
        context.log('error:', error); 
        context.log('statusCode:', response && response.statusCode); 
        context.log('body:', body);

        context.res = { 'status': response.statusCode, 'body': body }
        context.done();
    });
}