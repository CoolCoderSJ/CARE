"use client";

import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-color-400 navbar">
      <div className="navbar-brand">
        <a href="/">Brand</a>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
