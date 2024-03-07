const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  tag: { type: "string" },
});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
