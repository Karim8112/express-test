import mongoose from "mongoose";

const HouseTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add the house type name"],
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

export const HouseType = mongoose.model("HouseType", HouseTypeSchema);

// =========================================

const HouseSchema = new mongoose.Schema({
  mainImage: {
    type: String,
    required: [true, "please add the main house image"],
  },
  title: {
    type: String,
    required: [true, "please add the house title"],
  },
  description: {
    type: String,
    required: [true, "please add the house description"],
  },

  city: {
    type: String,
    required: [true, "please add the city"],
  },

  location: {
    type: String,
    required: [true, "please add the location"],
  },
  area: {
    type: Number,
    required: [true, "please add the total area in square meters"],
  },
  roomsCount: {
    type: Number,
    required: [true, "please add the number of rooms"],
  },
  hasCourtyard: {
    type: Boolean,
    default: true,
  },
  price: {
    type: String,
    required: false,
  },
  houseType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HouseType",
    required: [true, "please attach a house type"],
  },
  images: {
    type: [String],
    default: [],
  },
});

export const House = mongoose.model("House", HouseSchema);
