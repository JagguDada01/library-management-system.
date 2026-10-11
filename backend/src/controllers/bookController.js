import mongoose from "mongoose";
import Book from "../models/Book.js";

export async function getBooks(req, res) {
  try {
    const { search, category, title, author, isbn } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }
    if (isbn) {
      query.isbn = { $regex: isbn, $options: "i" };
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
