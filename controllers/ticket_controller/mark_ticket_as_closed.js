const { ticket } = require("../../models/ticket_model.js");
const { getAllTickets } = require("./get_all_tickets.js");
const markTicketAsClosed = async (connectionId, body) => {
  console.log("Mark as closed route triggered");
  try {
    const ticketId = body.query.ticket.id;
    const singleTicket = await ticket.findById(ticketId);
    if (!singleTicket) {
      console.log("Ticket not found");
      return;
    }
    singleTicket.status = "Closed";
    await singleTicket.save();
    console.log("Ticket marked as closed successfully");
    await getAllTickets(connectionId, body);
  } catch (err) {
    console.log("Error marking ticket as closed:", err);
  }
};

module.exports = {
  markTicketAsClosed,
};
