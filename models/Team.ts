import mongoose from "mongoose";

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
