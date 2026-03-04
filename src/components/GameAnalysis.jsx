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
    pgn: '1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6 7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6 13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2 18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6 23. Be7#',
    key_positions: [12, 18, 22],
    key_insights: [
      'Anderssen sacrifices material for rapid development and attacking chances',
      'The Queen and Rook sacrifices demonstrate incredible tactical vision',
      'The final Bishop mate shows the importance of piece coordination'
    ]
  },
  {
    id: 'evergreen',
    title: 'The Evergreen Game',
    players: 'Adolf Anderssen vs Jean Dufresne',
    year: '1852',
    description: 'Named "The Evergreen" for its timeless beauty, this game features sacrifices and a stunning final position.',
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O d3 8. Qb3 Qf6 9. e5 Qg6 10. Re1 Nge7 11. Ba3 b5 12. Qxb5 Rb8 13. Qa4 Bb6 14. Nbd2 Bb7 15. Ne4 Qf5 16. Bxd3 Qh5 17. Nf6+ gxf6 18. exf6 Rg8 19. Rad1 Qxf3 20. Rxe7+ Nxe7 21. Qxd7+ Kxd7 22. Bf5+ Ke8 23. Bd7+ Kf8 24. Bxe7#',
    key_positions: [10, 17, 23],
    key_insights: [
      'Anderssen sacrifices a bishop to create a powerful attack',
      'The knight sacrifice on f6 opens up the king position',
      'The final checkmate pattern with the bishop pair is extraordinary'
    ]
  }
];

const GameAnalysis = () => {
  const [selectedGame, setSelectedGame] = useState(FAMOUS_GAMES[0]);
  const [game, setGame] = useState(new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [moveHistory, setMoveHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [boardWidth, setBoardWidth] = useState(500);
  const [userMode, setUserMode] = useState(false);
  const [userGame, setUserGame] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [lastCorrectMove, setLastCorrectMove] = useState(null);

  useEffect(() => {
    // Responsive board sizing
    const handleResize = () => {
      const width = Math.min(
        window.innerWidth < 768 ? window.innerWidth - 40 : window.innerWidth * 0.5,
        600
      );
      setBoardWidth(width);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadGame(selectedGame);
  }, [selectedGame]);

  const loadGame = (gameData) => {
    const newGame = new Chess();
    const moves = gameData.pgn.split(' ').filter(move => !move.includes('.'));
    setMoveHistory(moves);
    setCurrentMoveIndex(0);
    setGame(newGame);
    setUserMode(false);
    setFeedback('');
    setLastCorrectMove(null);
    
    // Initialize user game
    const userGameInstance = new Chess();
    setUserGame(userGameInstance);
  };

  const makeMove = (moveIndex) => {
    const newGame = new Chess();
    const moves = mov
// WIP