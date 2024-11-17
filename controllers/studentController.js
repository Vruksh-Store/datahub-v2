const studentService = require("../services/studentService");

exports.createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({ message: student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await studentService.getStudents();
    res.json({ message: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const student = await studentService.getIndividualStudent(id);
    if (!student) {
      res.status(400).json({ message: "student not found" });
    }
    console.log(student);
    res.status(200).json({ message: student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  console.log(req.body);
  try {
    const { registerNo, password } = req.body;
    const student = await studentService.loginStudents(registerNo, password);

    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ message: "Login successful", student, userType: "parent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;
    const updatedStudent = await studentService.resetPwd(phone, newPassword);
    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found or phone number does not match." });
    }
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFee = async (req, res) => {
  const id = req.params.id;
  const { date, amount } = req.body;
  console.log(date, amount, id);
  try {
    const updateFees = await studentService.feesUpdate(id, date, amount);
    if (!updateFees) {
      return res.status(400).json({
        message: "Doesn't updated successfully due to invalid student id",
      });
    }
    res.status(200).json({
      message: updateFees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStudents = async (req, res) => {
  const id = req.params.id;
  const { name, phone, level, registerNo, gender, password } = req.body;
  const updateStudent = await studentService.studentUpdate(
    id,
    name,
    phone,
    level,
    registerNo,
    gender,
    password
  );
  if (!updateStudent) {
    res.status(400).json({ message: "student is not updated with given id" });
  }
  res.status(200).json({ message: updateStudent });
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delStudent = async (req, res) => {
  const id = req.params.id;
  try {
    await studentService.studentDelete(id);
    res.status(200).json({
      message: "student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAssessments = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  try {
    const response = await studentService.getAllAssessments(id);
    res.status(200).json({
      message: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserStudents = async (req, res) => {
  const userId = req.params.id;
  try {
    const students = await studentService.getUserStudents(userId);
    res.json({ message: students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// growth and dev

exports.createGrowthAndDevelopment = async (req, res) => {
  const { id } = req.params;
  const { weight, height, medications, bovelAndSleepHabbits } = req.body;

  try {
    const growthData = { weight, height, medications, bovelAndSleepHabbits };
    console.log(growthData);
    const updatedGrowth = await studentService.createGrowthAndDevelopment(
      id,
      growthData
    );
    res.status(201).json(updatedGrowth);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateGrowthAndDevelopment = async (req, res) => {
  const { id, recordId } = req.params;
  const { weight, height, medications, bovelAndSleepHabbits } = req.body;

  try {
    const growthData = { weight, height, medications, bovelAndSleepHabbits };
    const updatedRecord = await studentService.updateGrowthAndDevelopment(
      id,
      recordId,
      growthData
    );
    res.status(200).json(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGrowthAndDevelopment = async (req, res) => {
  const { id, recordId } = req.params;
  try {
    const result = await studentService.deleteGrowthAndDevelopment(
      id,
      recordId
    );
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
