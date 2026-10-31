import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  heroImage: {
    type: String,
    required: [true, "please add Main Image"],
  },
  mainTitle: {
    type: String,
    required: [true, "please add the main title"],
  },
});

export const Hero = mongoose.model("Hero", HeroSchema);

// ===================================================
const whatWeDoSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "please add the Landing main image"],
  },
  text: {
    type: String,
    required: [true, "please add the Landing main image"],
  },
});

export const whatWeDo = mongoose.model("whatWeDo", whatWeDoSchema);

// ===================================================
const additionalSectionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "please add the image"],
  },
  text: {
    type: String,
    required: [true, "please add text"],
  },
});

export const additionalSection = mongoose.model(
  "additionalSection",
  additionalSectionSchema,
);

// ===================================================
const aboutUsSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: [true, "please add title 1"],
  },
  description: {
    type: String,
    required: [true, "please add description 1"],
  },
  title2: {
    type: String,
    required: [true, "please add title 2"],
  },
  description2: {
    type: String,
    required: [true, "please add description 2"],
  },
  title3: {
    type: String,
    required: [true, "please add title 3"],
  },
  description3: {
    type: String,
    required: [true, "please add description 3"],
  },
  images: {
    type: [String],
    required: false,
  },
});

export const aboutUs = mongoose.model("aboutUs", aboutUsSchema);

// ===================================================
const listSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "please add the image"],
  },
  title: {
    type: String,
    required: [true, "please add title"],
  },
  desc: {
    type: [String],
    required: [true, "please add description list"],
  },
});

export const list = mongoose.model("list", listSchema);

// ===================================================
const contactInfoSchema = new mongoose.Schema({
  numbers: {
    type: [String],
    required: [true, "please add the numbers"],
  },
  emails: {
    type: [String],
    required: [true, "please add emails"],
  },
  address: {
    type: [String],
    required: [true, "please add address"],
  },
});

export const contactInfo = mongoose.model("contactInfo", contactInfoSchema);
