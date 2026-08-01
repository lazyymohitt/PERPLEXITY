import mongoose from "mongoose";
import "dotenv/config";

export const connectToDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables (.env)");
    }
    const connection = await mongoose.connect(uri);
    console.log(`Connected to Database Successfully: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};
