import React from 'react';
import { Link } from 'react-router-dom';
import { use_user } from '../Context/SecurityProvider';

const Navbar = () => {
  const [user,set_user]=use_user()
  console.log(user)
  return (
    <>
      <div className="navbar bg-gradient-to-r from-black via-purple-700 to-blue-800 text-white shadow-lg">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-black rounded-lg mt-3 w-52 p-2 shadow-lg space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-blue-500">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-bold tracking-wide">
            Book Store
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 space-x-6 text-lg">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-yellow-300 transition">
                Books
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="navbar-end hidden lg:flex mr-4">
          <div className="flex items-center bg-white text-black rounded-lg shadow-md px-2 py-1">
            <input
              type="text"
              className="flex-grow outline-none px-2 text-sm"
              placeholder="Search for books"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70 cursor-pointer">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Login Button */}
        <div className="navbar-end">
          <Link
          
            to="/login"
            className="btn bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-blue-600 transition">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
