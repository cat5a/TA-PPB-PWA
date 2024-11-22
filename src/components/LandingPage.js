// src/components/LandingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiGamepad } from 'react-icons/gi'; // Import a gaming-related icon
import './LandingPage.css';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/games?search=${searchQuery}`);
  };

  return (
    <div className="landing-page">
      <GiGamepad size={80} className="landing-icon" />
      <h1>GratisBay</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default LandingPage;
