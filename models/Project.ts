import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please add the project name"],
  },
  donor: {
    type: String,
    require: false,
  },
  value: {
    type: Number,
    require: false,
  },
  startDate: {
    type: Date,
    require: false,
  },
  endDate: {
    type: Date,
    require: true,
  },
  projectType: {
    type: String,
    require: [true, "please add the project type"],
  },
});

export const Project = mongoose.model("Project", ProjectSchema);
