const { webClient } = require('../models/web_client_model.js');
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const connectHandler = async (connectionId, body) => {
    console.log(`New connection attempted: ${connectionId}`);
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) { // 1 means connected
        console.log("MongoDB is not connected. Socket will not be established.");
        return;
    }

    try {
        await webClient.create({ connectionId: connectionId });
        console.log(`Connection added to MongoDB: ${connectionId}`);
        // Optionally, send a message to the client
        // await sendToClient(connectionId, { message: "Connected successfully!" });
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
};

module.exports = {
    connectHandler
};