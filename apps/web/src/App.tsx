import { useState, useCallback, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { motion } from 'framer-motion';
import { Button } from '@chess/ui';
import { useAIHint } from '@chess/ai-client';
import { Sidebar } from './components/Sidebar';
import { CoachOverlay } from './components/CoachOverlay';
import { clsx } from 'clsx';
import { BookOpen } from 'lucide-react';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { useAuthStore } from './store/authStore';
import bgVideo from './assets/bg-video.mp4';

const PlayPage = () => {
  const [game, setGame] = useState(new Chess());
  const { hint, loading, getHint } = useAIHint();

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      if (move === null) return false;
      setGame(new Chess(game.fen()));
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 ml-64 min-h-screen relative z-10">
      <div className="flex gap-12 items-start max-w-7xl w-full">
        <div className="flex-1 max-w-[650px] aspect-square shadow-[0_0_100px_rgba(245,197,24,0.15)] rounded-2xl overflow-hidden border-8 border-white/5 relative group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
          <Chessboard 
            position={game.fen()} 
            onPieceDrop={onDrop}
            boardOrientation="white"
            customDarkSquareStyle={{ backgroundColor: '#1e293b' }}
            customLightSquareStyle={{ backgroundColor: '#cbd5e1' }}
          />
        </div>

        <div className="w-96 flex flex-col gap-6">
          <div className="glass p-8 rounded-3xl border-primary/20 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(245,197,24,0.5)]" />
              MATCH STATUS
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-muted-foreground font-bold text-xs uppercase tracking-widest">State</span>
                <span className="text-3xl font-black text-primary leading-none">
                  {game.isCheckmate() ? 'WINNER' : game.isCheck() ? 'CHECK' : 'PLAYING'}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={clsx(
                  "h-full transition-all duration-1000",
                  game.turn() === 'w' ? "bg-primary w-full" : "bg-white/20 w-full"
                )} />
              </div>
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
                {game.turn() === 'w' ? "White to move" : "Black to move"}
              </p>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border-primary/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen size={64} />
            </div>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(245,197,24,0.5)]" />
              AI COACH
            </h2>
            <Button 
              className="w-full py-6 text-lg" 
              onClick={() => getHint(game.fen(), game.history())}
              disabled={loading}
            >
              {loading ? 'ANALYZING...' : 'GET TACTICAL HINT'}
            </Button>
            {hint && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-primary/10 p-5 rounded-2xl border border-primary/30"
              >
                <p className="text-sm font-medium text-foreground/90 italic leading-relaxed">
                  "{hint}"
                </p>
              </motion.div>
            )}
          </div>

          <Button variant="ghost" className="w-full opacity-50 hover:opacity-100" onClick={() => setGame(new Chess())}>
            Resign / Reset
          </Button>
        </div>
      </div>
      
      <CoachOverlay 
        message={hint || "Focus on the game, I'm watching every move."} 
        emotion={game.isCheck() ? 'surprised' : 'neutral'}
        isSpeaking={loading}
      />
    </div>
  );
};

const DashboardPage = () => (
  <div className="ml-64 p-12 text-center pt-32 relative z-10">
    <h1 className="text-6xl font-black text-primary mb-4 tracking-tighter">DASHBOARD</h1>
    <p className="text-muted-foreground text-xl">Welcome back, Grandmaster.</p>
    <div className="grid grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
      {[1, 2, 3].map(i => (
        <div key={i} className="glass h-40 rounded-3xl flex items-center justify-center border-white/5">
          <span className="text-white/20 font-bold">Stat Widget {i}</span>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#02040a] text-foreground selection:bg-primary selection:text-primary-foreground overflow-hidden font-inter">
        {/* Background Video */}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="fixed inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125 pointer-events-none"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        
        {/* Overlay Gradients */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-transparent to-background/80 pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#02040a_80%)] pointer-events-none" />

        {isAuthenticated && <Sidebar />}
        
        <main className="relative">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/play" />} />
            <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/play" />} />
            
            <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
            <Route path="/play" element={isAuthenticated ? <PlayPage /> : <Navigate to="/login" />} />
            
            <Route path="/learn" element={<Navigate to="/play" />} />
            <Route path="/leaderboard" element={<Navigate to="/play" />} />
            <Route path="/profile" element={<Navigate to="/play" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
