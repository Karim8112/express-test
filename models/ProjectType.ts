import mongoose from "mongoose";

const ProjectTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add the projectType name"],
  },
});

export const ProjectType = mongoose.model("ProjectType", ProjectTypeSchema);
