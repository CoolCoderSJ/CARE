"use client";

import React, { useState, useEffect } from 'react';
import './navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar opacity when scrolled more than 50px
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar transition-all duration-300 w-full ${
      scrolled 
        ? "bg-color-400 sticky top-0" 
        : "bg-transparent fixed top-0 left-0"
    } z-50`}>
      <div className="navbar-brand justify-between items-center px-4 w-full hidden md:flex">
        <a href="/" className='block' style={{ margin: "1rem 0" }}>
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <div className={`navbar-menu pl-0 p-6 md:p-0 mr-6`}>
        <a href="/" className="transition-colors duration-300 ease-in-out">Home</a>
        <a href="/about" className="transition-colors duration-300 ease-in-out">About</a>
        <a href="/events" className="transition-colors duration-300 ease-in-out min-w-[fit-content]">Past Events</a>
        <a href="/branches" className="transition-colors duration-300 ease-in-out">Branches</a>
        <a href="/team" className="transition-colors duration-300 ease-in-out">Team</a>
      </div>
    </nav>
  );
};

export default Navbar;
