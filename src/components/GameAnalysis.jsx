import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import './GameAnalysis.css';

const FAMOUS_GAMES = [
  {
    id: 'opera',
    title: 'The Opera Game',
    players: 'Paul Morphy vs Duke Karl / Count Isouard',
    year: '1858',
    description: 'One of the most famous chess games ever played, where Morphy demonstrated the importance of development and piece coordination.',
    pgn: '1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5 6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5 11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6 15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8#',
    key_positions: [7, 11, 16],
    key_insights: [
      'Morphy develops all his pieces quickly while his opponents lag behind',
      'The sacrifice Nxb5 creates a devastating attack',
      'The final combination leads to a beautiful back-rank checkmate'
    ]
  },
  {
    id: 'immortal',
    title: 'The Immortal Game',
    players: 'Adolf Anderssen vs Lionel Kieseritzky',
    year: '1851',
    description: 'Famous for its bold sacrifices and brilliant finish, this game epitomizes the attacking style of the Romantic era.',
    pgn: '1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5
// WIP