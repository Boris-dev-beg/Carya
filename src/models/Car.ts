/**
 * Definition du model Car
 */

import mongoose, { Schema } from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    model: {
      type: String,
    },
    year: {
      type: String,
    },
    mileage: {
      type: String,
    },
    description: {
      type: String,
    },
    fuel: {
      type: String,
    },
    transimission: {
      type: String,
    },
    state: {
      type: String,
    },
    photos: [{
      image_url: String,
      public_id: String,
    }],
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const carModel = mongoose.models.Car || mongoose.model("Car", carSchema);
