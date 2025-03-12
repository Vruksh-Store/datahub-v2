const assessmentService = require("../services/dashboardService");

exports.getAssessmentsByModel = async (req, res) => {
  try {
    const { model, staffId } = req.params;
    if (!model || !staffId) {
      return res
        .status(400)
        .json({ message: "Model and staffId are required" });
    }

    const assessments = await assessmentService.fetchAssessments(
      model,
      staffId
    );
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
