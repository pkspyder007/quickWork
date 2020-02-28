const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GigSchema = new Schema({
  userTid: {
    type: Array,
    default: []
  },
  gigID: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Gig", GigSchema);
