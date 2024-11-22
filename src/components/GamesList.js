// src/components/GamesList.js
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GamesList.css';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search') || '';

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
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.search.value;
    navigate(`/games?search=${query}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="games-list-page">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search for a game..."
          defaultValue={searchQuery}
        />
        <button type="submit">Search</button>
      </form>
      <div className="games-list">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.thumbnail} alt={game.title} className="game-thumbnail" />
            <h3>{game.title}</h3>
            <p>{game.short_description}</p>
            <button onClick={() => navigate(`/game/${game.id}`)}>Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesList;
