// Sections
import {
  Hero,
  Projects,
  Skills,
  Blog,
  Education,
  Contact,
  CPProfiles,
  ProjectsPage,
  ProjectDetailsPage,
  BlogDetailsWrapper,
  BlogsPage
} from "@/components/sections";

// Layout
import {
  Navbar,
  Footer,
  FloatingElements,
  FloatingPlanets,
  BackgroundStars,
  MouseTrail,
  InitialLoader
} from "@/components/layout";

// Features
import { LinuxPortfolio } from "@/components/features";

// Shared
import { NotFound, SEO } from "@/components/shared";

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React
import { useState, useEffect } from "react";

// Context
import { EasterEggsProvider, useEasterEggs } from "./context/easter-eggs-context";

// Easter Eggs
import SpaceCatcherGame from "./components/easter-eggs/space-catcher-game";

const AppContent = () => {
  const { isGameActive, updateGameScore, deactivateGame } = useEasterEggs();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading || isGameActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading, isGameActive]);

  return (
    <>
      {loading && (
        <InitialLoader
          duration={2500}
          onComplete={() => setLoading(false)}
        />
      )}
      <SpaceCatcherGame
        isActive={isGameActive}
        onScoreChange={updateGameScore}
        onClose={deactivateGame}
      />
      <div className="min-h-screen relative">
        {/* Rest of your app content */}
        <MouseTrail />
        <FloatingElements />
        <BackgroundStars />
        <div className="relative z-10">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <div className="relative z-10">
                    <SEO
                      title="Al Amin - Full Stack Developer Portfolio"
                      description="Full Stack Developer specializing in React, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Prisma, and Tailwind CSS. Explore my portfolio of projects, skills, and competitive programming profiles."
                      url="https://alamin-portfolio-site.vercel.app/"
                    />
                    {/* Floating Planets only on homepage */}
                    <FloatingPlanets />
                    <Navbar />
                    <Hero />
                    <CPProfiles />
                    <Projects />
                    <Skills />
                    <Blog />
                    <Education />
                    <Contact />
                    <Footer />
                  </div>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <SEO
                      title="Projects - Al Amin | Full Stack Developer"
                      description="Browse through my portfolio of full-stack web development projects featuring React, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Next.js, Prisma, and Tailwind CSS."
                      url="https://alamin-portfolio-site.vercel.app/projects"
                    />
                    <Navbar />
                    <ProjectsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blogs"
                element={
                  <>
                    <SEO
                      title="Blog - Al Amin | Web Development & Tech Insights"
                      description="Read my latest articles on web development, programming tutorials, and technology insights. Learn about React, Node.js, Express, MongoDB, PostgreSQL, TypeScript, and modern development practices."
                      url="https://alamin-portfolio-site.vercel.app/blogs"
                    />
                    <Navbar />
                    <BlogsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    <SEO
                      title="Project Details - Al Amin Portfolio"
                      description="Detailed overview of my full-stack development project including technologies used, features, and live demo."
                      url="https://alamin-portfolio-site.vercel.app/projects"
                    />
                    <Navbar />
                    <ProjectDetailsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <>
                    <SEO
                      title="Blog Post - Al Amin"
                      description="Read this insightful article about web development, programming, and technology."
                      url="https://alamin-portfolio-site.vercel.app/blog"
                    />
                    <Navbar />
                    <BlogDetailsWrapper />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/linux"
                element={
                  <>
                    <SEO
                      title="Linux Theme - Al Amin Portfolio"
                      description="Experience my portfolio with a unique Linux terminal-inspired interface."
                      url="https://alamin-portfolio-site.vercel.app/linux"
                    />
                    <LinuxPortfolio />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <SEO
                      title="404 - Page Not Found | Al Amin Portfolio"
                      description="The page you are looking for does not exist. Return to the homepage to explore Al Amin's portfolio."
                      url="https://alamin-portfolio-site.vercel.app/"
                    />
                    <NotFound />
                  </>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <EasterEggsProvider>
      <AppContent />
    </EasterEggsProvider>
  );
}

export default App;
