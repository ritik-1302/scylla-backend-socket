const {webClient}=require('../models/web_client_model.js');


// eslint-disable-next-line no-unused-vars
const connectHandler = async (connectionId,body) => {

    
    console.log(`New connection established: ${connectionId}`);
    try{
        webClient.create({connectionId:connectionId});
    }catch(err){
        console.log(err);
    }
    // await sendToClient(connectionId, { message: "Connected successfully!" });
};


module.exports={
    connectHandler
}