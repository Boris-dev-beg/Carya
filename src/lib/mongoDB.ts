/**
 * ! Fichier de connexion a MongoDB
 */

import mongoose from "mongoose";

let isConnected = false; // ? cache global

const Mongoose_connection = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default Mongoose_connection;
