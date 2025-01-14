const {broadcastToAllClients}=require('../utils/functions/broadcast_to_all_clients.js')

const broadcast_handler=async(connectionId,body)=>{
    console.log("Broadcast route triggered");
    if (body && body.message) {
        await broadcastToAllClients({ message: `Broadcast: ${body.message}` });
    

}
}

module.exports={broadcast_handler};