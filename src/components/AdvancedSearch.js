import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdvancedSearch.css';

const AdvancedSearch = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    platform: '',
    publisher: '',
    developer: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
          headers: {
            'x-rapidapi-key': '7529ff1b8amshef286bc9c229661p18b10ajsn40563aa4a62e',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          },
        });
        setGames(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = games.filter((game) => {
      return (
        (!filters.genre || game.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
        (!filters.platform || game.platform.toLowerCase().includes(filters.platform.toLowerCase())) &&
        (!filters.publisher || game.publisher.toLowerCase().includes(filters.publisher.toLowerCase())) &&
        (!filters.developer || game.developer.toLowerCase().includes(filters.developer.toLowerCase()))
      );
    });
    setFilteredGames(filtered);
  };

  return (
    <div className="advanced-search container">
      <h1>Advanced Search</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Platform"
          name="platform"
          value={filters.platform}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Publisher"
          name="publisher"
          value={filters.publisher}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          placeholder="Developer"
          name="developer"
          value={filters.developer}
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="games-list">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-card">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="game-thumbnail"
              onClick={() => navigate(`/game/${game.id}`)}
            />
            <h3>{game.title}</h3>
            <p>{game.short_description}</p>
            <button onClick={() => navigate(`/game/${game.id}`)}>Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;
