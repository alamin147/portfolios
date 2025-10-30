import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import FallingStarGame from './game/falling-star-game';
import { useToast } from '../hooks/use-toast';
import { IoGameController } from "react-icons/io5";
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const handleGameOver = () => {
    setGameEnded(true);
    toast({
      title: "Game Over!",
      description: `Final score: ${score}`,
    });
  };

  const handleRestart = () => {
    setScore(0);
    setGameEnded(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-background to-background" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sky-500/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 70%)',
          }}
        />
        {/* Animated stars background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/50 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, '100vh'],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <motion.h1
          className="text-7xl sm:text-8xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            duration: 0.8
          }}
        >
          4
          <IoGameController className="inline-block w-16 h-16 sm:w-20 sm:h-20 text-sky-400 mb-2" />
          4
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-xl sm:text-2xl mb-4 text-white/90">Oops! Page not found, but here's a game to cheer you up!</p>
          <p className="text-sm sm:text-base mb-8 text-white/70">
            Use your mouse or touch to move the player and catch the falling stars!
          </p>
        </motion.div>

        <div className="mb-8">
          {!gameStarted ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setGameStarted(true)}
                size="lg"
                className="glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Start Game
              </Button>
            </motion.div>
          ) : (
            <div className="relative w-[300px] sm:w-[350px] h-[400px] sm:h-[450px] mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full border-2 border-sky-500/30 rounded-lg overflow-hidden backdrop-blur-sm bg-background/40 shadow-xl shadow-sky-500/10"
              >
                <div className="absolute top-4 left-4 z-10 bg-background/80 px-3 py-1.5 rounded-full border border-sky-500/30 backdrop-blur-sm">
                  <span className="text-white/90">Score: </span>
                  <span className="text-sky-400 font-bold">{score}</span>
                </div>
                {gameEnded ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md"
                  >
                    <p className="text-3xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">Game Over!</p>
                    <p className="text-xl mb-6 text-white/90">Final Score: {score}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleRestart}
                        size="lg"
                        className="glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                      >
                        Play Again
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <FallingStarGame
                    onScoreChange={setScore}
                    gameOver={handleGameOver}
                  />
                )}
              </motion.div>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="glass-card text-white hover:text-cyan-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
