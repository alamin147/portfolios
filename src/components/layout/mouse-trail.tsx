import { useEffect, useRef, useState } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const circleRef = useRef({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(
    () => document.documentElement.classList.contains("dark")
  );

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

    // Track theme changes so cursor stays visible in both themes
    const root = document.documentElement;
    const updateTheme = () => {
      setIsDarkMode(root.classList.contains("dark"));
    };
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

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

      const dark = root.classList.contains("dark");
      const glowRadius = dark ? 40 : 36;
      const coreRadius = dark ? 15 : 12;
      const innerGlowStart = dark ? 0 : 6;

      // Draw glowing circle with higher contrast in light mode
      const gradient = ctx.createRadialGradient(
        circleRef.current.x,
        circleRef.current.y,
        innerGlowStart,
        circleRef.current.x,
        circleRef.current.y,
        glowRadius
      );
      if (dark) {
        gradient.addColorStop(0, "rgba(64, 224, 208, 0.9)");
        gradient.addColorStop(0.4, "rgba(64, 224, 208, 0.4)");
        gradient.addColorStop(1, "rgba(64, 224, 208, 0)");
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.28, "rgba(186, 230, 253, 0.1)");
        gradient.addColorStop(0.55, "rgba(56, 189, 248, 0.24)");
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
      }

      ctx.beginPath();
      ctx.arc(circleRef.current.x, circleRef.current.y, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // In light mode, add a soft ring so trail remains visible
      if (!dark) {
        ctx.beginPath();
        ctx.arc(circleRef.current.x, circleRef.current.y, coreRadius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(14, 165, 233, 0.42)";
        ctx.lineWidth = 2.6;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
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
        mixBlendMode: isDarkMode ? "screen" : "normal",
      }}
    />
  );
};

export default MouseTrail;
