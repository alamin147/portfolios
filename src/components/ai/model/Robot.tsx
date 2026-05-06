import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader } from 'lucide-react';


export function Robot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'user' | 'bot' }[]>([
    { id: '1', text: 'Hey there! I can answer about Al Amin', sender: 'bot' }
  ]);
  const [isBlownAway, setIsBlownAway] = useState(false);
  const [botPosition, setBotPosition] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Wind blow physics - natural flying around screen
  useEffect(() => {
    if (!isBlownAway) {
      setBotPosition({ x: 0, y: 0 });
      return;
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let currentX = 0;
    let currentY = 0;
    let velocityX = -8 + Math.random() * 3;
    let velocityY = -5 + Math.random() * 2;
    let time = 0;

    const windInterval = setInterval(() => {
      time += 0.016; // ~60fps

      // Target direction: top-left (center-ish)
      const targetX = -screenWidth * 0.3;
      const targetY = -screenHeight * 0.2;

      // Calculate direction to target
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 50) {
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Wind force towards target with some variation
        const windStrength = Math.sin(time * 0.8) * 0.4 + 0.8;
        velocityX += dirX * windStrength * 0.2;
        velocityY += dirY * windStrength * 0.2;
      }

      // Smooth air resistance
      velocityX *= 0.95;
      velocityY *= 0.95;

      // Soft boundary bouncing
      const margin = 100;
      if (currentX < -screenWidth + margin) {
        velocityX = Math.abs(velocityX) * 0.5;
        currentX = -screenWidth + margin;
      }
      if (currentY < -screenHeight + margin) {
        velocityY = Math.abs(velocityY) * 0.5;
        currentY = -screenHeight + margin;
      }
      if (currentX > margin) {
        velocityX = -Math.abs(velocityX) * 0.5;
        currentX = margin;
      }
      if (currentY > margin) {
        velocityY = -Math.abs(velocityY) * 0.5;
        currentY = margin;
      }

      currentX += velocityX;
      currentY += velocityY;

      setBotPosition({ x: currentX, y: currentY });
    }, 16);

    const returnTimeout = setTimeout(() => {
      setIsBlownAway(false);
      setBotPosition({ x: 0, y: 0 });
    }, 5000);

    return () => {
      clearInterval(windInterval);
      clearTimeout(returnTimeout);
    };
  }, [isBlownAway]);

  // Control waving based on dialog state
  useEffect(() => {
    setIsWaving(!isOpen);
  }, [isOpen]);

  // Periodic speech bubble - shows for 5 seconds, hides for 30 seconds, repeats
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      return;
    }

    // Show bubble initially
    setShowBubble(true);

    const hideBubble = setTimeout(() => {
      setShowBubble(false);
    }, 5000); // Hide after 5 seconds

    const showAgain = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000); // Show for 5 seconds
    }, 35000); // Every 35 seconds (30 hidden + 5 shown)

    return () => {
      clearTimeout(hideBubble);
      clearInterval(showAgain);
    };
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    const userId = Date.now().toString();
    setMessages((prev) => [...prev, { id: userId, text: userMessage, sender: 'user' }]);
    setMessage('');
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const result = await res.json();
      const botMessage = typeof result?.message === 'string' ? result.message : 'No response received.';

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botMessage, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-x-4 bottom-4 sm:bottom-32 sm:right-6 sm:left-auto sm:w-96 h-[60vh] sm:h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-slate-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-xl">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 dark:from-slate-800 to-white dark:to-slate-900">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 dark:bg-cyan-700 text-white rounded-br-none'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-300 dark:border-slate-600'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-none border border-gray-300 dark:border-slate-600 px-4 py-3 flex items-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Actions */}
            <div className="px-4 py-2">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => setIsBlownAway(true), 300);
                  }}
                  className="text-xs px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-600 dark:to-teal-600 text-white rounded-full hover:from-cyan-600 hover:to-teal-600 dark:hover:from-cyan-700 dark:hover:to-teal-700 transition-all shadow-sm"
                >
                  Blow me away!
                </button>
                <button
                  onClick={() => {
                    setMessages((prev) => [
                      ...prev,
                      { id: Date.now().toString(), text: 'Tell me about this website', sender: 'user' },
                    ]);
                    setTimeout(() => {
                      setMessages((prev) => [
                        ...prev,
                        { id: (Date.now() + 1).toString(), text: 'This website showcases amazing features! Feel free to explore around.', sender: 'bot' },
                      ]);
                    }, 600);
                  }}
                  className="text-xs px-3 py-1.5 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-gray-100 rounded-full hover:bg-gray-400 dark:hover:bg-slate-500 transition-all"
                >
                  About this site
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 min-w-0 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 text-sm disabled:opacity-50 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-800 text-white p-2 sm:p-3 rounded-full transition flex items-center justify-center disabled:opacity-50"
                >
                  {isLoading ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot Widget */}
      <motion.div
        animate={{ x: botPosition.x, y: botPosition.y, rotate: isBlownAway ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="fixed bottom-6 right-6 z-40"
        onHoverStart={() => !isOpen && setIsBlownAway(false)}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative focus:outline-none group"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Metallic Robot - Smaller Size */}
          <svg
            viewBox="-15 -10 145 175"
            className="w-16 h-20 drop-shadow-2xl overflow-visible"
            style={{ filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.35))', overflow: 'visible' }}
          >
            {/* ===== GRADIENTS FOR METALLIC LOOK ===== */}
            <defs>
              {/* Metallic silver gradient for head */}
              <linearGradient id="metalHead" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0f0f0" />
                <stop offset="25%" stopColor="#d8d8d8" />
                <stop offset="50%" stopColor="#c0c0c0" />
                <stop offset="75%" stopColor="#a8a8a8" />
                <stop offset="100%" stopColor="#909090" />
              </linearGradient>
              {/* Metallic body gradient */}
              <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="30%" stopColor="#d0d0d0" />
                <stop offset="70%" stopColor="#b0b0b0" />
                <stop offset="100%" stopColor="#888888" />
              </linearGradient>
              {/* Dark screen gradient */}
              <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a2a40" />
                <stop offset="100%" stopColor="#0a1520" />
              </linearGradient>
              {/* Cyan glow for eyes */}
              <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="60%" stopColor="#00bcd4" />
                <stop offset="100%" stopColor="#0097a7" />
              </radialGradient>
              {/* Arm metallic */}
              <linearGradient id="metalArm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c8c8c8" />
                <stop offset="50%" stopColor="#a0a0a0" />
                <stop offset="100%" stopColor="#787878" />
              </linearGradient>
              {/* Highlight reflection */}
              <linearGradient id="highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            {/* ===== ROUND HEAD ===== */}
            {/* Main head - rounded oval shape */}
            <ellipse cx="65" cy="50" rx="42" ry="38" fill="url(#metalHead)" stroke="#888" strokeWidth="1.5" />

            {/* Head highlight reflection */}
            <ellipse cx="50" cy="35" rx="20" ry="12" fill="url(#highlight)" />

            {/* Ear piece left */}
            <ellipse cx="26" cy="50" rx="6" ry="10" fill="url(#metalBody)" stroke="#777" strokeWidth="1" />

            {/* Ear piece right */}
            <ellipse cx="104" cy="50" rx="5" ry="9" fill="url(#metalBody)" stroke="#777" strokeWidth="1" />

            {/* Face Screen - Rounded */}
            <ellipse cx="65" cy="52" rx="30" ry="26" fill="url(#screenGradient)" stroke="#445566" strokeWidth="1.5" />

            {/* ===== PIXEL-STYLE EYES ===== */}
            {/* Left Eye - Grid pattern like reference */}
            <g>
              <rect x="42" y="42" width="14" height="14" rx="2" fill="url(#eyeGlow)" />
              {/* Pixel details */}
              <rect x="44" y="44" width="3" height="3" fill="#004d5a" />
              <rect x="48" y="44" width="3" height="3" fill="#004d5a" />
              <rect x="52" y="44" width="3" height="3" fill="#004d5a" />
              <rect x="44" y="48" width="3" height="3" fill="#004d5a" />
              <rect x="52" y="48" width="3" height="3" fill="#004d5a" />
              <rect x="44" y="52" width="3" height="3" fill="#004d5a" />
              <rect x="48" y="52" width="3" height="3" fill="#004d5a" />
              <rect x="52" y="52" width="3" height="3" fill="#004d5a" />
            </g>

            {/* Right Eye - Grid pattern */}
            <g>
              <rect x="74" y="42" width="14" height="14" rx="2" fill="url(#eyeGlow)" />
              {/* Pixel details */}
              <rect x="76" y="44" width="3" height="3" fill="#004d5a" />
              <rect x="80" y="44" width="3" height="3" fill="#004d5a" />
              <rect x="84" y="44" width="3" height="3" fill="#004d5a" />
              <rect x="76" y="48" width="3" height="3" fill="#004d5a" />
              <rect x="84" y="48" width="3" height="3" fill="#004d5a" />
              <rect x="76" y="52" width="3" height="3" fill="#004d5a" />
              <rect x="80" y="52" width="3" height="3" fill="#004d5a" />
              <rect x="84" y="52" width="3" height="3" fill="#004d5a" />
            </g>

            {/* ===== SMILE ===== */}
            <path
              d="M 50 66 Q 65 76 80 66"
              stroke="#00e5ff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* ===== ANTENNA ===== */}
            <line x1="65" y1="12" x2="65" y2="0" stroke="#666" strokeWidth="2" strokeLinecap="round" />
            <circle cx="65" cy="-2" r="4" fill="#00e5ff">
              <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
            </circle>

            {/* ===== BODY - Rounded Triangle (No Legs) ===== */}
            {/* Main body - tapers down like a rounded triangle */}
            <path
              d="M 30 88
                 Q 25 95 28 110
                 Q 35 150 65 155
                 Q 95 150 102 110
                 Q 105 95 100 88
                 Q 85 85 65 85
                 Q 45 85 30 88 Z"
              fill="url(#metalBody)"
              stroke="#777"
              strokeWidth="1.5"
            />

            {/* Body highlight */}
            <ellipse cx="55" cy="100" rx="18" ry="10" fill="url(#highlight)" />

            {/* Chest vent/detail */}
            <rect x="50" y="100" width="30" height="20" rx="6" fill="url(#screenGradient)" opacity="0.8" />
            {/* Vent lines */}
            <line x1="55" y1="105" x2="75" y2="105" stroke="#334455" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="110" x2="75" y2="110" stroke="#334455" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="115" x2="75" y2="115" stroke="#334455" strokeWidth="2" strokeLinecap="round" />

            {/* ===== RIGHT ARM (Relaxed by side) ===== */}
            <ellipse cx="105" cy="100" rx="8" ry="12" fill="url(#metalArm)" stroke="#666" strokeWidth="0.5" />
            <ellipse cx="110" cy="118" rx="6" ry="10" fill="url(#metalArm)" stroke="#666" strokeWidth="0.5" />
            <circle cx="112" cy="130" r="6" fill="url(#metalBody)" stroke="#666" strokeWidth="0.5" />

            {/* ===== WAVING ARM (LEFT - Raised Up, Waving) ===== */}
            <g
              style={{
                transformOrigin: '25px 90px',
                animation: isWaving ? 'waveUp 1.2s ease-in-out infinite' : 'none',
              }}
            >
              {/* Upper Arm Segment */}
              <ellipse cx="22" cy="70" rx="8" ry="12" fill="url(#metalArm)" stroke="#666" strokeWidth="0.5" />
              {/* Joint */}
              <circle cx="18" cy="55" r="5" fill="url(#metalBody)" stroke="#666" strokeWidth="0.5" />
              {/* Lower Arm */}
              <ellipse cx="12" cy="40" rx="6" ry="10" fill="url(#metalArm)" stroke="#666" strokeWidth="0.5" />
              {/* Hand */}
              <circle cx="10" cy="28" r="7" fill="url(#metalBody)" stroke="#666" strokeWidth="0.5" />
              {/* Metallic highlight on hand */}
              <ellipse cx="8" cy="26" rx="3" ry="2" fill="url(#highlight)" />
            </g>
          </svg>

          {/* Floating Speech Bubble - Periodic Reminder */}
          <AnimatePresence>
            {!isOpen && showBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.3, y: { duration: 2, repeat: Infinity } }}
                className="absolute -top-8 -left-20 bg-gradient-to-r from-slate-700 to-slate-800 text-cyan-400 text-[10px] font-bold px-2 py-1.5 rounded-lg whitespace-nowrap shadow-lg border border-slate-600"
                style={{
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                Hi! Ask me about Al Amin!
                {/* Speech bubble tail pointing to robot */}
                <div className="absolute -bottom-1.5 right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800" />
              </motion.div>
            )}
          </AnimatePresence>


        </motion.button>
      </motion.div>

      {/* Wave Animation Keyframes */}
      <style>{`
        @keyframes waveUp {
          0% {
            transform: rotateZ(0deg);
          }
          25% {
            transform: rotateZ(-15deg);
          }
          50% {
            transform: rotateZ(15deg);
          }
          75% {
            transform: rotateZ(-10deg);
          }
          100% {
            transform: rotateZ(0deg);
          }
        }
      `}</style>
    </>
  );
}
