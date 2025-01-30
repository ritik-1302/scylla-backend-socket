const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    devices: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "device",
        required: true,
      },
    ],
    chats: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "chat",
      },
    ],
    isStaying: {
      type: Boolean,
      default: false,
      required: true,
    },
    isRequestingSupport: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const customer = mongoose.model("customer", customerSchema);

module.exports = {
  customer
};
