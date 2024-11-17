const express = require("express");
const questionController = require("../controllers/questionController");
const checkIfExist = require("../middlewares/checkToken");

const router = express.Router();

// router.use(checkIfExist);

// post reqs
router.post("/", questionController.createQuestion);

router.get("/titles", questionController.getTitles);

// get reqs
router.get("/allquestions", questionController.getAllQuestions);
router.get("/primaryquestions", questionController.getPrimaryQuestions);
router.get("/secondaryquestions", questionController.getSecondaryQuestions);
router.get("/vocationalquestions", questionController.getVocationalQuestions);
router.get(
  "/physiotherapyquestions",
  questionController.getPhysioTherapyQuestions
);
router.get("/templatecase", questionController.getTemplateCaseQuestions);
router.get("/speechlanguage", questionController.getSpeechLanguageQuestions);
router.get("/customquestions/:name", questionController.getCustomQuestions);
router.get("/:questionId", questionController.getIndividualQuestion);
router.get("/category/:title", questionController.getIndividualQuestionByTitle);

// // put reqs
router.put("/", questionController.updateQuestion);

// // delete reqs
router.delete("/:id", questionController.deleteIndividualQuestion);
// delete every question which has {name : primary}
router.delete("/name/:name", questionController.deleteName);
// delete every question which has {title : eating | toileting | brushing etc...}
router.delete("/:name/:title", questionController.deleteTitle);

// get titles

module.exports = router;
