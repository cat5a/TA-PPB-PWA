// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUnorderedList, AiOutlineSearch, AiOutlineInfoCircle } from 'react-icons/ai';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item">
        <AiOutlineHome size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/games" className="nav-item">
        <AiOutlineUnorderedList size={24} />
        <span>Games</span>
      </NavLink>
      <NavLink to="/advanced-search" className="nav-item">
        <AiOutlineSearch size={24} />
        <span>Search</span>
      </NavLink>
      <NavLink to="/about" className="nav-item">
        <AiOutlineInfoCircle size={24} />
        <span>About</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
