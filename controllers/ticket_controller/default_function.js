const { sendToClient } = require("../../utils/functions/send_to_client.js");

// eslint-disable-next-line no-unused-vars
const defaultFunction = async (connectionId, body) => {
  console.log("Default route triggered");
  await sendToClient(connectionId, {
    message: "Invalid request",
  });
};

module.exports = {
  defaultFunction,
};
