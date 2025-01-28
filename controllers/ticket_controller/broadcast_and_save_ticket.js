const { device } = require("../../models/device_model.js");
const { ticket } = require("../../models/ticket_model.js");
const {
  broadcastToAllClients,
} = require("../../utils/functions/broadcast_to_all_clients.js");

// eslint-disable-next-line no-unused-vars
const broadcastAndSaveTicket = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const deviceIdentifier = body.deviceIdentifier;
  const ticketType = body.ticketType;

  try {
    console.log("DeviceIdentifier", deviceIdentifier);
    const deviceData = await device.findOne({ identifier: deviceIdentifier });

    if (!deviceData) {
      console.log("Device not found");
      return {
        status: 400,
        body: JSON.stringify({ message: "Device not found" }),
      };
    } else {
      console.log("Device found");
      console.log("Device data", deviceData);
    }
    const deviceId = deviceData._id;
    console.log("DeviceId", deviceId);

    const newTicket = await ticket.create({
      type: ticketType,
      device: deviceId,
      status: "Open",
    });

    const populatedTicket = await ticket
      .findById(newTicket._id)
      .populate("device");

    await broadcastToAllClients({
      tickets: [populatedTicket],
    });

    return {
      status: 200,
      body: JSON.stringify({
        message: "Ticket broadcasted and saved successfully",
      }),
    };
  } catch (err) {
    console.log("Error in broadcasting and saving ticket:", err);
    return {
      status: 500,
      body: JSON.stringify({
        message: "Error in broadcasting and saving ticket",
      }),
    };
  }
};

module.exports = {
  broadcastAndSaveTicket,
};
