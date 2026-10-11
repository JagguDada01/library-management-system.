import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getBooks } from "../services/bookService";

function BookCatalogue() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getBooks().then((result) => { if (active) setBooks(result.books || []); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="catalogue" aria-labelledby="catalogue-title">
      <div className="catalogue-heading"><div><h2 id="catalogue-title">Book catalogue</h2><p>Browse the library collection.</p></div><span className="book-count">{books.length} {books.length === 1 ? "book" : "books"}</span></div>
      {loading && <p className="message">Loading books...</p>}
      {!loading && error && <p className="error-message">Unable to load books: {error}</p>}
      {!loading && !error && books.length === 0 && <p className="message">No books are currently available.</p>}
      {!loading && !error && books.length > 0 && <div className="book-grid">{books.map((book) => <BookCard key={book._id} book={book} />)}</div>}
    </section>
  );
}
export default BookCatalogue;
