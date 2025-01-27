import gsap from 'gsap';
import React, { useEffect, useState, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Book = () => {
  const [books, setBooks] = useState([]);
  const booksRef = useRef([]);

  // Register GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Fetch book data from the server
  useEffect(() => {
    fetch(`${window.location.origin}/paid`)
      .then((res) => res.json())
      .then((data) => {
        const filteredBooks = data.filter((book) => book.price > 0); // Filter books with price > 0
        setBooks(filteredBooks);
      })
      .catch((err) => {
        console.log('Error occurred while fetching data:', err);
      });
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (books.length > 0) {
      booksRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }
  }, [books]);

  // Back button animation
  useEffect(() => {
    gsap.fromTo(
      '.back-button',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'bounce.out' }
    );
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="animated-bg min-h-screen text-white py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-extrabold mb-8 text-center animate-fadeIn">
            Paid Books
          </h1>
          <Link
            to="/"
            className="back-button bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
          >
            Back
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div
                  key={book.id}
                  ref={(el) => (booksRef.current[index] = el)}
                  className="card bg-white border rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <figure>
                    <img
                      src={book.image || 'https://via.placeholder.com/400'}
                      alt={book.title}
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  </figure>
                  <div className="card-body p-6 text-gray-800">
                    <h2 className="card-title text-2xl font-semibold">
                      {book.title}
                    </h2>
                    <p className="mt-4">{book.name || 'No description available.'}</p>
                    <p className="mt-2 text-green-600 font-bold text-lg">
                      Price: ${book.price}
                    </p>
                    <div className="card-actions justify-end mt-4">
                      <div className="badge badge-outline border-gray-300 px-3 py-1 rounded-lg text-sm">
                        {book.category || 'General'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-xl">Loading...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .animated-bg {
          background: linear-gradient(
            45deg,
            rgba(29, 78, 216, 1),
            rgba(56, 189, 248, 1)
          );
          background-size: 400% 400%;
          animation: gradient 10s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Book;
