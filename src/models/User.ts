/**
 * Definition du model User
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "buyer", "seller"],
      default: "buyer",
    },
  },
  {
    timestamps: true,
  },
);

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
