const { webClient } = require("../models/web_client_model.js");

// eslint-disable-next-line no-unused-vars
const disconnectHandler = async (connectionId, body) => {
  console.log(`Connection closed: ${connectionId}`);

  try {
    await webClient.deleteOne({ connectionId: connectionId });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  disconnectHandler,
};
