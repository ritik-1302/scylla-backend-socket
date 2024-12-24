const mongoose = require("mongoose");

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
  },
  { timeStamps: true }
);

const ticket = mongoose.model("ticket", ticketSchema);

module.exports = {
  ticket,
};
