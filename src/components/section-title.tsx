const SectionTitle = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="relative inline-block w-4xl">
      <div className="absolute -inset-4 b-gradient-to-r from-sky-600/20 to-emerald-600/20 blur-2xl rounded-full animate-glow"></div>
      <div className="glass-card hover:glass-card-hover rounded-3xl p-12 hover:shadow-sky-500/20 shadow-2xl transition-all duration-500 section-title-hover">
        <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-sky-200 to-emerald-200 bg-clip-text text-transparent mb-6">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
