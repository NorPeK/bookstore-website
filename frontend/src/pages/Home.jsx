// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

// Home component to display a list of books
const Home = () => {
  // State to store books and loading status
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

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
        ) : (
           // Display books table if not loading
          <table className='w-full border-seperate-border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 roubded-md'>No</th>
                <th className='border border-slate-600 roubded-md'>Title</th>
                <th className='border border-slate-600 roubded-md max-md:hidden'>Author</th>
                <th className='border border-slate-600 roubded-md max-md:hidden'>Publish Year</th>
                <th className='border border-slate-600 roubded-md max-md:hidden'>Opeartions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.title}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {book.author}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {book.publishYear}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-800' />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-800' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default Home