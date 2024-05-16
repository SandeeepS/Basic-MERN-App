import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongodb connected : ${conn.connection.host}`);
  } catch (error) {
    console.error("error occured while connection of mongo db", error);
    process.exit(1);
  }
};

export default connectDb;
