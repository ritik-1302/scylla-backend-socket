const mongoose = require("mongoose");

const webClientSchema = mongoose.Schema({
  connectionId: {
    type: String,
    unique: true,
    required: true,
  },
});

const webClient = mongoose.model("webClient", webClientSchema);

module.exports = {
  webClient,
};
