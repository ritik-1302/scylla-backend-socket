const { ticket } = require("../models/ticket_model.js");
const { sendToClient } = require("../utils/functions/send_to_client.js");

// eslint-disable-next-line no-unused-vars
const getTicketsHandler = async (connectionId, body) => {
  console.log("Get Tickets route triggered");
  try {
    const tickets = await ticket
      .find({ status: "Open" })
      .sort({ createdAt: -1 })
      .populate("device");

    console.log("Tickets fetched successfully:", tickets);
    await sendToClient(connectionId, {tickets: tickets });
  } catch (err) {
    console.log("Error fetching tickets:", err);
  }
  //sendToClient(connectionId,{tickets:tickets});
};

module.exports = {
  getTicketsHandler,
};
