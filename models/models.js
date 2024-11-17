const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    userName: {
      type: String,
    },
    activity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    registerNo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: String, required: true },
    phone: { type: Number, required: true, maxLength: 10 },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    profilePic: {
      type: String,
    },
    photos: [
      {
        url: {
          type: String,
        },
      },
    ],
    growthAndDevelopment: [
      {
        weight: [
          {
            date: {
              type: Date,
            },
            data: {
              type: String,
            },
            unit: {
              type: String,
              default: "kg",
            },
          },
        ],
        height: [
          {
            date: {
              type: Date,
            },
            data: {
              type: String,
            },
            unit: {
              type: String,
              default: "cm",
            },
          },
        ],
        medications: [
          {
            name: {
              type: String,
            },
            dosage: {
              type: String,
            },
          },
        ],
        bovelAndSleepHabbits: [
          {
            date: {
              type: Date,
            },
            data: {
              type: String,
            },
          },
        ],
        createdAt: { type: Date, default: Date.now },
      },
    ],
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
    userName: {
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
    userId: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
    },
    userName: {
      type: String,
      // required: true,
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
        "principal",
        "specialEducator",
        "headOfPhysioTherapist",
        "physioTherapist",
        "teacherAssistant",
        "speechTherapist",
        "occupationalAssistant",
        "storesIncharge",
        "vocationalAssistant",
        "vocationalInstructor",
      ],
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    assessments: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

const SelfHelpSkillAssessmentSchema = new mongoose.Schema(
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
        reason: {
          type: String,
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
        reason: {
          type: String,
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
            color: {
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
        reason: {
          type: String,
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
    staffReference: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "staffType",
    },
    staffType: {
      type: String,
      required: true,
      enum: ["Staff", "Admin"],
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
        "selfhelp",
        "primary",
        "secondary",
        "vocational",
        "custom",
        "templatecase",
        "speechlanguage",
        "physiotherapy",
        "selfhelp",
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
    reasonBox: {
      type: Boolean,
    },
    default: {
      type: String,
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
    branch: {
      type: String,
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

const SelfHelpSkillAssessment = mongoose.model(
  "SelfHelpSkillAssessment",
  SelfHelpSkillAssessmentSchema
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

const Activity = mongoose.model("Activity", activitySchema);

const WorkSpace = mongoose.model("WorkSpaces", WorkSpaceSchema);

module.exports = {
  Student,
  Admin,
  Staff,
  PrimaryAssessment,
  SelfHelpSkillAssessment,
  SecondaryAssessment,
  VocationalAssessment,
  PhysioTherapyAssessment,
  CustomAssessment,
  TemplateCaseRecord,
  SpeechLanguageProfile,
  Question,
  HomeProgram,
  Activity,
  WorkSpace,
};
