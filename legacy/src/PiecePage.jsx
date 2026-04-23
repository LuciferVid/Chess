import React from 'react';

function PiecePage({ piece }) {
  return (
    <div className="piece-page">
      <h1 className="text-5xl text-center">{piece} Piece</h1>
      <p className="description text-xl text-center">
        The {piece} is one of the most important pieces in the game of chess...
        {/* Add detailed descriptions here */}
      </p>
    </div>
  );
}

export default PiecePage;
