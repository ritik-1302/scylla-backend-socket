const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.ObjectId,
      ref: "device",
      required:true
    },
    messageObject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chat = mongoose.model("chat", chatSchema);

module.exports = {
  chat,
};
