const {
  sendMessage,
} = require("../controllers/chat_controller/send_message.js");

const chatRouter = {
  send: sendMessage,
};

const chatHandler = async (connectionId, body) => {
  const requestKey = body.requestName;
  const handler = chatRouter[requestKey] || chatRouter["default"];

  await handler(connectionId, body);
};

module.exports = {
  chatHandler,
};
