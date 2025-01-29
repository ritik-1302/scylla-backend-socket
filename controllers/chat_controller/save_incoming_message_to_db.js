const { chat } = require("../../models/chat_model.js");
const { device } = require("../../models/device_model.js");

// eslint-disable-next-line no-unused-vars
const saveIncomingMessageToDB = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const deviceIdentifier = body.deviceIdentifier;
  const messageObject = body.messageObject;

  try {
    console.log("DeviceIdentifier", deviceIdentifier);
    const deviceData = await device.findOne({ identifier: deviceIdentifier });
    let deviceID = null;
    //Make a new device if device is not found and store its id
    if (!deviceData) {
      console.log("Device not found");
      const newDevice = await device.create({
        identifier: deviceIdentifier,
        type: "Whatsapp",
      });
      deviceID = newDevice._id;
    } else {
      console.log("Device found", deviceData);
      deviceID = deviceData._id;
    }

    const newChat = await chat.create({
      device: deviceID,
      messageObject: messageObject,
    });

    return {
      status: 200,
      body: JSON.stringify({
        message: "Message saved successfully",
        id:newChat._id
      }),
    };
  } catch (err) {
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