const user = require("../models/users");
const question = require("../models/questions");

//create a new question
const addQuestion = async (req, res) => {
  try {
    const { userid, title, description, tag } = req.body;

    const getUser = await user.findOne({ _id: userid });
    const result = getUser._id;

    const newQuestion = new question({
      userid: result,
      title,
      description,
      tag,
    });
    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new question" });
  }
};

//get all questions

const getAllQuestions = async (req, res) => {
  try {
    // Retrieve all questions from the database and populate the 'user' field
    const questions = await question.find().populate("userid", "username");

    // Transform the data to match the desired format
    const transformedQuestions = questions.map((question) => ({
      id: question._id,
      userid: question.userid._id, // Assuming MongoDB generates the ID as "_id"
      title: question.title,
      description: question.description,
      tag: question.tag,
      username: question.userid.username,
    }));

    // Sending the transformed questions as a JSON response
    res.status(200).json(transformedQuestions);
  } catch (error) {
    // Handling errors and sending an error response
    res.status(500).json({ error: "Failed to get questions" });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id; // Assuming the question ID is in the route parameters

    // Retrieve the question from the database and populate the 'userid' field
    const singleQuestion = await question
      .findById(questionId)
      .populate("userid", "username");

    if (!singleQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Transform the data to include the username
    const transformedQuestion = {
      id: singleQuestion._id,
      userid: singleQuestion.userid._id,
      title: singleQuestion.title,
      description: singleQuestion.description,
      tag: singleQuestion.tag,
      username: singleQuestion.userid.username,
    };

    // Sending the transformed question as a JSON response
    res.status(200).json(transformedQuestion);
  } catch (error) {
    // Handling errors and sending an error response
    res.status(500).json({ error: "Failed to get the question" });
  }
};

module.exports = { addQuestion, getAllQuestions, getQuestionById };
