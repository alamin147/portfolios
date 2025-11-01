import { useEffect, useRef } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const circleRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse position
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      // Initialize circle position if it hasn't been set yet
      if (circleRef.current.x === 0 && circleRef.current.y === 0) {
        circleRef.current = {
          x: e.clientX,
          y: e.clientY
        };
      }
    };

    // Handle mouse leaving window
    const onMouseLeave = () => {
      mouseRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2
      };
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth movement with balanced speed
      const ease = 0.03; // Balanced value for smooth but responsive trailing
      circleRef.current.x += (mouseRef.current.x - circleRef.current.x) * ease;
      circleRef.current.y += (mouseRef.current.y - circleRef.current.y) * ease;

      // Draw larger glowing circle
      const gradient = ctx.createRadialGradient(
        circleRef.current.x,
        circleRef.current.y,
        0,
        circleRef.current.x,
        circleRef.current.y,
        40  // Increased glow radius from 20 to 40
      );
      gradient.addColorStop(0, 'rgba(64, 224, 208, 0.9)');  // Slightly more opaque core
      gradient.addColorStop(0.4, 'rgba(64, 224, 208, 0.4)'); // Adjusted middle
      gradient.addColorStop(1, 'rgba(64, 224, 208, 0)');    // Transparent edge

      ctx.beginPath();
      ctx.arc(circleRef.current.x, circleRef.current.y, 15, 0, Math.PI * 2);  // Increased circle size from 10 to 15
      ctx.fillStyle = gradient;
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 pointer-events-none z-50"
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default MouseTrail;
