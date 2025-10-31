
const Stats = () => {
  return (
     <div
        //   ref={statsRef as any}
          className={`mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 transition-all duration-1000 delay-300 ${
            // statsVisible
               "opacity-100 translate-y-0"
            //   : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { number: "20+", label: "Projects Completed" },
            { number: "2.5+", label: "Years Experience" },
            { number: "1200+", label: "Problems Solved" },
            { number: "10+", label: "Technologies" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card hover:glass-card-hover rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center transition-all duration-300 group hover:scale-105 relative overflow-hidden"
              style={{ transitionDelay: `${100}ms` }}
            >
              <div className="relative z-10">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2 leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Stats
