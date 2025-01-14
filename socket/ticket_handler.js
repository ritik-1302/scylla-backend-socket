
// Functions
const {getAllTickets}=require("../controllers/ticket_controller/get_all_tickets.js")
const {markTicketAsClosed}=require("../controllers/ticket_controller/mark_ticket_as_closed.js")
const {defaultFunction}=require("../controllers/ticket_controller/default_function.js")


const ticketRouter = {
  getTickets: getAllTickets,
  markTicketAsClosed:markTicketAsClosed,
  default:defaultFunction,
};




// eslint-disable-next-line no-unused-vars
const ticketHandler = async (connectionId, body) => {
  const requestKey=body.requestName;
  const handler=ticketRouter[requestKey]||ticketRouter['default'];

  await handler(connectionId,body);
};

module.exports = {
  ticketHandler,
};
