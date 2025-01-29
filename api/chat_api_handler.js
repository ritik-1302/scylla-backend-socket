const {
  saveIncomingMessageToDB,
} = require("../controllers/chat_controller/save_incoming_message_to_db.js");

const chatApiRouter = {
  POST: saveIncomingMessageToDB,
};

const chatApiHandler = async (event, context, callback) => {
  const httpMethod = event.httpMethod;
  const handler = chatApiRouter[httpMethod];
  const res = await handler(event, context, callback);
  return res;
};

module.exports = {
  chatApiHandler
};
