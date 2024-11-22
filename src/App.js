// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GamesList from './components/GamesList';
import GameDetail from './components/GameDetail';
import AboutPage from './components/AboutPage';
import AdvancedSearch from './components/AdvancedSearch';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/games" element={<GamesList />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
