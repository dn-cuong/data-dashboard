import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author_name?.join(', ')}</p>
      <div><strong>Key:</strong> {book.key}</div>
      {book.subject && <div><strong>Subjects:</strong> {book.subject.join(', ')}</div>}
      {book.publisher && <div><strong>Publisher:</strong> {book.publisher.join(', ')}</div>}
      <div><strong>Publish Date:</strong> {book.publish_date?.join(', ')}</div>
      {book.isbn && <div><strong>ISBN:</strong> {book.isbn.join(', ')}</div>}
      {book.language && <div><strong>Language:</strong> {book.language.join(', ')}</div>}
    </div>
  );
};

export default BookDetail;