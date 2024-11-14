const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const studentRoutes = require("./routes/studentRoute.js");
const adminRoutes = require("./routes/adminRoute.js");
const authRoutes = require("./routes/authRoute.js");
const assessmentRoutes = require("./routes/assessmentRoute.js");
const questionRoutes = require("./routes/questionRoute.js");
const homeProgramRoutes = require("./routes/homeProgramRoute.js");
const cors = require("cors");
const customAssessmentRoutes = require("./routes/customAssessmentRoute.js");
const dashboardRoutes = require("./routes/dashboard.js");
const activityRoutes = require("./routes/activity.js");

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  options: "*",
};

app.use(cors(corsOptions));

app.get("/api/cron", async (req, res) => {
  res
    .json({
      message: "Cron Waked",
    })
    .status(200);
});

app.use("/api/students", studentRoutes);

app.get("/load", async (req, res) => {
  try {
    const result = await Staff.insertMany(staff);
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.json({ msg: error.message });
  }
});

// admin & staff route
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// assessments-routes
app.use("/api/primary-assessments", assessmentRoutes);
app.use("/api/secondary-assessments", assessmentRoutes);
app.use("/api/vocational-assessments", assessmentRoutes);
app.use("/api/physiotherapy-assessments", assessmentRoutes);
app.use("/api/custom-assessments", assessmentRoutes);

app.use("/api/all-assessments", assessmentRoutes);

// added a unique constrains to fix duplication data - only one child can have one template
// and speech profile - fixed ✅
app.use("/api/templatecase", assessmentRoutes);
app.use("/api/speechlanguage", assessmentRoutes);

// question-route
app.use("/api/questions", questionRoutes);

// home
app.use("/api/home", homeProgramRoutes);

app.use("/api/custom", customAssessmentRoutes);

//dashboard
app.use("/api/dashboard", dashboardRoutes);

//activity
app.use("/api/activity", activityRoutes);

console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
