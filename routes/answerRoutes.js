const express = require("express");
const {
  addAnswer,
  getAnswersForQuestion,
} = require("../controllers/answerController");

const router = express.Router();

//register routes
router.post("/addanswer", addAnswer);
// router.get("/allquestions", getAllQuestions);
router.get("/allanswers/:questionid", getAnswersForQuestion);
module.exports = router;
