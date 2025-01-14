const {sendToClient}=require('../utils/functions/send_to_client.js')


const defaultHandler = async (connectionId, body) => {
    console.log("Default route triggered");
    if (body && body.message) {
        await sendToClient(connectionId, { message: `Echo: ${body.message}` });
    }
};

module.exports = {
    defaultHandler
};