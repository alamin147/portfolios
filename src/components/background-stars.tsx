const BackgroundStars = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      </div>
      <div className="stars opacity-60" />
      <div className="stars2 opacity-75" />
      <div className="stars3 opacity-90" />
      <style>{`
        .stars {
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: ${generateStars(300, '0, 190, 230, 0.9')};
          animation: animateStars 120s linear infinite;
        }

        .stars2 {
          width: 2.5px;
          height: 2.5px;
          background: transparent;
          box-shadow: ${generateStars(100, '8, 145, 178, 1')};
          animation: animateStars 180s linear infinite;
        }

        .stars3 {
          width: 3.5px;
          height: 3.5px;
          background: transparent;
          box-shadow: ${generateStars(50, '6, 182, 212, 1')};
          animation: animateStars 200s linear infinite;
        }

        @keyframes animateStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  );
};

function generateStars(count: number, color: string = '255, 255, 255, 1') {
  let stars = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000); // Fixed width instead of window.innerWidth
    const y = Math.floor(Math.random() * 2000); // Fixed height for consistent pattern
    stars += `${x}px ${y}px rgba(${color})${i === count - 1 ? '' : ', '}`;
  }
  return stars;
}

export default BackgroundStars;
