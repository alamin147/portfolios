import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Footer from "@/components/footer";
import CPProfiles from "@/components/cp-profiles";
import Blog from "@/components/blog";
import Education from "@/components/education";
import NotFound from "@/components/not-found";
// import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import { FloatingElements } from "@/components/floating-elements";
import { FloatingPlanets } from "@/components/floating-planets";
import Navbar from "@/components/navbar";
import LinuxPortfolio from "@/components/linux-portfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsPage from "./components/projectsPage";
import ProjectDetailsPage from "./components/project-details";
import BlogDetailsWrapper from "./components/blog-details-wrapper";
import BlogsPage from "./components/blogsPage";
import BackgroundStars from "./components/background-stars";
import MouseTrail from "./components/mouse-trail";
import InitialLoader from "./components/initial-loader";
import { useState, useEffect } from "react";
import { EasterEggsProvider } from "./context/easter-eggs-context";
import SpaceCatcherGame from "./components/easter-eggs/space-catcher-game";
// Import only the space catcher game
import { useEasterEggs } from "./context/easter-eggs-context";
import { SEO } from "@/components/seo";

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
        <FloatingPlanets />
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
