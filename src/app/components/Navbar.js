"use client";

import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="bg-color-400 navbar sticky top-0 z-50">
      <div className="navbar-brand justify-between items-center px-4 w-full hidden md:flex">
        <a href="/" className='block' style={{ margin: "1rem 0" }}>
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
        </a>
      </div>
      <div className={`navbar-menu pl-0 p-6 md:p-0`}>
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
