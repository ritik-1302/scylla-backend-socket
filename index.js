//Socket Handler imports
const { connectHandler } = require("./socket/connect_handler.js");
const { disconnectHandler } = require("./socket/disconnect_handler.js");
const { defaultHandler } = require("./socket/default_handler.js");
const { broadcast_handler } = require("./socket/broadcast_handler.js");
const { ticketHandler } = require("./socket/ticket_handler.js");
const {chatHandler}=require("./socket/chat_handler.js")

//REST api Handler Imports
const { testHandler } = require("./api/test_handler.js");
const { ticketApiHandler } = require("./api/ticket_api_handler.js");
const {chatApiHandler}=require("./api/chat_api_handler.js")
//Functions
const { connectDB } = require("./utils/functions/db_connection.js");

const socketRouter = {
  $connect: connectHandler,
  $disconnect: disconnectHandler,
  $default: defaultHandler,
  broadcast: broadcast_handler,
  ticket: ticketHandler,
  chat:chatHandler
};
const apiRouter = {
  "/test": testHandler,
  "/ticket":ticketApiHandler,
  "/chat":chatApiHandler

};

module.exports.handler = async (event,context,callback) => {
  await connectDB();

  console.log("This is event ", event);

  if (event.httpMethod) {
    const path = event.path;
    console.log("Request body", event.body);
    console.log("api path", path);

    const handler = apiRouter[path];

    const res=await handler(event,context,callback);

    return res;

  } else {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    let body = {};

    try {
      if (event.body) {
        body = JSON.parse(event.body);
      }
    } catch (err) {
      console.log("Error parsing body:", err);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid body format" }),
      };
    }
    console.log("Request body", body);
    console.log("Route key", routeKey);

    // Handle different routeKeys (WebSocket events)
    const handler = socketRouter[routeKey] || socketRouter["$default"];

    await handler(connectionId, body);
    return { statusCode: 200 };

  }
};
