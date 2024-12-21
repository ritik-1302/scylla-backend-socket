const {sendToClient}=require('./send_to_client.js');
const { webClient}=require('../../models/web_client_model.js');

const broadcastToAllClients=async(message)=>{
    let clientIdList=[];
    try{
        clientIdList=await webClient.find({});

    }catch(err){
        console.log(err);
    }

    for (const clientId of clientIdList) {
        await sendToClient(clientId['connectionId'], message);
    }
}

module.exports={
    broadcastToAllClients
}