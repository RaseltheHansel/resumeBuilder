import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined  in .env file");
        }
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    }
    catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        }  else {
            console.error("Unknown error connecting to MongoDB:", error);
        }
        process.exit(1);
    }
};

export default connectDB;