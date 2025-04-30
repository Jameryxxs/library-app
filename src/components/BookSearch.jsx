import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';
import UploadFeature from './UploadFeature';

const BookSearch = () => {
  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input) fetchBooks();
    }, 500); // Debounce API call by 500ms

    return () => clearTimeout(delayDebounce);
  }, [input, page]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: input,
          startIndex: (page - 1) * 10,
          maxResults: 10,
        },
      });
      setBooks(response.data.items || []);
      setTotalItems(response.data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-100 to-white min-h-screen">
      <div className="max-w-2xl mx-auto text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Book Finder</h1>
        <input
          type="text"
          placeholder="Search for books..."
          value={input}
          onChange={handleInputChange}
          className="w-full sm:w-3/4 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : books.length > 0 ? (
          <>
            <BookList books={books} />
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                disabled={page * 10 >= totalItems}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          input && <p className="text-center mt-4">No books found.</p>
        )}
      </div>

      <div className="max-w-2xl mx-auto mt-10">
        <UploadFeature setUploadFile={setUploadFile} />
      </div>
    </div>
  );
};

export default BookSearch;
