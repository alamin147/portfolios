import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Footer from "@/components/footer"
import CPProfiles from "@/components/cp-profiles"
import Blog from "@/components/blog"
import Education from "@/components/education"
import Contact from "@/components/contact"
import { FloatingElements } from "@/components/floating-elements"
import Navbar from "@/components/navbar"


function App() {

  return (
   <>
   <div className="min-h-screen relative">
      {/* Floating interactive elements */}
      <FloatingElements />

      {/* Clean Professional Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(8,145,178,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Enhanced animated blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar/>
        <Hero />
        <Projects />
        <Skills />
        <CPProfiles />
        <Blog />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
   </>
  )
}

export default App
