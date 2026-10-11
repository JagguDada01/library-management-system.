import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    publicationYear: {
      type: Number,
      required: [true, "Publication year is required"],
      max: [new Date().getFullYear(), "Publication year cannot exceed the current year"],
      validate: {
        validator: Number.isInteger,
        message: "Publication year must be an integer"
      }
    },
    totalCopies: {
      type: Number,
      required: [true, "Total copies is required"],
      min: [0, "Total copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Total copies must be an integer"
      }
    },
    availableCopies: {
      type: Number,
      required: [true, "Available copies is required"],
      min: [0, "Available copies cannot be negative"],
      validate: [
        {
          validator: Number.isInteger,
          message: "Available copies must be an integer"
        },
        {
          validator: function (value) {
            return value <= this.totalCopies;
          },
          message: "Available copies cannot exceed total copies"
        }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
