const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    registerNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, required: true },
    phone: { type: Number, required: true, unique: true, maxLength: 10 },
    fees: [
      {
        date: { type: Date },
        amount: { type: Number },
        amountPaid: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const StaffSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "principle",
        "specialEducator",
        "headOfPhysioTherapist",
        "physioTherapist",
        "teacherAssistant",
        "speechTherapist",
        "occupationalAssistant",
        "storesIncharge",
      ],
    },
  },
  { timestamps: true }
);

const PrimaryAssessmentSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    review: {
      type: String,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const SecondaryAssessmentSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    review: {
      type: String,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const VocationalAssessmentSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    review: {
      type: String,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const PhysioTherapyAssessmentSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    review: {
      type: String,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        groupId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        subGroupId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const CustomAssessmentSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    review: {
      type: String,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const HomeProgramSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    noOfDays: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    review: {
      type: String,
    },
    reply: {
      type: String,
    },
    exercises: [
      {
        name: { type: String, required: true },
        repetitions: [
          {
            date: {
              type: Date,
              required: true,
            },
            completed: Boolean,
            feedback: {
              type: String,
            },
          },
        ],
      },
    ],
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const TemplateCaseRecordSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const SpeechLanguageProfileSchema = new mongoose.Schema(
  {
    studentReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const SubgroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //tone
  },
});

const GroupQuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //right
  },
  subgroups: [SubgroupSchema],
});

const QuestionSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      enum: [
        "primary",
        "secondary",
        "vocational",
        "custom",
        "templatecase",
        "speechlanguage",
        "physiotherapy",
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true, //muscle group
    },
    question: {
      type: String,
      required: true, //Flexors
    },
    category: {
      type: String, //Shoulder
    },
    type: {
      type: String,
      enum: ["text", "multiple-choice", "boolean", "structured-table"],
      required: true,
    },
    options: [String],
    groups: [GroupQuestionSchema], // right or left
  },
  { timestamps: true }
);

const WorkSpaceSchema = new mongoose.Schema(
  {
    studentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    space: {
      type: String,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);

const Admin = mongoose.model("Admin", AdminSchema);

const Staff = mongoose.model("Staff", StaffSchema);

const PrimaryAssessment = mongoose.model(
  "PrimaryAssessment",
  PrimaryAssessmentSchema
);

const SecondaryAssessment = mongoose.model(
  "SecondaryAssessment",
  SecondaryAssessmentSchema
);

const VocationalAssessment = mongoose.model(
  "VocationalAssessment",
  VocationalAssessmentSchema
);

const PhysioTherapyAssessment = mongoose.model(
  "PhysioTherapyAssessment",
  PhysioTherapyAssessmentSchema
);

const CustomAssessment = mongoose.model(
  "CustomlAssessment",
  CustomAssessmentSchema
);

const HomeProgram = mongoose.model("HomeProgram", HomeProgramSchema);

const TemplateCaseRecord = mongoose.model(
  "TemplateCaseRecord",
  TemplateCaseRecordSchema
);

const SpeechLanguageProfile = mongoose.model(
  "SpeechLanguageProfile",
  SpeechLanguageProfileSchema
);

const Question = mongoose.model("Question", QuestionSchema);

const WorkSpace = mongoose.model("WorkSpaces", WorkSpaceSchema);

module.exports = {
  Student,
  Admin,
  Staff,
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  PhysioTherapyAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
  Question,
  HomeProgram,
  WorkSpace,
};
