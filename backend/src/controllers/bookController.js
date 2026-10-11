import mongoose from "mongoose";
import Book from "../models/Book.js";

// Helper function to escape special regular expression characters
function escapeRegex(text) {
  if (typeof text !== "string") {
    return "";
  }
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function getBooks(req, res) {
  try {
    const { search, category, title, author, isbn, available } = req.query;
    let query = {};

    if (search && typeof search === "string") {
      const escapedSearch = escapeRegex(search.trim());
      query.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { author: { $regex: escapedSearch, $options: "i" } },
        { isbn: { $regex: escapedSearch, $options: "i" } }
      ];
    }

    if (category && typeof category === "string") {
      const escapedCategory = escapeRegex(category.trim());
      query.category = { $regex: new RegExp(`^${escapedCategory}$`, "i") };
    }

    if (title && typeof title === "string") {
      query.title = { $regex: escapeRegex(title.trim()), $options: "i" };
    }
    if (author && typeof author === "string") {
      query.author = { $regex: escapeRegex(author.trim()), $options: "i" };
    }
    if (isbn && typeof isbn === "string") {
      query.isbn = { $regex: escapeRegex(isbn.trim()), $options: "i" };
    }

    if (available === "true") {
      query.availableCopies = { $gt: 0 };
    } else if (available === "false") {
      query.availableCopies = 0;
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      count: books.length,
      books
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getBookById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createBook(req, res) {
  try {
    const {
      title,
      author,
      isbn,
      category,
      publicationYear,
      totalCopies,
      availableCopies
    } = req.body || {};

    if (
      !title ||
      !author ||
      !isbn ||
      !category ||
      publicationYear === undefined ||
      totalCopies === undefined
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(409).json({ message: "A book with this ISBN already exists" });
    }

    const copiesAvailable =
      availableCopies !== undefined ? availableCopies : totalCopies;

    if (copiesAvailable > totalCopies) {
      return res.status(400).json({
        message: "Available copies cannot exceed total copies"
      });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      publicationYear,
      totalCopies,
      availableCopies: copiesAvailable
    });

    return res.status(201).json({
      message: "Book created successfully",
      book
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A book with this ISBN already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error creating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateBook(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updates = req.body || {};

    if (updates.isbn && updates.isbn !== book.isbn) {
      const existing = await Book.findOne({ isbn: updates.isbn });
      if (existing) {
        return res.status(409).json({ message: "A book with this ISBN already exists" });
      }
    }

    const newTotal =
      updates.totalCopies !== undefined ? updates.totalCopies : book.totalCopies;
    const newAvailable =
      updates.availableCopies !== undefined
        ? updates.availableCopies
        : book.availableCopies;

    if (newAvailable > newTotal) {
      return res.status(400).json({
        message: "Available copies cannot exceed total copies"
      });
    }

    Object.assign(book, updates);
    await book.save();

    return res.status(200).json({
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A book with this ISBN already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
