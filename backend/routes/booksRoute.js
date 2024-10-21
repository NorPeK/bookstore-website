import express from 'express';
import { Book } from '../models/bookModel.js'

const router = express.Router();


// Route to handle POST requests for adding new books
router.post('/', async (request, response) => {
    try {
        // Check if all required fields (title, author, publishYear) are present in the request body
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear", // Send an error message if fields are missing
            });
        }

        // Create a new book object using the data from the request body
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        // Save the new book to the database using the Book model
        const book = await Book.create(newBook);
        return response.status(201).send(book); // Send the created book object with status 201 (Created)
    } catch (error) {
        console.log(error.message); // Log the error message for debugging
        response.status(500).send({ message: "An error occurred" }); // Send a 500 (Internal Server Error) response
    }
});


// Define a GET route at the '/get' endpoint to retrieve all books
router.get('/', async (request, response) => {
    try {
        // Use the Book model to find all documents in the 'books' collection
        const books = await Book.find({});
        
        // If successful, return the books as a JSON response with a 200 (OK) status code
        return response.status(200).json({
            count: books.length,
            data: books
        }); // json(books) convert the JS array to JSON before sending it to the response
    } catch (error) {
        // If an error occurs, log the error message to the console
        console.log(error.message);
        
        // Send a 500 (Internal Server Error) response with the error message
        response.status(500).send({ message: error.message });
    }
});


// get a book by ID
router.get('/:id', async (request, response) => {
    try {
        // Extract the id parameter from the request URL
        const { id } = request.params;
        
        // Find a book by its ID in the database using Mongoose
        const book = await Book.findById(id);
        
        // If the book is not found, return a 404 (Not Found) response
        if (!book) {
            return response.status(404).send({ message: "Book not found" });
        }
        
        // If the book is found, return it as a JSON response with status 200 (OK)
        return response.status(200).json(book); 
    } catch (error) {
        // Log the error message to the console if an error occurs
        console.log(error.message);
        
        // Return a 500 (Internal Server Error) response with the error message
        response.status(500).send({ message: error.message });
    }
});


// Define a PUT route at the '/books/:id' endpoint to update a specific book
router.put('/:id', async (request, response) => {
    try {
        // Check if all required fields (title, author, publishYear) are present in the request body
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear", // Send an error message if fields are missing
            });
        }

        // Destructure the 'id' parameter from the request URL
        const { id } = request.params;

        // Find the book by ID and update it with the data from the request body
        const result = await Book.findByIdAndUpdate(id, request.body);
        
        // If no book is found with the provided ID, return a 404 (Not Found) status code
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        // If the book is successfully updated, return a success message with a 200 (OK) status code
        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        // Log any error that occurs during the operation
        console.log(error.message);

        // Return a 500 (Internal Server Error) response with the error message
        response.status(500).send({ message: error.message });
    }
});

// Define a DELETE route at the '/books/:id' endpoint to delete a specific book
router.delete('/:id', async (request, response) => {
    try {
        // Destructure the 'id' parameter from the request URL
        const { id } = request.params;

        // Find the book by its ID and delete it from the database
        const result = await Book.findByIdAndDelete(id);
        
        // If no book is found with the provided ID, return a 404 (Not Found) status code
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        
        // If the book is successfully deleted, return a success message with a 200 (OK) status code
        return response.status(200).send({ message: "Book deleted successfully" });

    } catch (error) {
        // Log any error that occurs during the operation
        console.log(error.message);
        
        // Return a 500 (Internal Server Error) response with the error message
        response.status(500).send({ message: error.message });
    }
});


export default router;