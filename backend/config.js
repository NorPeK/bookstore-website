import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGO_DB_URL;
