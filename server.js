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
const teachingLearningMaterialRoutes = require("./routes/teachingLearningMaterialRoutes");
const workSpaceRoutes = require("./routes/workSpaceRoute.js");
const staffMeetingRoutes = require("./routes/staffMeetingRoutes");
const basicDetails = require("./data/basicDetails.js");
const {
  Question,
  StaffMeeting,
  Staff,
  TeachingLearningMaterial,
  Student,
} = require("./models/models.js");
const basicDetailsRoutes = require("./routes/basicDetailsRoute.js");

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  options: "*",
};

app.use(cors(corsOptions));

// send request for about every 5 mins
app.get("/api/cronv1", async (req, res) => {
  console.log("app waked via cron V1");
  res.send("V1").status(200);
});
// send request for about every 7 mins
app.get("/api/cronv2", (req, res) => {
  console.log("app waked via Cron V2");
  res.send("V2").status(200);
});
// send request for about every 9 mins
app.get("/api/cronv3", (req, res) => {
  console.log("app waked via Cron V3");
  res.send("V3").status(200);
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

// admin & staff routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// assessments-routess logic
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

app.use("/api/teaching-learning-materials", teachingLearningMaterialRoutes);

app.use("/api/staff-meetings", staffMeetingRoutes);

app.use("/api/basic", basicDetailsRoutes);

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

// async function updateStudentsArchive() {
//   try {
//       const result = await Student.updateMany({}, { $set: { archive: false } });
//       console.log(`${result.modifiedCount} students updated.`);
//   } catch (error) {
//       console.error('Error updating students:', error);
//   }
// }

console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    // await updateStudentsArchive()
    // console.log('added archived')
    // await syncModels();
    // console.log("synced");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// const crypto = require("crypto");

// const SECRET_KEY = "webgi215.official@gmail.com";

// function encrypt(text, password) {
//   text = text.toString();
//   password = password.toString();

//   const key = crypto.createHash("sha256").update(password).digest();
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   return iv.toString("hex") + ":" + encrypted;
// }

// mongoose.connection.on("open", async () => {
//     try {
//         console.log("Database connected. Updating student passwords...");

//         const students = await Student.find();
//         for (let student of students) {
//             if (!student.phone) continue;
//             const encryptedPassword = encrypt(student.phone, SECRET_KEY);
//             await Student.updateOne(
//                 { _id: student._id },
//                 { $set: { password: encryptedPassword } }
//             );
//         }

//         console.log("All student passwords updated with encryption.");
//     } catch (error) {
//         console.error("Error updating passwords:", error);
//     }
// });

// mongoose.connection.on("open", async () => {
//   try {
//     await TeachingLearningMaterial.updateMany(
//       { archieved: { $exists: true } }, // Match documents that have the "archieved" field
//       { $unset: { archieved: "" } } // Remove the "archieved" field
//     );
//     console.log("Archieved field removed from all documents");
//   } catch (error) {
//     console.error("Error removing archieved field:", error);
//   }
// });

// mongoose.connection.on("open", async () => {
//   try {
//     const defaultAccess = [
//       { view: "templateCase", canView: false, canEdit: false },
//       { view: "physioTherapy", canView: false, canEdit: false },
//       { view: "occupational", canView: false, canEdit: false },
//       { view: "speechLanguage", canView: false, canEdit: false },
//       { view: "assessments", canView: false, canEdit: false },
//       { view: "specialEducation", canView: false, canEdit: false },
//       { view: "growthAndDevelopment", canView: false, canEdit: false },
//     ];

//     // Update all staff where access is an empty array
//     await Staff.updateMany(
//       { access: { $size: 0 } }, // Match documents where access is an empty array
//       { $set: { access: defaultAccess } } // Set the default access
//     );

//     console.log("Access field populated for all staff with empty access.");
//   } catch (error) {
//     console.error("Error updating access field:", error);
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
