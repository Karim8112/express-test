import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: [true, "please add the Test name"],
  },
});

export const Test = mongoose.model("Test", TestSchema);
