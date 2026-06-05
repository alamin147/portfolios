import { lazy, Suspense, useState, useEffect } from "react";

// Router
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Context
import { EasterEggsProvider, useEasterEggs } from "./context/easter-eggs-context";

// Eagerly load layout essentials (tiny, needed immediately)
import { Navbar, Footer, BackgroundStars, MouseTrail, InitialLoader } from "@/components/layout";

// Shared (tiny utilities)
import { NotFound, SEO } from "@/components/shared";

// Lazy-load everything else — heavy routes, sections, and optional features
const FloatingElements = lazy(() =>
  import("@/components/layout/floating-elements").then((m) => ({ default: m.FloatingElements }))
);
const FloatingPlanets = lazy(() =>
  import("@/components/layout/floating-planets").then((m) => ({ default: m.FloatingPlanets }))
);
const Robot = lazy(() =>
  import("@/components/ai/model/Robot").then((m) => ({ default: m.Robot }))
);
const SpaceCatcherGame = lazy(() => import("./components/easter-eggs/space-catcher-game"));

// Homepage sections — lazy so they each become their own chunk
const Hero = lazy(() => import("@/components/sections/hero"));
const CPProfiles = lazy(() => import("@/components/sections/cp-profiles"));
const Projects = lazy(() => import("@/components/sections/projects"));
const Skills = lazy(() => import("@/components/sections/skills"));
const Blog = lazy(() => import("@/components/sections/blog"));
const Education = lazy(() => import("@/components/sections/education"));
const Contact = lazy(() => import("@/components/sections/contact"));

// Route pages
const ProjectsPage = lazy(() => import("@/components/sections/projectsPage"));
const ProjectDetailsPage = lazy(() => import("@/components/sections/project-details"));
const BlogsPage = lazy(() => import("@/components/sections/blogsPage"));
const BlogDetailsWrapper = lazy(() => import("@/components/sections/blog-details-wrapper"));
const LinuxPortfolio = lazy(() => import("@/components/features/linux-portfolio"));

// Admin section — fully separate chunk, only loaded under the admin base path
import { ADMIN_BASE } from "@/admin/config";
const AdminApp = lazy(() => import("@/admin/AdminApp"));

// Minimal spinner shown while a lazy chunk loads
const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin" />
  </div>
);

const AppContent = () => {
  const { isGameActive, updateGameScore, deactivateGame } = useEasterEggs();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Kick off chunk downloads immediately so they're ready when InitialLoader completes.
  useEffect(() => {
    import("@/components/sections/hero");
    import("@/components/sections/cp-profiles");
    import("@/components/sections/projects");
    import("@/components/sections/skills");
    import("@/components/sections/blog");
    import("@/components/sections/education");
    import("@/components/sections/contact");
    import("@/components/layout/floating-elements");
    import("@/components/layout/floating-planets");
    import("@/components/ai/model/Robot");
  }, []);
  // Admin runs as its own self-contained app — skip the space chrome & loader.
  const isAdmin = location.pathname.startsWith(ADMIN_BASE);

  useEffect(() => {
    if ((loading && !isAdmin) || isGameActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading, isGameActive, isAdmin]);

  // After the initial loader completes, scroll to the hash section if present.
  // Sections are lazy-loaded, so we retry until the element appears in the DOM.
  useEffect(() => {
    if (loading || isAdmin) return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 30) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 100);
  }, [loading, isAdmin]);

  return (
    <>
      {loading && !isAdmin && (
        <InitialLoader
          duration={2500}
          onComplete={() => setLoading(false)}
        />
      )}

      <Suspense fallback={null}>
        <SpaceCatcherGame
          isActive={isGameActive}
          onScoreChange={updateGameScore}
          onClose={deactivateGame}
        />
      </Suspense>

      <div className="min-h-screen relative">
        {!isAdmin && (
          <>
            <Suspense fallback={null}>
              <MouseTrail />
              <FloatingElements />
            </Suspense>

            <BackgroundStars />

            <Suspense fallback={null}>
              <Robot />
            </Suspense>
          </>
        )}

        <div className="relative z-10">
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
                    <Suspense fallback={null}>
                      <FloatingPlanets />
                    </Suspense>
                    <Navbar />
                    <main id="main-content" role="main">
                      <Suspense fallback={null}>
                        <Hero />
                        <CPProfiles />
                        <Projects />
                        <Skills />
                        <Blog />
                        <Education />
                        <Contact />
                      </Suspense>
                    </main>
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
                    <Suspense fallback={<PageSpinner />}>
                      <ProjectsPage />
                    </Suspense>
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
                    <Suspense fallback={<PageSpinner />}>
                      <BlogsPage />
                    </Suspense>
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
                    <Suspense fallback={<PageSpinner />}>
                      <ProjectDetailsPage />
                    </Suspense>
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
                    <Suspense fallback={<PageSpinner />}>
                      <BlogDetailsWrapper />
                    </Suspense>
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
                    <Suspense fallback={<PageSpinner />}>
                      <LinuxPortfolio />
                    </Suspense>
                  </>
                }
              />
              <Route
                path={`${ADMIN_BASE}/*`}
                element={
                  <Suspense fallback={<PageSpinner />}>
                    <AdminApp />
                  </Suspense>
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
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <EasterEggsProvider>
      <Router>
        <AppContent />
      </Router>
    </EasterEggsProvider>
  );
}

export default App;
