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
            <div className="diag
// WIP