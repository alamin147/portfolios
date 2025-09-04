import { useEffect, useState } from "react";
import { ExternalLink, Trophy, Target, Award, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";


type CPProfile = {
  platform?: string;
  username?: string;
  rating?: string;
  solved?: string;
  highestRating?: string;
  rank?: string;
  logo?: string;
  link?: string;
  color?: string;
} | null;

export default function CPProfiles() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: profilesRef, isVisible: profilesVisible } = useScrollAnimation();

  const [profiles, setProfiles] = useState<CPProfile[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/cpProfiles`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setProfiles(result));
  }, []);

  const getStatIcon = (type: string) => {
    switch (type) {
      case 'rating': return <Trophy className="h-3 w-3 sm:h-5 sm:w-5" />;
      case 'solved': return <Target className="h-3 w-3 sm:h-5 sm:w-5" />;
      case 'rank': return <Award className="h-3 w-3 sm:h-5 sm:w-5" />;
      default: return <TrendingUp className="h-3 w-3 sm:h-5 sm:w-5" />;
    }
  };

  return (
    <section id="cp-profiles" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 lg:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-sky-500/10 text-6xl sm:text-8xl font-mono animate-pulse">
          {"{}"}
        </div>
        <div className="absolute top-40 right-16 text-emerald-500/10 text-4xl sm:text-6xl font-mono animate-bounce">
          {"[]"}
        </div>
        <div className="absolute bottom-32 left-20 text-purple-500/10 text-5xl sm:text-7xl font-mono animate-pulse">
          {"<>"}
        </div>
        <div className="absolute bottom-20 right-10 text-pink-500/10 text-3xl sm:text-5xl font-mono animate-bounce">
          {"()"}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          ref={headerRef as any}
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >

 <div className="relative group mx-auto w-full max-w-md sm:max-w-xl lg:max-w-4xl px-4 sm:px-6 lg:px-0">
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-sky-600/20 to-emerald-600/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="glass-card hover:glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-sky-500/20 shadow-2xl transition-all duration-500">
        <h2 className="text-xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-sky-200 to-emerald-200 bg-clip-text text-transparent mb-3 sm:mb-5 leading-tight py-1 sm:py-2">
          Competitive Programming
        </h2>

        <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full mb-4" />

        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-prose sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
          Explore my competitive programming journey across various platforms where I solve algorithmic challenges and participate in coding contests.
        </p>
      </div>
    </div>
        </div>

        {/* Profiles Grid */}
        <div
          ref={profilesRef as any}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-1000 delay-300 ${
            profilesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {profiles?.map((profile, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                transitionDelay: profilesVisible ? `${100}ms` : "0ms",
              }}
            >
              {/* Glow Effect */}
              <div
                className="absolute -inset-0.5 rounded-2xl sm:rounded-3xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"
                style={{
                  background: `linear-gradient(45deg, ${profile?.color || '#0ea5e9'}, transparent, ${profile?.color || '#0ea5e9'})`,
                  filter: 'blur(8px)',
                }}
              ></div>

              {/* Main Card */}
              <div className="relative glass-card hover:glass-card-hover rounded-lg sm:rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20">
                {/* Header Section */}
                <div className="relative p-2 sm:p-4 lg:p-6">
                  {/* Top Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 rounded-t-lg sm:rounded-t-2xl lg:rounded-t-3xl"
                    style={{
                      background: `linear-gradient(90deg, ${profile?.color || '#0ea5e9'}, transparent, ${profile?.color || '#0ea5e9'})`,
                    }}
                  ></div>

                  {/* Platform Info */}
                  <div className="flex items-center justify-between mb-2 sm:mb-4 lg:mb-6">
                    <div className="flex items-center space-x-1.5 sm:space-x-3 lg:space-x-4">
                      <div className="relative">
                        <div
                          className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-md sm:rounded-xl lg:rounded-2xl p-1 sm:p-2 lg:p-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `${profile?.color || '#0ea5e9'}20` }}
                        >
                          <img
                            src={profile?.logo || "/placeholder.svg"}
                            alt={profile?.platform || "Platform"}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Online Status */}
                        <div
                          className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: profile?.color || '#0ea5e9' }}
                        >
                          <div className="w-full h-full rounded-full animate-ping opacity-75" style={{ backgroundColor: profile?.color || '#0ea5e9' }}></div>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-0 sm:mb-1 group-hover:text-sky-300 transition-colors duration-300 truncate">
                          {profile?.platform}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 truncate leading-tight">
                          @{profile?.username}
                        </p>
                      </div>
                    </div>

                    {/* External Link */}
                    <a
                      href={profile?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card hover:glass-card-hover p-1 sm:p-2 lg:p-3 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-110 group-hover:shadow-lg flex-shrink-0"
                      style={{
                        boxShadow: `0 0 20px ${profile?.color || '#0ea5e9'}20`,
                      }}
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-300 hover:text-white" />
                    </a>
                  </div>

                  {/* Stats Grid - Compact on Mobile */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-3 lg:gap-4">
                    {profile?.rating && (
                      <div className="glass-card hover:glass-card-hover rounded-md sm:rounded-xl p-1 sm:p-3 lg:p-4 text-center transition-all duration-300 hover:scale-105">
                        <div className="flex flex-col items-center justify-center mb-0.5 sm:mb-2">
                          <div className="mb-0.5 sm:mr-1 sm:mb-0">
                            {getStatIcon('rating')}
                          </div>
                          <span className="text-xs text-sky-400 font-medium">Rate</span>
                        </div>
                        <div className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight truncate max-w-full">
                          {profile.rating}
                        </div>
                        {profile?.highestRating && (
                          <div className="text-xs text-gray-400 hidden lg:block truncate">
                            Max: {profile.highestRating}
                          </div>
                        )}
                      </div>
                    )}

                    {profile?.solved && (
                      <div className="glass-card hover:glass-card-hover rounded-md sm:rounded-xl p-1 sm:p-3 lg:p-4 text-center transition-all duration-300 hover:scale-105">
                        <div className="flex flex-col items-center justify-center mb-0.5 sm:mb-2">
                          <div className="mb-0.5 sm:mr-1 sm:mb-0">
                            {getStatIcon('solved')}
                          </div>
                          <span className="text-xs text-emerald-400 font-medium">Solved</span>
                        </div>
                        <div className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight truncate max-w-full">
                          {profile.solved}
                        </div>
                      </div>
                    )}

                    {profile?.rank && (
                      <div className="glass-card hover:glass-card-hover rounded-md sm:rounded-xl p-1 sm:p-3 lg:p-4 text-center transition-all duration-300 hover:scale-105">
                        <div className="flex flex-col items-center justify-center mb-0.5 sm:mb-2">
                          <div className="mb-0.5 sm:mr-1 sm:mb-0">
                            {getStatIcon('rank')}
                          </div>
                          <span className="text-xs text-purple-400 font-medium">Rank</span>
                        </div>
                        <div className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight truncate max-w-full">
                          {profile.rank}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar Footer */}
                <div className="relative h-1 sm:h-2">
                  <div
                    className="absolute bottom-0 left-0 h-full rounded-b-lg sm:rounded-b-2xl lg:rounded-b-3xl transition-all duration-1000"
                    style={{
                      width: '100%',
                      background: `linear-gradient(90deg, ${profile?.color || '#0ea5e9'}40, transparent)`,
                    }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 h-full rounded-b-lg sm:rounded-b-2xl lg:rounded-b-3xl transition-all duration-1000 group-hover:animate-pulse"
                    style={{
                      width: '70%',
                      backgroundColor: profile?.color || '#0ea5e9',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
