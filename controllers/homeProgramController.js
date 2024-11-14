const homeProgramService = require("../services/homeProgramService");

async function createHomeProgram(req, res) {
  try {
    const homeProgram = await homeProgramService.createHomeProgram(req.body);
    res.status(201).json(homeProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllHomePrograms(req, res) {
  try {
    const programs = await homeProgramService.getAllHomePrograms();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getSpecified(req, res) {
  try {
    const { id } = req.params;
    const specificProgram = await homeProgramService.getSpecificProgram(id);
    res.status(200).json(specificProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getHomeProgramsByStudent(req, res) {
  try {
    const { studentId } = req.params;
    let programs = await homeProgramService.getHomeProgramsByStudent(studentId);
    programs = programs.reverse();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateHomeProgram(req, res) {
  try {
    const { id } = req.params;
    const { updatedExercises, editing } = req.body;
    let updatedProgram;
    if (updatedExercises && !editing) {
      console.log("control reacher");
      updatedProgram = await homeProgramService.updateHomeProgram(
        id,
        updatedExercises
      );
    } else if (editing) {
      console.log(req.body);
      updatedProgram = await homeProgramService.updateHomeProgramFull(
        id,
        req.body
      );
    } else {
      updatedProgram = await homeProgramService.updateHomeProgramReview(
        id,
        req.body
      );
    }
    console.log("first", updatedProgram);
    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteHomeProgram(req, res) {
  try {
    const { id } = req.params;
    await homeProgramService.deleteHomeProgram(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createHomeProgram,
  getAllHomePrograms,
  getHomeProgramsByStudent,
  updateHomeProgram,
  deleteHomeProgram,
  getSpecified,
};
