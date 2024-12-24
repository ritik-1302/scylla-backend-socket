const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Alexa", "Whatsapp"],
  },
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: "guest",
  },
});

const device = mongoose.model("device", deviceSchema);

module.exports = {
  device,
};
