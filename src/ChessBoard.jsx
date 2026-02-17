

import React from 'react';
import { Chessboard } from 'react-chessboard'; // Import the Chessboard component
import 'react-chessboard/dist/styles.css'; // Import the chessboard styles

function ChessBoardComponent() {
  // Initial setup for the chessboard (starting positions)
  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  return (
    <div className="chessboard-container">
      <Chessboard
        position={initialBoard} // Set the initial position
        onDrop={(from, to) => console.log(from, to)} // Handle piece drops (for now, it just logs moves)
      />
    </div>
  );
}

export default ChessBoardComponent;
