import mongoose from "mongoose";

export const connectToDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to Database Successfully");
};
