const { whatsappServerEndpoint } = require("../../utils/baseURL.js");

const sendMessage = async (connectionId, body) => {
  console.log("Send Message route triggerd");
  try {
    await fetch(whatsappServerEndpoint + "/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: body.query,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  } catch (err) {
    console.log("Error in sending message:", err);
  }
};

module.exports = {
  sendMessage,
};
