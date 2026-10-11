import { useEffect, useState } from "react";

const emptyBook = { title: "", author: "", isbn: "", category: "", publicationYear: "", totalCopies: "", availableCopies: "" };

function BookForm({ book, onSubmit, onCancel, saving, serverError }) {
  const [formData, setFormData] = useState(emptyBook);
  const [error, setError] = useState("");
  useEffect(() => { setFormData(book ? { title: book.title, author: book.author, isbn: book.isbn, category: book.category, publicationYear: book.publicationYear, totalCopies: book.totalCopies, availableCopies: book.availableCopies } : emptyBook); setError(""); }, [book]);
  function handleSubmit(event) {
    event.preventDefault();
    const payload = { ...formData, publicationYear: Number(formData.publicationYear), totalCopies: Number(formData.totalCopies), availableCopies: Number(formData.availableCopies) };
    if (Object.values(formData).some((value) => String(value).trim() === "")) return setError("Please complete every field.");
    if ([payload.publicationYear, payload.totalCopies, payload.availableCopies].some((value) => !Number.isInteger(value) || value < 0)) return setError("Numeric fields must be whole numbers.");
    if (payload.availableCopies > payload.totalCopies) return setError("Available copies cannot exceed total copies.");
    setError(""); onSubmit(payload);
  }
  return <form className="book-form" onSubmit={handleSubmit}><div className="form-heading"><h2>{book ? "Edit book" : "Add a book"}</h2>{book && <button type="button" className="text-button" onClick={onCancel}>Cancel</button>}</div>{(error || serverError) && <p className="error-message">{error || serverError}</p>}<div className="form-grid">{[["title", "Title"], ["author", "Author"], ["isbn", "ISBN"], ["category", "Category"]].map(([name, label]) => <label key={name}>{label}<input name={name} value={formData[name]} onChange={(event) => setFormData({ ...formData, [name]: event.target.value })} required /></label>)}<label>Publication year<input name="publicationYear" type="number" min="0" value={formData.publicationYear} onChange={(event) => setFormData({ ...formData, publicationYear: event.target.value })} required /></label><label>Total copies<input name="totalCopies" type="number" min="0" value={formData.totalCopies} onChange={(event) => setFormData({ ...formData, totalCopies: event.target.value })} required /></label><label>Available copies<input name="availableCopies" type="number" min="0" value={formData.availableCopies} onChange={(event) => setFormData({ ...formData, availableCopies: event.target.value })} required /></label></div><button type="submit" disabled={saving}>{saving ? "Saving..." : book ? "Save changes" : "Add book"}</button></form>;
}
export default BookForm;
