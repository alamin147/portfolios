import { useEffect, useState } from "react"
import { ExternalLink, Trophy, Target, Code, TrendingUp } from "lucide-react"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import SectionTitle from "./section-title"

type CPProfile = {
  platform?: string
  username?: string
  rating?: string
  solved?: string
  highestRating?: string
  rank?: string
  logo?: string
  link?: string
  color?: string
} | null

export default function CPProfiles() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
  const { ref: profilesRef, isVisible: profilesVisible } = useScrollAnimation()

  const [profiles, setProfiles] = useState<CPProfile[]>([])

useEffect(() => {
    const mockProfiles = [
      {
        platform: "Codeforces",
        username: "alamin_dev",
        link: "https://codeforces.com/profile/alamin_dev",
        logo: "/placeholder.svg?height=48&width=48",
        color: "#1976d2",
        rating: "1756",
        rank: "Expert",
        solved: "678",
        highestRating: "1850",
      },
      {
        platform: "LeetCode",
        username: "alamin_dev",
        link: "https://leetcode.com/alamin_dev/",
        logo: "/placeholder.svg?height=48&width=48",
        color: "#ffa116",
        rating: "1850",
        rank: "Knight",
        solved: "320",
      },
      {
        platform: "CodeChef",
        username: "alamin_dev",
        link: "https://www.codechef.com/users/alamin_dev",
        logo: "/placeholder.svg?height=48&width=48",
        color: "#5b4638",
        rating: "1781",
        rank: "4 Star",
        solved: "245",
      },
      {
        platform: "HackerRank",
        username: "alamin_dev",
        link: "https://www.hackerrank.com/alamin_dev",
        logo: "/placeholder.svg?height=48&width=48",
        color: "#00ea64",
        rank: "5 Star C++",
        solved: "150",
      },
      {
        platform: "Beecrowd",
        username: "alamin_dev",
        link: "https://www.hackerrank.com/alamin_dev",
        logo: "/placeholder.svg?height=48&width=48",
        color: "#116aa1",
        rank: "5 Star C++",
        solved: "150",
      },
    ]
    setProfiles(mockProfiles)
  }, [])
  return (
    <section id="cp-profiles" className="py-20 px-4 relative overflow-hidden">
      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl text-sky-500/10 font-mono animate-pulse">{"{ }"}</div>
        <div className="absolute top-40 right-20 text-4xl text-emerald-500/10 font-mono animate-float">{"<>"}</div>
        <div className="absolute bottom-20 left-1/4 text-5xl text-emerald-500/10 font-mono animate-pulse animation-delay-2000">
          {"[]"}
        </div>
        <div className="absolute bottom-40 right-10 text-3xl text-sky-500/10 font-mono animate-float animation-delay-4000">
          {"()"}
        </div>
      </div>

      <div className="container mx-auto max-w-4/5  relative z-10">
        <div
          ref={headerRef as any}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
         <SectionTitle  title="Competitive Programming Profiles" desc="Check out my competitive programming profiles across various platforms where I solve problems and participate in coding contests." />

        </div>

        <div
          ref={statsRef as any}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            {
              icon: <Code className="h-8 w-8" />,
              value: "1200+",
              label: "Problems Solved",
              color: "from-sky-500 to-sky-600",
              border: "border-sky-500/30",
            },
            {
              icon: <Trophy className="h-8 w-8" />,
              value: "4",
              label: "Platforms",
              color: "from-emerald-500 to-emerald-600",
              border: "border-emerald-500/30",
            },
            {
              icon: <Target className="h-8 w-8" />,
              value: "Expert",
              label: "Highest Rank",
              color: "from-emerald-500 to-emerald-600",
              border: "border-emerald-500/30",
            },
            {
              icon: <TrendingUp className="h-8 w-8" />,
              value: "1850",
              label: "Peak Rating",
              color: "from-sky-500 to-sky-600",
              border: "border-sky-500/30",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`group backdrop-blur-md bg-white/10 border ${stat.border} rounded-2xl p-6 text-center hover:bg-white/20 hover:scale-105 transition-all duration-500 hover:shadow-2xl`}
              style={{
                transitionDelay: statsVisible ? `${100}ms` : "0ms",
              }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Cards */}
        <div
          ref={profilesRef as any}
          className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-500 ${
            profilesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {profiles?.map((profile, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                transitionDelay: profilesVisible ? `${index * 200}ms` : "0ms",
              }}
            >
              {/* Glow Effect */}
              <div
                className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: `linear-gradient(45deg, ${profile?.color}, transparent)` }}
              ></div>

              <div className="relative glass-card hover:glass-card-hover rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105">
                {/* Platform Header */}
                <div className="relative p-8 pb-4">
                  <div
                    className="absolute top-0 left-0 right-0 h-2 opacity-80"
                    style={{ backgroundColor: profile?.color }}
                  ></div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-sky-500/30 p-3 flex items-center justify-center shadow-lg">
                          <img
                            src={profile?.logo || "/placeholder.svg"}
                            alt={profile?.platform || "Platform"}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: profile?.color }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
                          {profile?.platform}
                        </h3>
                        <p className="text-sky-400 font-medium">@{profile?.username}</p>
                      </div>
                    </div>

                    <a
                      href={profile?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                    >
                      <div className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/20 border border-sky-500/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                    </a>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {profile?.rating && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{profile.rating}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Current</div>
                        {profile?.highestRating && (
                          <div className="text-xs text-yellow-400 mt-1">Max: {profile.highestRating}</div>
                        )}
                      </div>
                    )}

                    {profile?.rank && (
                      <div className="text-center">
                        <div className="text-lg font-bold text-white mb-1">{profile.rank}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Rank</div>
                      </div>
                    )}

                    {profile?.solved && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{profile.solved}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Solved</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-8 pb-8">
                  <div className="w-full rounded-full h-2 overflow-hidden">
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
