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
const students = require("./data/students.js");
const studentService = require("./services/studentService.js");
const teachingLearningMaterialRoutes = require('./routes/teachingLearningMaterialRoutes');
const workSpaceRoutes = require("./routes/workSpaceRoute.js");
const staffMeetingRoutes = require('./routes/staffMeetingRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  options: "*",
};

app.use(cors(corsOptions));

app.get("/api/cron", async (req, res) => {
  console.log('app waked');
  res.send('k')
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
app.use("/api/selfhelp-assessments", assessmentRoutes);

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

// wokspace
app.use("/api/workspace", workSpaceRoutes);

app.use('/api/teaching-learning-materials', teachingLearningMaterialRoutes);

app.use('/api/staff-meetings', staffMeetingRoutes);



// const syncModels = async () => {
//   console.log("Synchronizing models with the database...");

//   try {
//     // Define the schema sync configurations here
//     const syncConfigurations = {
//       Question: {
//         fields: {
//           branch: [
//             "primary",
//             "secondary",
//             "vocational",
//             "custom",
//             "templatecase",
//             "speechlanguage",
//             "physiotherapy",
//             "selfhelp",
//           ],
//         },
//       },
//       // Add more models and their fields for syncing if needed
//     };

//     for (const [modelName, config] of Object.entries(syncConfigurations)) {
//       const Model = mongoose.model(modelName);

//       for (const [field, validValues] of Object.entries(config.fields)) {
//         console.log(`Checking model: ${modelName}, field: ${field}`);

//         // Find all documents where the field value is not in the valid enum values
//         const invalidDocs = await Model.find({
//           [field]: { $nin: validValues },
//         });

//         if (invalidDocs.length > 0) {
//           console.log(
//             `Found ${invalidDocs.length} invalid values for '${field}' in ${modelName}.`
//           );

//           // Correct or log invalid documents
//           for (const doc of invalidDocs) {
//             console.log(`Updating document ID: ${doc._id}`);

//             // Example: Assign a default value or handle the invalid value
//             doc[field] = validValues[0]; // Replace with the first valid value or your default
//             await doc.save();
//           }
//         } else {
//           console.log(
//             `No invalid values found for '${field}' in ${modelName}.`
//           );
//         }
//       }
//     }

//     console.log("Model synchronization completed.");
//   } catch (error) {
//     console.error("Error during model synchronization:", error);
//   }
// };

console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    // await syncModels();
    // console.log("synced");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// mongoose.connection.on("open", async () => {
//   try {
//     await Question.insertMany(primary);
//     console.log("done bha");
//   } catch (error) {
//     console.log(error);
//   }
// });

// mongoose.connection.on("open", async () => {
//   try {
//     await Question.updateMany(
//       { default: { $exists: false } }, // Check if the field does not exist
//       { $set: { default: "" } } // Set reasonBox to false
//     );
//     console.log("done bha");
//   } catch (error) {
//     console.log(error);
//   }
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
