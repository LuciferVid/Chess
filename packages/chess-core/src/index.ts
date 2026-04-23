import { Chess, Move } from 'chess.js';

export type GameStatus = 'ongoing' | 'checkmate' | 'draw' | 'stalemate' | 'threefold_repetition' | 'insufficient_material';

export interface GameState {
  fen: string;
  pgn: string;
  history: Move[];
  status: GameStatus;
  turn: 'w' | 'b';
  isCheck: boolean;
}

export const createNewGame = (): GameState => {
  const chess = new Chess();
  return getGameState(chess);
};

export const getGameState = (chess: Chess): GameState => {
  let status: GameStatus = 'ongoing';
  if (chess.isCheckmate()) status = 'checkmate';
  else if (chess.isDraw()) status = 'draw';
  else if (chess.isStalemate()) status = 'stalemate';
  else if (chess.isThreefoldRepetition()) status = 'threefold_repetition';
  else if (chess.isInsufficientMaterial()) status = 'insufficient_material';

  return {
    fen: chess.fen(),
    pgn: chess.pgn(),
    history: chess.history({ verbose: true }),
    status,
    turn: chess.turn(),
    isCheck: chess.isCheck(),
  };
};

export const validateMove = (fen: string, move: string | { from: string; to: string; promotion?: string }): Move | null => {
  const chess = new Chess(fen);
  try {
    return chess.move(move);
  } catch (e) {
    return null;
  }
};
