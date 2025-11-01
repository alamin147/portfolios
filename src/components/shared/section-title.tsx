// const SectionTitle = ({ title, desc }: { title: string; desc: string }) => {
//   return (
//     <div className="relative inline-block w-4xl">
//       <div className="absolute -inset-4 b-gradient-to-r from-sky-600/20 to-emerald-600/20 blur-2xl rounded-full animate-glow"></div>
//       <div className="glass-card hover:glass-card-hover rounded-3xl p-12 hover:shadow-sky-500/20 shadow-2xl transition-all duration-500 section-title-hover">
//         <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-sky-200 to-emerald-200 bg-clip-text text-transparent mb-6">
//           {title}
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full mb-4"></div>
//         <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SectionTitle;

// SectionTitle.tsx

// const SectionTitle = ({ title, desc }: { title: string; desc: string }) => {
//   return (
//     <div className="relative mx-auto w-full max-w-md sm:max-w-xl lg:max-w-4xl px-4 sm:px-6 lg:px-0">
//       <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-sky-600/20 to-emerald-600/20 blur-2xl rounded-full animate-glow" />

//       <div
//         className="glass-card hover:glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-sky-500/20 shadow-2xl  transition-all duration-500
//         "
//       >
//         <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-sky-200 to-emerald-200 bg-clip-text text-transparent mb-4 sm:mb-6">
//           {title}
//         </h2>

//         <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full mb-4" />

//         <p className=" text-gray-300 text-base sm:text-lg md:text-xl max-w-prose sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SectionTitle;

const SectionTitle = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="relative group mx-auto w-full max-w-md sm:max-w-xl lg:max-w-4xl px-4 sm:px-6 lg:px-0">
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-sky-600/20 to-emerald-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="glass-card hover:glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-sky-500/20 shadow-2xl transition-all duration-500">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-sky-200 to-emerald-200 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight py-2">
          {title}
        </h2>

        <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full mb-4" />

        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-prose sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
