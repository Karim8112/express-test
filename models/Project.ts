import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  mainImage: {
    type: String,
    required: [true, "please add the project main image"],
  },
  name: {
    type: String,
    required: [true, "please add the project name"],
  },
  summary: {
    type: String,
    required: [true, "please add the project name"],
  },
  organization: {
    type: String,
    required: false,
  },
  imagesBefore: {
    type: [String],
    required: false,
  },
  imagesAfter: {
    type: [String],
    required: false,
  },
  projectType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectType",
    required: [true, "please add the project type"],
  },
});

export const Project = mongoose.model("Project", ProjectSchema);
