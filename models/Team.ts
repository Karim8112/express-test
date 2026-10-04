import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const TeamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requiredd: false,
  },
  phoneNumberS: {
    type: [String],
    required: false,
  },
  summary: {
    type: String,
    required: true,
  },
  imageLeft: {
    type: String,
    required: true,
  },
  imageRight: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: {
    type: [ExperienceSchema],
    required: false,
  },
  education: {
    type: [String],
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
});

export const Team = mongoose.model("Team", TeamSchema);
