import express, { response } from "express"; // Import the Express library for building web applications
import { PORT, mongoDBURL } from "./config.js"; // Import configuration variables (port number and MongoDB URL)
import mongoose from "mongoose"; // Import Mongoose for interacting with MongoDB
//import { Book } from './models/bookModel.js'; // Import the Book model for managing book data in the database
import bookRoute from './routes/booksRoute.js'

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse incoming JSON requests to JS

// Route to handle GET requests to the root URL
app.get('/', (request, response) => {
    console.log(request); // Log the request object for debugging
    return response.status(234).send("Welcome to MERN Stack Tutorial"); // Send a response with status code 234 and a message
});


app.use('/books' , bookRoute);

// Connect to MongoDB using Mongoose
mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database."); // Log success message when connected

    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`); // Log the port number
    });
}).catch((error) => {
    console.log(error); // Log the error if the connection fails
});

