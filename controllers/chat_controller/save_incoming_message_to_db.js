const { chat } = require("../../models/chat_model.js");
const { device } = require("../../models/device_model.js");
const { customer } = require("../../models/customer_model.js");
const {
  broadcastToAllClients,
} = require("../../utils/functions/broadcast_to_all_clients.js");

const mongoose = require("mongoose"); // Make sure mongoose is imported

// eslint-disable-next-line no-unused-vars
const saveIncomingMessageToDB = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const deviceIdentifier = body.deviceIdentifier;
  const messageObject = body.messageObject;

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log("DeviceIdentifier", deviceIdentifier);
    let deviceID = null;
    let customerID = null;

    // Find device or create a new one within the transaction
    const deviceData = await device
      .findOne({ identifier: deviceIdentifier })
      .session(session);
    if (!deviceData) {
      console.log("Device not found");
      const newDevice = await device.create(
        [{ identifier: deviceIdentifier, type: "Whatsapp" }],
        { session }
      );
      deviceID = newDevice[0]._id; // Since create() returns an array
    } else {
      console.log("Device found", deviceData);
      deviceID = deviceData._id;
    }

    // Find customer or create a new one within the transaction
    const customerData = await customer
      .findOne({ devices: deviceID })
      .session(session);
    if (!customerData) {
      const newCustomer = await customer.create(
        [
          {
            devices: [deviceID],
            isStaying: false,
            isRequestingSupport: false,
          },
        ],
        { session }
      );
      customerID = newCustomer[0]._id;
    } else {
      customerID = customerData._id;
    }

    // Create and save the chat message within the transaction
    const newChat = await chat.create(
      [
        {
          device: deviceID,
          messageObject: messageObject,
        },
      ],
      { session }
    );

    // Update the customer with the new chat reference
    await customer.findByIdAndUpdate(
      customerID,
      {
        $push: {
          chats: newChat[0]._id,
        },
      },
      { session }
    );

    // Populate the chat data before broadcasting
    const populatedChat = await chat
      .findById(newChat[0]._id)
      .populate("device")
      .session(session);

    // Broadcast to all clients (this is outside the transaction)
    await broadcastToAllClients({
      chats: [populatedChat],
    });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return {
      status: 200,
      body: JSON.stringify({
        message: "Message saved successfully",
        id: newChat[0]._id,
      }),
    };
  } catch (err) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    console.log("Error in saving message to DB", err);
    return {
      status: 500,
      body: JSON.stringify({
        message: "Error in saving message to DB",
      }),
    };
  }
};

module.exports = {
  saveIncomingMessageToDB,
};
