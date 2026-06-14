import mongoose from "mongoose";

const levelSchema = mongoose.Schema({
  level: {
    type: Number,
    required: [true, "Level Number is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is cumpolsary"],
  },
  attachments: {
    type: [
      {
        name: String,
        path: String,
      },
    ],
    default: [],
  },
});

export default mongoose.models.Level || mongoose.model("Level", levelSchema);
