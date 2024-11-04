const express = require("express");
const router = express.Router();
const homeProgramController = require("../controllers/homeProgramController");

router.post("/programs", homeProgramController.createHomeProgram);
router.get("/programs", homeProgramController.getAllHomePrograms);
router.get("/programs/id", homeProgramController.getSpecified);
router.get(
  "/programs/student/:studentId",
  homeProgramController.getHomeProgramsByStudent
);
router.put("/programs/:id", homeProgramController.updateHomeProgram);
router.delete("/programs/:id", homeProgramController.deleteHomeProgram);

module.exports = router;
