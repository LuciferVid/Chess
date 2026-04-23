import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Volume2, ShieldAlert } from 'lucide-react';

interface CoachOverlayProps {
  message: string;
  emotion?: 'happy' | 'angry' | 'surprised' | 'neutral';
  isSpeaking?: boolean;
}

export const CoachOverlay: React.FC<CoachOverlayProps> = ({ 
  message, 
  emotion = 'neutral', 
  isSpeaking = false 
}) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 right-8 w-80 glass rounded-2xl shadow-2xl overflow-hidden border border-primary/30 z-50"
        >
          <div className="bg-primary/10 p-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                M
              </div>
              <span className="font-bold text-sm">Magnus (AI Coach)</span>
            </div>
            {isSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Volume2 className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </div>
          <div className="p-4">
            <p className="text-sm leading-relaxed text-foreground/90 italic">
              "{message}"
            </p>
          </div>
          <div className="px-4 pb-4 flex gap-2">
            <span className="text-[10px] uppercase tracking-widest text-primary/50 font-bold">
              Status: {emotion}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
