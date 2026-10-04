import mongoose from "mongoose";

type IExperience = {
  role: string;
};

const ExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    require: true,
  },
  period: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
});

const TeamSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
  phoneNumberS: {
    type: [String],
    require: false,
  },
  summary: {
    type: String,
    require: true,
  },
  imageLeft: {
    type: String,
    require: true,
  },
  imageRight: {
    type: String,
    require: false,
  },
  tags: {
    type: [String],
    require: false,
  },
  skills: {
    type: [String],
    require: true,
  },
  experience: {
    type: [ExperienceSchema],
    require: false,
  },
  education: {
    type: [String],
    require: true,
  },
  languages: {
    type: [String],
    require: true,
  },
});

export const Team = mongoose.model("Team", TeamSchema);
