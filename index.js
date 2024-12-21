


//Route Handler imports 
const {connectHandler}=require('./routes/connect_handler.js');
const {disconnectHandler}=require('./routes/disconnect_handler.js');
const {defaultHandler}=require('./routes/default_handler.js');

//Functions
const {connectDB}=require('./utils/functions/db_connection.js');


 connectDB();

const routeHandlers = {
    '$connect': connectHandler,
    '$disconnect': disconnectHandler,
    '$default': defaultHandler,
};


module.exports.handler = async (event) => {
    if (event.requestContext) {
        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        let body = {};

        try {
            if (event.body) {
                body = JSON.parse(event.body);
            }
        } catch (err) {
            console.log("Error parsing body:", err);
            return { statusCode: 400, body: JSON.stringify({ message: "Invalid body format" }) };
        }

        // Handle different routeKeys (WebSocket events)
      const handler=routeHandlers[routeKey]||routeHandlers['$default'];

      await handler(connectionId,body);
    }
    return { statusCode: 200 };
};


