import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongo_url = process.env.MONGO_CONN;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
