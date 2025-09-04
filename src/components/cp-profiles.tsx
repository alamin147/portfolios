import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import "./css/cp-profiles.css";

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

  return (
    <section id="cp-profiles" className="cp-section">
      {/* Floating Code Elements */}
      <div className="cp-floating-elements">
        <div className="cp-floating-code cp-floating-code-1">
          {"{ }"}
        </div>
        <div className="cp-floating-code cp-floating-code-2">
          {"<>"}
        </div>
        <div className="cp-floating-code cp-floating-code-3">
          {"[]"}
        </div>
        <div className="cp-floating-code cp-floating-code-4">
          {"()"}
        </div>
      </div>

      <div className="cp-container">
        <div
          ref={headerRef as any}
          className={`cp-header ${
            headerVisible ? "visible" : "hidden"
          }`}
        >
          <div className="cp-title-wrapper">
            <div className="cp-title-glow"></div>
            <div className="cp-title-card">
              <h2 className="cp-title">
                Competitive Programming Profiles
              </h2>
              <div className="cp-title-line"></div>
              <p className="cp-description">
                Check out my competitive programming profiles across various platforms where I solve problems and participate in coding contests.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <div
          ref={profilesRef as any}
          className={`cp-profiles-grid ${
            profilesVisible ? "visible" : "hidden"
          }`}
        >
          {profiles?.map((profile, index) => (
            <div
              key={index}
              className="cp-profile-card"
              style={{
                transitionDelay: profilesVisible ? `${100}ms` : "0ms",
              }}
            >
              {/* Glow Effect */}
              <div
                className="cp-profile-glow"
                style={{
                  background: `linear-gradient(45deg, ${profile?.color}, transparent)`,
                }}
              ></div>

              <div className="cp-profile-content">
                {/* Platform Header */}
                <div className="cp-profile-header">
                  <div
                    className="cp-profile-top-line"
                    style={{ backgroundColor: profile?.color }}
                  ></div>

                  <div className="cp-profile-info">
                    <div className="cp-profile-left">
                      <div className="cp-profile-logo-wrapper">
                        <div className="cp-profile-logo">
                          <img
                            src={profile?.logo || "/placeholder.svg"}
                            alt={profile?.platform || "Platform"}
                          />
                        </div>
                        <div
                          className="cp-profile-status"
                          style={{ backgroundColor: profile?.color }}
                        >
                          <div className="cp-profile-status-dot"></div>
                        </div>
                      </div>

                      <div className="cp-profile-details">
                        <h3>{profile?.platform}</h3>
                        <p>@{profile?.username}</p>
                      </div>
                    </div>

                    <a
                      href={profile?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-profile-link"
                    >
                      <div className="cp-profile-link-button">
                        <ExternalLink />
                      </div>
                    </a>
                  </div>

                  {/* Stats Grid */}
                  <div className="cp-stats-grid">
                    {profile?.rating && (
                      <div className="cp-stat-item">
                        <div className="cp-stat-value">
                          {profile.rating}
                        </div>
                        <div className="cp-stat-label">
                          Current
                        </div>
                        {profile?.highestRating && (
                          <div className="cp-stat-max">
                            Max: {profile.highestRating}
                          </div>
                        )}
                      </div>
                    )}

                    {profile?.rank && (
                      <div className="cp-stat-item">
                        <div className="cp-stat-value">
                          {profile.rank}
                        </div>
                        <div className="cp-stat-label">
                          Rank
                        </div>
                      </div>
                    )}

                    {profile?.solved && (
                      <div className="cp-stat-item">
                        <div className="cp-stat-value">
                          {profile.solved}
                        </div>
                        <div className="cp-stat-label">
                          Solved
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="cp-profile-footer">
                  <div className="cp-progress-bar"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
