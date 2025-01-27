import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';
import image from '../assests/fr.png';

const FreeBook = () => {
  const [books, setBooks] = useState([]);
  const booksRef = useRef([]);
  const headingRef = useRef(null);
  const freeBadgeRef = useRef([]);

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Fetch books from the API
  useEffect(() => {
    fetch(`${window.location.origin}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  // Heading animation
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.75)',
        }
      );
    }
  }, []);

  // Scroll-triggered animation for books
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

  // Animate Free badges
  useEffect(() => {
    if (books.length > 0) {
      freeBadgeRef.current.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
            }
          );
        }
      });
    }
  }, [books]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 via-purple-200 to-blue-300 py-10 px-4">
        <h1
          className="text-center text-5xl font-bold text-blue-800 mb-10"
          ref={headingRef}
        >
          Free Books
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={index}
                className="book-card w-80 bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg"
                ref={(el) => (booksRef.current[index] = el)}
              >
                <figure>
                  <img
                    src={book.image ? book.image : image}
                    alt="Book"
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {book.name}
                  </h2>
                  <div className="mt-4 flex justify-between">
                    <div
                      className="badge bg-purple-700 text-white px-3 py-1 rounded-lg shadow-sm"
                      ref={(el) => (freeBadgeRef.current[index] = el)}
                    >
                      {book.category}
                    </div>
                    <div className="badge bg-blue-700 text-white px-3 py-1 rounded-lg shadow-sm">
                      {book.price === 0 ? 'Free' : `$${book.price}`}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">Loading books...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreeBook;
