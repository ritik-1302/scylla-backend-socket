const { ticket } = require("../models/ticket_model.js");
const { sendToClient } = require("../utils/functions/send_to_client.js");

// eslint-disable-next-line no-unused-vars
const getTicketsHandler = async (connectionId, body) => {
  console.log("Get Tickets route triggered");
  try {
    // find the tickets whose status are open or that are created today

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const tickets = await ticket
      .find({
        $or: [
          { status: "Open" },
          { createdAt: { $gte: today } }, // Tickets created today
        ],
      })
      .sort({ createdAt: -1 })
      .populate("device");

    console.log("Tickets fetched successfully:", tickets);
    await sendToClient(connectionId, {
      tickets: tickets,
    });
  } catch (err) {
    console.log("Error fetching tickets:", err);
  }
};

module.exports = {
  getTicketsHandler,
};
