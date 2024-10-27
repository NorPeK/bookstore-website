// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

// Home component to display a list of books
const Home = () => {
  // State to store books and loading status
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  // Fetch books when component mounts
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    axios.get("http://localhost:5555/books") // Make a GET request to the API
      .then((response) => {
        setBooks(response.data.data); // Set books state with the response data
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.log(error); // Log any error if it occurs
        setLoading(false); // Stop loading if there's an error
      })
  }, []);

  return (
    <div className='p-4'>

      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>Table</button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>Card</button>
      </div>

      {/* Header with title and add button */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='books/create'>
          <MdOutlineAddBox className='text-sky-800 text 4xl' />
        </Link>
      </div>
      {
        loading ? (
          // Show Spinner while loading
          <Spinner />
        ) : showType === 'table' ? (
          // Display books table if not loading
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )
      }
    </div>
  )
}

export default Home