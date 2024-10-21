import mongoose from "mongoose"; // Import Mongoose library for creating schemas and models

// Define a schema for the 'Book' model with fields: title, author, and publishYear
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String, // Data type is String
            required: true, // This field is required
        },
        author: {
            type: String, // Data type is String
            required: true, // This field is required
        },
        publishYear: {
            type: Number, // Data type is Number
            required: true, // This field is required
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the Book model based on the bookSchema
export const Book = mongoose.model("Book", bookSchema);
