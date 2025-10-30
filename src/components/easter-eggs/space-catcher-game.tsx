import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpaceObject {
  id: number;
  x: number;
  y: number;
  type: 'star' | 'meteor' | 'satellite';
  speed: number;
}

interface Props {
  onScoreChange?: (score: number) => void;
  isActive: boolean;
  onClose: () => void;
}

const SpaceCatcherGame: React.FC<Props> = ({ onScoreChange, isActive, onClose }) => {
  const [score, setScore] = useState(0);
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [playerPosition, setPlayerPosition] = useState(50);
  const [level, setLevel] = useState(1);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(null);
  const lastSpawnTimeRef = useRef(Date.now());
  const frameCountRef = useRef(0);

  // Game configuration based on level
  const gameConfig = {
    baseSpawnInterval: Math.max(3000 - (level * 200), 1000), // Gradually decrease spawn time
    starSpeed: 0.5 + (level * 0.1),  // Stars move slower
    meteorSpeed: 0.8 + (level * 0.15), // Meteors move faster
    playerWidth: 15,  // More forgiving hitbox
    pointsPerStar: 10,
    pointsPerMeteor: 15,
  };

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!gameAreaRef.current) return;
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setPlayerPosition(Math.min(Math.max(x, 0), 100));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const spawnSpaceObject = () => {
      const now = Date.now();
      if (now - lastSpawnTimeRef.current > gameConfig.baseSpawnInterval) {
        const isDoubleStar = Math.random() < 0.2; // 20% chance for double star spawn
        const spawnObjects = isDoubleStar ? 2 : 1;

        for (let i = 0; i < spawnObjects; i++) {
          const isStar = Math.random() > 0.4; // 60% chance for stars
          const randomSpread = isDoubleStar ? (i === 0 ? -20 : 20) : 0;
          const newObject: SpaceObject = {
            id: now + i,
            x: Math.random() * 80 + 10 + randomSpread, // Keep away from edges
            y: 0,
            type: isStar ? 'star' : 'meteor',
            speed: isStar ? gameConfig.starSpeed : gameConfig.meteorSpeed,
          };
          setSpaceObjects(prev => [...prev, newObject]);
        }
        lastSpawnTimeRef.current = now;
      }
    };

    const updateGame = () => {
      frameCountRef.current++;

      // Update level based on score
      if (frameCountRef.current % 60 === 0) { // Check every second (assuming 60fps)
        const newLevel = Math.floor(score / 100) + 1;
        if (newLevel !== level) {
          setLevel(newLevel);
        }
      }

      spawnSpaceObject();
      setSpaceObjects(prev => {
        return prev.filter(obj => {
          // Check collision with player
          if (obj.y > 80 && obj.y < 95) { // More forgiving vertical collision range
            if (Math.abs(obj.x - playerPosition) < gameConfig.playerWidth) {
              setScore(s => {
                const points = obj.type === 'star' ? gameConfig.pointsPerStar : gameConfig.pointsPerMeteor;
                const newScore = s + points;
                onScoreChange?.(newScore);
                return newScore;
              });
              return false;
            }
          }
          // Remove if past bottom
          if (obj.y > 100) return false;

          // Update position with smoother movement
          obj.y += obj.speed * (1 + Math.sin(frameCountRef.current * 0.05) * 0.1); // Add slight wave motion
          return true;
        });
      });

      animationFrameRef.current = requestAnimationFrame(updateGame);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    animationFrameRef.current = requestAnimationFrame(updateGame);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, onScoreChange, playerPosition]);

  if (!isActive) return null;

  return (
    <div
      ref={gameAreaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        overflow: 'hidden'
      }}
    >
      <div className="game-hud" style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: '#fff',
        textAlign: 'right'
      }}>
        <div style={{
          fontSize: '24px',
          marginBottom: '10px'
        }}>
          Score: {score}
        </div>
        <div style={{
          fontSize: '18px',
          color: '#8be9fd'
        }}>
          Level: {level}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span>✕</span>
        <span>Exit Game</span>
      </button>

      {spaceObjects.map(obj => (
        <motion.div
          key={obj.id}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            position: 'absolute',
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: obj.type === 'star' ? '24px' : '32px',
          }}
        >
          {obj.type === 'star' ? '⭐' : '☄️'}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '20px',
            background: obj.type === 'star' ?
              'linear-gradient(to bottom, rgba(255,255,0,0.5), transparent)' :
              'linear-gradient(to bottom, rgba(255,100,100,0.5), transparent)',
            opacity: 0.5
          }} />
        </motion.div>
      ))}

      <motion.div
        animate={{
          x: [-2, 2],
          y: [-1, 1],
          transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 0.5
          }
        }}
        style={{
          position: 'absolute',
          left: `${playerPosition}%`,
          bottom: '5%',
          transform: 'translate(-50%, 0)',
          fontSize: '40px',
          filter: 'drop-shadow(0 0 10px rgba(0,149,255,0.5))'
        }}
      >
        🛸
      </motion.div>
    </div>
  );
};

export default SpaceCatcherGame;
