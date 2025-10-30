import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Footer from "@/components/footer";
import CPProfiles from "@/components/cp-profiles";
import Blog from "@/components/blog";
import Education from "@/components/education";
// import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import { FloatingElements } from "@/components/floating-elements";
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
                    <Navbar />
                    <BlogDetailsWrapper />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/linux"
                element={<LinuxPortfolio />}
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
