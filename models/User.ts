import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please add a name"],
  },
  userName: {
    type: String,
    require: [true, "please add a userName"],
  },
  password: {
    type: String,
    require: [true, "please add password"],
  },
  startDate: {
    type: Date,
    require: false,
  },
});

export const User = mongoose.model("User", UserSchema);
