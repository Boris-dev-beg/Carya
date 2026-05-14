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
  
  const uri = process.env.MongoDB_URI as string;
  try {
if (!uri) {
  throw new Error("MongoDB_URI is not defined");
}
await mongoose.connect(uri);
  
    // await mongoose.connect(process.env.MongoDB_URI as string);
    isConnected = true;
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default Mongoose_connection;
