const question = require("../models/questions");
const answer = require("../models/answers");

// Create a new answer for a question
const addAnswer = async (req, res) => {
  try {
    const { questionid, userid, answers } = req.body;

    // Check if the question exists
    const existingQuestion = await question.findById(questionid);
    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Create a new answer for the question
    const newAnswer = new answer({
      questionid,
      userid,
      answers,
    });

    await newAnswer.save();
    res.status(201).json({ message: "Answer created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new answer" });
  }
};

// Get all answers for a specific question
const getAnswersForQuestion = async (req, res) => {
  try {
    const { questionid } = req.params;
    // console.log(questionid);

    // Retrieve all answers for the question and populate the 'userid' field
    const answers = await answer
      .find({ questionid })
      .populate("userid", "username");

    // Sending the answers as a JSON response
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: "Failed to get answers" });
  }
};

module.exports = {
  addAnswer,
  getAnswersForQuestion,
};
