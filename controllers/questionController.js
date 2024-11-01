const questionService = require("../services/questionService");

exports.createQuestion = async (req, res) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const allquestions = await questionService.getAll();
    res.json(allquestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPrimaryQuestions = async (req, res) => {
  try {
    const primaryQs = await questionService.getPrimary();
    res.status(200).json(primaryQs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIndividualQuestion = async (req, res) => {
  try {
    const indQuestion = await questionService.getIndividualQ(
      req.params.questionId
    );
    res.status(200).json({ message: indQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIndividualQuestionByTitle = async (req, res) => {
  try {
    const indQuestion = await questionService.getIndividualQByTitle(
      req.params.title
    );
    res.status(200).json({ message: indQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updated = await questionService.updateIndividualQuestion(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIndividualQuestion = async (req, res) => {
  try {
    await questionService.delQ(req.params.id);
    res.status(200).json({ message: "question deleted " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteName = async (req, res) => {
  try {
    await questionService.delName(req.params.name);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTitle = async (req, res) => {
  try {
    await questionService.delTitle(req.params.name, req.params.title);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
