import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log(process.env.MONGO_URL);
    console.log(">>>Connect Database Success");
  } catch (error) {
    console.error(">>>Error Connect Database");
  }
};
