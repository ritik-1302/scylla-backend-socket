const mongoose = require("mongoose");
// eslint-disable-next-line no-unused-vars
const { device } = require("./device_model.js");
const ticketSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Housekeeping", "Food", "Other"],
    },

    device: {
      type: mongoose.Schema.ObjectId,
      ref: "device",
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    message: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const ticket = mongoose.model("ticket", ticketSchema);

module.exports = {
  ticket,
};
