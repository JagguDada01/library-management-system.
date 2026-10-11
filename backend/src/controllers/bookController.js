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
