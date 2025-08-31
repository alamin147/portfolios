import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { DiLinux } from "react-icons/di";
import { Link } from "react-router-dom";
import LinuxContactModal from "./linux-contact-modal";

export default function LinuxNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-green-400/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-[calc(80rem-5px)]">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center flex-1">
            <Link
              to="/"
              className="flex items-center text-red-400 hover:text-green-400 transition-colors duration-300 ms-5 md:ms-10"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-lg font-bold">My Professional Portfolio</span>
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <DiLinux className="text-3xl text-red-400 mr-2" />
            <span className="text-xl font-bold text-green-400 font-mono">
              root@alamin
            </span>
          </div>

          {/* Right Side - Contact Links */}
          <div className="flex items-center justify-end flex-1">
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-green-400 hover:text-red-400 transition-colors duration-300 font-mono cursor-pointer"
              >
                ./contact.sh
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="me-3 bg-gray-900 border border-green-400 hover:border-red-400 p-2 rounded-md text-green-400 hover:text-red-400 transition-all duration-300"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border border-green-400 rounded-lg mt-2">
              <Link
                to="/"
                className="text-red-400 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                <ArrowLeft className="h-4 w-4 inline mr-2" />
                My Professional Portfolio
              </Link>
              <button
                onClick={() => {
                  setIsContactModalOpen(true);
                  setIsOpen(false);
                }}
                className="text-green-400 hover:text-red-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                ./contact.sh
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <LinuxContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
}
