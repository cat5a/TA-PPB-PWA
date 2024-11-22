// src/components/GameDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetail, setGameDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
          params: { id },
          headers: {
            'x-rapidapi-key': '7529ff1b8amshef286bc9c229661p18b10ajsn40563aa4a62e',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
          },
        });
        setGameDetail(response.data);
      } catch (error) {
        console.error('Error fetching game detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!gameDetail) return <div>No game details found.</div>;

  return (
    <div className="game-detail container">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="game-header">
        <img src={gameDetail.thumbnail} alt={gameDetail.title} className="game-thumbnail" />
        <div>
          <h1>{gameDetail.title}</h1>
          <p><strong>Status:</strong> {gameDetail.status}</p>
          <p><strong>Genre:</strong> {gameDetail.genre}</p>
          <p><strong>Platform:</strong> {gameDetail.platform}</p>
          <p><strong>Developer:</strong> {gameDetail.developer}</p>
          <p><strong>Publisher:</strong> {gameDetail.publisher}</p>
          <p><strong>Release Date:</strong> {gameDetail.release_date}</p>
        </div>
      </div>
      <h2>Description</h2>
      <p>{gameDetail.description}</p>
      {gameDetail.minimum_system_requirements && (
        <>
          <h2>Minimum System Requirements</h2>
          <ul>
            <li><strong>OS:</strong> {gameDetail.minimum_system_requirements.os}</li>
            <li><strong>Processor:</strong> {gameDetail.minimum_system_requirements.processor}</li>
            <li><strong>Memory:</strong> {gameDetail.minimum_system_requirements.memory}</li>
            <li><strong>Graphics:</strong> {gameDetail.minimum_system_requirements.graphics}</li>
            <li><strong>Storage:</strong> {gameDetail.minimum_system_requirements.storage}</li>
          </ul>
        </>
      )}
      {gameDetail.screenshots.length > 0 && (
        <>
          <h2>Screenshots</h2>
          <div className="screenshots">
            {gameDetail.screenshots.map((screenshot) => (
              <img key={screenshot.id} src={screenshot.image} alt="Game screenshot" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GameDetail;
