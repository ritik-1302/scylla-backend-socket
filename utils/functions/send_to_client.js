
const AWS = require('aws-sdk');
const { webSocketEndpoint } = require("../baseURL.js");
const { webClient}=require('../../models/web_client_model.js')



const client = new AWS.ApiGatewayManagementApi({ endpoint: webSocketEndpoint });


const sendToClient = async (connectionId, message) => {
    try {
        await client.postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify(message),
        }).promise();
    } catch (err) {
        console.log(`Error sending message to ${connectionId}:`, err);
        if (err.statusCode === 410) {
            console.log(`Connection ${connectionId} is no longer valid`);
            try{
                await webClient.deleteOne({ connectionId:connectionId });
                
            }catch(err){
                console.log(err);
            }
        }
    }
};

module.exports={
    sendToClient
}