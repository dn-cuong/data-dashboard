import React from 'react';
import BookChart from './BookChart';
import LanguageChart from './LanguageChart';

const Statistics = ({ books }) => {
  if (!books || books.length === 0) return <p>No data available.</p>;

  const totalBooks = books.length;
  const earliestYear = Math.min(...books.map(book => book.first_publish_year || new Date().getFullYear()));
  const authorsList = books.flatMap(book => book.author_name || []);
  const mostCommonAuthor = authorsList.length ? mostFrequent(authorsList) : 'N/A';

  function mostFrequent(arr) {
    const frequencyMap = arr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
  }

  return (
    <div className="statistics-container">
      <h3>Summary Statistics</h3>
      <div className='stats-container'>
        <div className='stats-card'>
          <p>Total Books: {totalBooks}</p>
        </div>
        <div className='stats-card'>
          <p>Earliest Publication Year: {earliestYear}</p>
        </div>
        <div className='stats-card'>
          <p>Most Common Author: {mostCommonAuthor}</p>
        </div>
      </div>
      <div className="charts-container">
        <BookChart books={books} />
        <LanguageChart books={books} />
      </div>
    </div>
  );
};

export default Statistics;