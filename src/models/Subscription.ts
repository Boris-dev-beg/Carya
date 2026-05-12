/**
 * ! Definition des model Subscription
 */

import mongoose, { Schema } from "mongoose";


// ! Modele de souscription pour le vendeur c'est sur ce modele qu'il souscrit
const subscriptionSchema = new mongoose.Schema(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
      unique: true
    },
    planId: { 
      type: Schema.Types.ObjectId, 
      ref: "SubscriptionPlan", 
      required: true 
    },
    startDate: { 
      type: Date, 
      required: true },
    endDate: { 
      type: Date, 
      required: true },
    status: {
      type: String,
      enum: ["active", "expired", "pending"],
      default: "active",
    },
  },
  { timestamps: true },
);

export const subscriptionModel =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);


// ! Modele de souscription pour l'admin cest le modele qu'il montre au vendeur
const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  benefits: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export const SubscriptionPlan =
  mongoose.models.SubscriptionPlan ||
  mongoose.model("SubscriptionPlan", subscriptionPlanSchema);