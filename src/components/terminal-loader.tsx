import { useEffect, useState } from 'react';

interface TerminalLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const TerminalLoader = ({ onComplete, duration = 3000 }: TerminalLoaderProps) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    'Initializing development environment...',
    'Installing dependencies...',
    'Compiling modules...',
    'Optimizing build...',
    'Deploying to production...',
    'Launch successful!'
  ];

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Text animation
    let startTime = Date.now();
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    const textInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        clearInterval(textInterval);
        setText(lines.join('\n'));
        onComplete?.();
        return;
      }

      // Calculate which line we should be on based on progress
      const targetLineIndex = Math.floor(progress * lines.length);

      if (targetLineIndex > currentLineIndex) {
        // Move to next line
        setText(prev => prev + '\n' + lines[currentLineIndex]);
        currentLineIndex = targetLineIndex;
        currentCharIndex = 0;
        setCurrentLine(currentLineIndex);
      } else {
        // Type current line
        const currentLine = lines[currentLineIndex];
        const targetChars = Math.floor((progress * duration / lines.length) % (currentLine.length + 1));
        if (targetChars > currentCharIndex) {
          setText(prev => prev + currentLine[currentCharIndex]);
          currentCharIndex++;
        }
      }
    }, 30);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(textInterval);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="w-full max-w-3xl p-8">
        <div className="bg-black border border-cyan-500 rounded-lg p-4">
          <div className="flex items-center mb-4 border-b border-cyan-800 pb-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-cyan-500 text-sm">portfolio.terminal</div>
          </div>
          <pre className="font-mono text-cyan-500 whitespace-pre-wrap">
            {text}
            <span className={`inline-block w-2 h-4 ml-1 bg-cyan-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
            </span>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;
