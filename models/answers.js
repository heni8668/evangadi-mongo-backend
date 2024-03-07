const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  answers: { type: "string", required: true },
});

const Answer = mongoose.model("answers", answerSchema);

module.exports = Answer;
