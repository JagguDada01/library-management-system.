import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";
import authenticateUser from "../middleware/authenticateUser.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", authenticateUser, requireAdmin, createBook);
router.put("/:id", authenticateUser, requireAdmin, updateBook);
router.delete("/:id", authenticateUser, requireAdmin, deleteBook);

export default router;
