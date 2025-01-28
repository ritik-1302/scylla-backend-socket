const {broadcastAndSaveTicket}=require("../controllers/ticket_controller/broadcast_and_save_ticket.js")

const ticketApiRouter={
    POST:broadcastAndSaveTicket
}

const ticketApiHandler  =async(event,context,callback)=>{
    const httpMethod=event.httpMethod;
    const handler=ticketApiRouter[httpMethod];
    const res=await handler(event,context,callback);
    return res;

}


module.exports={
    ticketApiHandler
}
