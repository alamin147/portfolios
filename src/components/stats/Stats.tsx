
const Stats = () => {
  return (
     <div
        //   ref={statsRef as any}
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
            // statsVisible
               "opacity-100 translate-y-0"
            //   : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { number: "20+", label: "Projects Completed" },
            { number: "2.5+", label: "Years Experience" },
            { number: "1000+", label: "Problems Solved" },
            { number: "10+", label: "Technologies" },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass-card hover:glass-card-hover rounded-2xl p-6 text-center transition-all duration-300 group hover:scale-105 relative overflow-hidden"
              style={{ transitionDelay: `${100}ms` }}
            >
              <div className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Stats
