import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pieces.css';

const Bishop = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`piece-container bishop ${isLoaded ? 'loaded' : ''}`}>
      <h1>♗ Bishop</h1>
      
      <div className="piece-content-grid">
        <div className="piece-image-section">
          <img 
            src="/pieces/Bishop.jpg" 
            alt="Bishop" 
            className="piece-image"
            onLoad={() => setIsLoaded(true)}
          />
          
          <div className="piece-value-indicator">
            <span className="piece-symbol">♗</span>
            <span className="piece-value">3</span>
          </div>
          
          <div className="bishop-movement">
            <div className="diagonal-movement">
              <div className="diagonal diagonal-1"></div>
              <div className="diagonal diagonal-2"></div>
              <div className="bishop-position"></div>
            </div>
            <p className="movement-caption">Bishop moves along diagonals in any direction</p>
          </div>
          
          <div className="tactical-position">
            <img 
              src="/pieces/Bishop-pair.jpg" 
              alt="Bishop pair in action" 
              className="tactical-image"
            />
            <div className="tactic-label">The Power of the Bishop Pair</div>
          </div>
        </div>
        
        <div className="piece-info-section">
          <div className="piece-description">
            <h2>The Diagonal Mover</h2>
            <p>The Bishop moves diagonally across the board, making it excellent at controlling space from a distance. Each player starts with two bishops — one on white squares and one on black squares. They complement the Rook's straight-line movement perfectly.</p>
            
            <div className="movement-description">
              <h3>Movement</h3>
              <p>A Bishop can move any number of squares diagonally in any direction, as long as no piece blocks its path. It's bound to the color of square it starts on — a bishop that begins on a light square can only ever move on light squares, and likewise for dark squares.</p>
            </div>
            
            <div className="special-moves">
              <h3>Unique Characteristics</h3>
              <p>With a value of 3 pawns, the Bishop is considered slightly stronger than a Knight in open positions but may be weaker in closed ones. The "Bishop pair" (having both bishops) is a significant advantage, especially in
// WIP