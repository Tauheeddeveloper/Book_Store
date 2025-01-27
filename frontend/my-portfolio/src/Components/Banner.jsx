import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../index.css';
import bannerImage from '../assests/b.png'; // Replace with your image path

function Banner() {
  useEffect(() => {
    // GSAP animation for animating letters/words in place
    const text = document.querySelector('.animated-text');
    const letters = text.querySelectorAll('.letter');

    // Animation for each letter or word
    gsap.fromTo(
      letters,
      { opacity: 0, y: 20 }, // Start with opacity 0 and below the original position
      {
        opacity: 1,
        y: 0, // Move to original position
        duration: 0.5,
        stagger: 0.1, // Delay between each letter/word
        ease: 'power2.out',
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse animation on loop
      }
    );
  }, []);

  // Split the text into letters or words
  const text = "Discover, Learn, and Grow with the Best Books".split(' '); // For words, change to .split(' ')
  
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-10 lg:p-20 rounded-lg shadow-xl">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between lg:space-x-8">
        {/* Left side - Animated Text Section */}
        <div className="w-full lg:w-1/2 text-left space-y-6">
          <h1 className="text-3xl lg:text-5xl font-bold flex flex-wrap overflow-hidden animated-text">
            {text.map((word, index) => (
              <span key={index} className="letter inline-block mr-2">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
            Explore a vast collection of books and unlock the secrets of innovation and creativity.
          </p>
          <button className="btn btn-primary bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">
            Explore Now
          </button>
        </div>

        {/* Right side - Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <img
            src={bannerImage}
            alt="Books"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
