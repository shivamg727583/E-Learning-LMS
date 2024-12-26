import mongoose from "mongoose";

const connectDb = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    // console.log("MONGO_URI:", MONGO_URI); // Debug log to check if MONGO_URI is loaded

    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process if the database connection fails
    }
};

export default connectDb;
