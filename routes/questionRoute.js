const express = require("express");
const questionController = require("../controllers/questionController");
const checkIfExist = require("../middlewares/checkToken");

const router = express.Router();

router.use(checkIfExist);

// post reqs
router.post("/", questionController.createQuestion);

// get reqs
router.get("/allquestions", questionController.getAllQuestions);
router.get("/primaryquestions", questionController.getPrimaryQuestions);
router.get("/:questionId", questionController.getIndividualQuestion);
router.get("/category/:title", questionController.getIndividualQuestionByTitle);

// // put reqs
router.put("/:id", questionController.updateQuestion);

// // delete reqs
router.delete("/:id", questionController.deleteIndividualQuestion);
// delete every question which has {name : primary}
router.delete("/name/:name", questionController.deleteName);
// delete every question which has {title : eating | toileting | brushing etc...}
router.delete("/:name/:title", questionController.deleteTitle);

module.exports = router;
