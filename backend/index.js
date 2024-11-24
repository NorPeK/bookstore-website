import express from "express"; // Import the Express library for building web applications
import { PORT, mongoDBURL } from "./config.js"; // Import configuration variables (port number and MongoDB URL)
import mongoose from "mongoose"; // Import Mongoose for interacting with MongoDB
import bookRoute from "./routes/booksRoute.js"; // Import your book routes
import cors from "cors"; // Middleware for handling CORS policy
import path from "path"; // Required to handle file paths
import { fileURLToPath } from "url"; // Required to get the current file directory

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Create an instance of the Express application

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(
    cors({
        origin: "https://bookstore-website-1-es0v.onrender.com", // Replace with your deployed frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
); // Allow all origins for simplicity

// Serve static files from the frontend's dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Route to handle API requests
app.use("/books", bookRoute);

// Catch-all route to serve the React frontend for any unknown routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Connect to MongoDB using Mongoose
mongoose
    .connect(mongoDBURL) // Simplified connection without deprecated options
    .then(() => {
        console.log("App connected to database."); // Log success message when connected

        // Start the server and listen on the specified port
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`); // Log the port number
        });
    })
    .catch((error) => {
        console.log("Database connection error:", error); // Log the error if the connection fails
    });
