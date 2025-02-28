import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    number: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

export default user;
