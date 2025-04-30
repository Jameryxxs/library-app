import React from 'react';

const BookList = ({ books }) => {
  return (
    <div>
      {books && books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="mb-4 p-4 border rounded">
            <h3 className="text-xl font-bold">{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            <p>{book.volumeInfo.publishedDate}</p>
            <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default BookList;
