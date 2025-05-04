import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sebasrodsua05:pENUwn1yB1G8jqMH@cluster0.oxl3ems.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


if (!MONGODB_URI) {
  throw new Error("Define MONGODB_URI en tu .env.local");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
};
