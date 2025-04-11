import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './NavBar';

const BookDetail = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${title}`);
        const data = await response.json();
        if (data.docs && data.docs.length > 0) {
          setBook(data.docs[0]);
        } else {
          console.log("No book found");
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [title]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-detail-container">
      <Navbar />
      <div className="book-detail-content">
        <h2>{book.title}</h2>
        <div className="book-info">
          <div className="info-section">
            <h3>Author Information</h3>
            <p><strong>Authors:</strong> {book.author_name?.join(', ')}</p>
            {book.author_key && <p><strong>Author Keys:</strong> {book.author_key.join(', ')}</p>}
          </div>

          <div className="info-section">
            <h3>Publication Details</h3>
            <p><strong>First Published:</strong> {book.first_publish_year}</p>
            <p><strong>Publisher:</strong> {book.publisher?.join(', ')}</p>
            <p><strong>Publish Date:</strong> {book.publish_date?.join(', ')}</p>
          </div>

          <div className="info-section">
            <h3>Book Details</h3>
            <p><strong>ISBN:</strong> {book.isbn?.join(', ')}</p>
            <p><strong>Language:</strong> {book.language?.join(', ')}</p>
            <p><strong>Subjects:</strong> {book.subject?.join(', ')}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
          </div>

          <div className="info-section">
            <h3>Additional Information</h3>
            <p><strong>Key:</strong> {book.key}</p>
            {book.cover_i && (
              <img 
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} 
                alt={`Cover for ${book.title}`}
                className="book-cover"
              />
            )}
          </div>
        </div>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default BookDetail;