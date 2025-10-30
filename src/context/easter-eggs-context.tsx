import React, { createContext, useContext, useState, useEffect } from 'react';

interface EasterEggsContextType {
  isGameActive: boolean;
  activateGame: () => void;
  deactivateGame: () => void;
  gameScore: number;
  updateGameScore: (score: number) => void;
}

const EasterEggsContext = createContext<EasterEggsContextType | undefined>(undefined);

export const useEasterEggs = () => {
  const context = useContext(EasterEggsContext);
  if (!context) {
    throw new Error('useEasterEggs must be used within an EasterEggsProvider');
  }
  return context;
};

export const EasterEggsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(() => {
    const saved = localStorage.getItem('rocketGameScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [konami, setKonami] = useState<string[]>([]);
  // Persist score to localStorage
  useEffect(() => {
    localStorage.setItem('rocketGameScore', gameScore.toString());
  }, [gameScore]);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);

      if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
        setIsGameActive(true);
        setKonami([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  const value = {
    isGameActive,
    activateGame: () => setIsGameActive(true),
    deactivateGame: () => setIsGameActive(false),
    gameScore,
    updateGameScore: (score: number) => setGameScore(score),
  };

  return (
    <EasterEggsContext.Provider value={value}>
      {children}
    </EasterEggsContext.Provider>
  );
};
