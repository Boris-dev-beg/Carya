/**
 * Fichier de connexion a MongoDB
 */

import mongoose from "mongoose";


const Mongoose_connection = async () => {
  // if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "Undefine");
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default Mongoose_connection;