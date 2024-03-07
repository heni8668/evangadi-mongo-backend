const express = require("express");
const {
  addQuestion,
  getAllQuestions,
  getQuestionById,
} = require("../controllers/questionController");

const router = express.Router();

//register routes
router.post("/askquestion", addQuestion);
router.get("/allquestions", getAllQuestions);
router.get("/singlequestion/:id", getQuestionById);
module.exports = router;
