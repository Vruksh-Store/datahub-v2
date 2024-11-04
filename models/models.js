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
      enum: ["teacher", "admin", "support"],
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

const HomeProgramSchema = new mongoose.Schema({
  studentReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exercises: [
    {
      name: { type: String, required: true },
      repetitions: { type: String, required: true },
    },
  ],
  dailyLogs: [
    {
      date: { type: Date, required: true },
      exercises: [
        {
          name: { type: String, required: true },
          completed: { type: Boolean, default: false },
          review: { type: String },
        },
      ],
    },
  ],
});

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
      ],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "multiple-choice", "boolean"],
      required: true,
    },
    options: [String],
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

module.exports = {
  Student,
  Admin,
  Staff,
  PrimaryAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
  Question,
  HomeProgram,
};
