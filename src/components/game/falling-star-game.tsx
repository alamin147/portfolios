import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

interface Star {
  id: number;
  x: number;
  y: number;
}

interface Props {
  onScoreChange: (score: number) => void;
  gameOver: () => void;
}

const FallingStarGame: React.FC<Props> = ({ onScoreChange, gameOver }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [playerPosition, setPlayerPosition] = useState(150);
  const [, setScore] = useState(0);
  const [missedStars, setMissedStars] = useState(0);

  const GAME_WIDTH = 300;
  const PLAYER_WIDTH = 40;
  const STAR_SIZE = 24;
  const MAX_MISSED = 3;

  // Handle player movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        const rect = gameContainer.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const newPosition = Math.max(PLAYER_WIDTH/2, Math.min(GAME_WIDTH - PLAYER_WIDTH/2, relativeX));
        setPlayerPosition(newPosition);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const gameContainer = document.getElementById('game-container');
      if (gameContainer) {
        const rect = gameContainer.getBoundingClientRect();
        const relativeX = e.touches[0].clientX - rect.left;
        const newPosition = Math.max(PLAYER_WIDTH/2, Math.min(GAME_WIDTH - PLAYER_WIDTH/2, relativeX));
        setPlayerPosition(newPosition);
      }
    };

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.addEventListener('mousemove', handleMouseMove);
      gameContainer.addEventListener('touchmove', handleTouchMove);

      return () => {
        gameContainer.removeEventListener('mousemove', handleMouseMove);
        gameContainer.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);

  // Generate new stars
  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prevStars => {
        const newStar = {
          id: Date.now(),
          x: Math.random() * (GAME_WIDTH - STAR_SIZE),
          y: -STAR_SIZE
        };
        return [...prevStars, newStar];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Update star positions and check collisions
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setStars(prevStars => {
        const updatedStars = prevStars.map(star => ({
          ...star,
          y: star.y + 3
        }));

        // Check for collisions and remove caught/missed stars
        const remainingStars = updatedStars.filter(star => {
          const playerLeft = playerPosition - PLAYER_WIDTH/2;
          const playerRight = playerPosition + PLAYER_WIDTH/2;

          // Check if star is caught
          if (star.y > 360 && star.y < 380 &&
              star.x > playerLeft && star.x < playerRight) {
            setScore(s => {
              const newScore = s + 1;
              onScoreChange(newScore);
              return newScore;
            });
            return false;
          }

          // Check if star is missed
          if (star.y > 400) {
            setMissedStars(m => {
              const newMissed = m + 1;
              if (newMissed >= MAX_MISSED) {
                gameOver();
              }
              return newMissed;
            });
            return false;
          }

          return true;
        });

        return remainingStars;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [playerPosition, onScoreChange, gameOver]);

  return (
    <div
      id="game-container"
      className="relative w-full h-full overflow-hidden cursor-none"
    >
      {/* Stars */}
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              left: star.x,
              top: star.y,
              width: STAR_SIZE,
              height: STAR_SIZE
            }}
          >
            <Star className="text-yellow-300 w-6 h-6 drop-shadow-glow" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Player */}
      <motion.div
        className="absolute bottom-4"
        style={{
          x: playerPosition - PLAYER_WIDTH/2,
          width: PLAYER_WIDTH,
          height: PLAYER_WIDTH
        }}
      >
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50">
          <span className="text-2xl">🕹️</span>
        </div>
      </motion.div>

      {/* Lives */}
      <div className="absolute top-2 right-2 flex gap-1">
        {Array.from({ length: MAX_MISSED - missedStars }).map((_, i) => (
          <span key={i} className="text-red-500 drop-shadow-glow">❤️</span>
        ))}
      </div>
    </div>
  );
};

export default FallingStarGame;
