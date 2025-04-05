import { useState, useEffect } from 'react';
import './App.css';
import Statistics from './components/Statistics';
import Navbar from './components/NavBar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookDetail from './components/BookDetail';

function App() {
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authorFilter, setAuthorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://openlibrary.org/search.json?q=a+court+of+thorns+and+roses');
      const data = await response.json();
      setBooks(data.docs);
      setFilteredBooks(data.docs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = books.filter(book => {
      const titleMatch = book.title.toLowerCase().includes(searchBook.toLowerCase());
      const authorMatch = !authorFilter || (book.author_name && book.author_name.some(author => author.toLowerCase().includes(authorFilter.toLowerCase())));
      const yearMatch = !yearFilter || (book.first_publish_year && book.first_publish_year.toString() === yearFilter);

      return titleMatch && authorMatch && yearMatch;
    });
    setFilteredBooks(results);
  }, [searchBook, authorFilter, yearFilter, books]);

  return (
    <BrowserRouter>
      <div className='whole-page'>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <h1>A Court of Thorn and Roses Search Results</h1>
              <Statistics books={filteredBooks} />
              <input
                type="text"
                placeholder="Search books..."
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                className='input-container'
              />
              <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} className='input-container'>
                <option value="">Filter by author...</option>
                {books.map(book => (
                  book.author_name && book.author_name.map((author, index) => (
                    <option key={index} value={author}>{author}</option>
                  ))
                ))}
              </select>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className='input-container'>
                <option value="">Filter by year...</option>
                {books.map(book => (
                  book.first_publish_year && <option key={book.first_publish_year} value={book.first_publish_year}>{book.first_publish_year}</option>
                ))}
              </select>
              {filteredBooks.map((book, index) => (
                <div key={index}>
                  <h2>
                    <Link to={`/book/${book.title}`}>{book.title}</Link>
                  </h2>
                  <p>Author: {book.author_name?.join(', ')}</p>
                </div>
              ))}
            </>
          } />
          <Route path="/book/:title" element={<BookDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;