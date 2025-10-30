import { useEffect, useState } from 'react';
import { GoGear } from "react-icons/go";
interface InitialLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const InitialLoader = ({ onComplete, duration = 10 }: InitialLoaderProps) => {
  const [,setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 200, 70);

      setProgress(currentProgress);

      if (currentProgress < 70) {
        requestAnimationFrame(animate);
      } else {
        onComplete?.(); // Instant transition, no delay
      }
    };

    requestAnimationFrame(animate);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center overflow-hidden">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="relative flex flex-col items-center" style={{ minHeight: '250px' }}>
        <div className="text-cyan-500 font-mono text-xl absolute top-20 left-1/2 -translate-x-1/2">
          compiling<span className="inline-block w-4 overflow-hidden">
            <span className="animate-[dots_2s_steps(4,_end)_infinite]">...</span>
          </span>
        </div>

      <GoGear
        className="absolute left-1/2 top-[60%] -translate-x-1/2 text-green-500 animate-spin-slow"
        style={{ animation: 'spin 2s linear infinite' }}
        size={80}
        />
      <GoGear
        className="absolute left-[calc(50%-45px)] top-[calc(60%+65px)] text-cyan-500 animate-spin-medium"
        style={{ animation: 'spin 2s linear infinite reverse' }}
        size={60}
        />
      <GoGear
        className="absolute left-[calc(50%+10px)] top-[calc(60%+50px)] text-red-500 animate-spin-fast"
        style={{ animation: 'spin 2.5s linear infinite reverse' }}
        size={60}
        />
        </div>
    </div>
  );
};

export default InitialLoader;
