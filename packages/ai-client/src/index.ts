import { useState, useCallback } from 'react';

export const useAIHint = (backendUrl: string = '/api') => {
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getHint = useCallback(async (fen: string, history: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/ai/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen, history })
      });
      
      if (!response.ok) throw new Error('Failed to fetch hint');
      
      const data = await response.json();
      setHint(data.hint);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  return { hint, loading, error, getHint };
};
