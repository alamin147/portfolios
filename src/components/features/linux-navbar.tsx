import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { DiLinux } from "react-icons/di";
import { Link } from "react-router-dom";
import LinuxContactModal from "./linux-contact-modal";
import { ThemeToggle } from "@/components/shared";

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
          ? "bg-white/90 backdrop-blur-md border-b border-emerald-300/50 shadow-sm dark:bg-black/90 dark:border-green-400/20 dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-[calc(80rem-5px)]">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo */}
          <div className="flex items-center flex-1">
            <Link
              to="/"
              className="flex items-center text-red-600 hover:text-emerald-700 transition-colors duration-300 ms-5 md:ms-10 dark:text-red-400 dark:hover:text-green-400"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-lg font-bold text-slate-900 dark:text-inherit">My Professional Portfolio</span>
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center flex-shrink-0">
            <DiLinux className="text-3xl text-red-600 mr-2 dark:text-red-400" />
            <span className="text-xl font-bold text-emerald-700 font-mono dark:text-green-400">
              root@alamin
            </span>
          </div>

          {/* Right Side — theme + contact + mobile menu */}
          <div className="flex items-center justify-end flex-1 gap-2 sm:gap-3 pe-2 md:pe-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-emerald-700 hover:text-red-600 transition-colors duration-300 font-mono cursor-pointer dark:text-green-400 dark:hover:text-red-400"
              >
                ./contact.sh
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white border border-emerald-500 hover:border-red-500 p-2 rounded-md text-emerald-700 hover:text-red-600 transition-all duration-300 shadow-sm dark:bg-gray-900 dark:border-green-400 dark:hover:border-red-400 dark:text-green-400 dark:hover:text-red-400"
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border border-emerald-400 rounded-lg mt-2 shadow-md dark:bg-black dark:border-green-400 dark:shadow-none">
              <Link
                to="/"
                className="text-red-600 hover:text-emerald-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 dark:text-red-400 dark:hover:text-green-400"
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
                className="text-emerald-700 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 dark:text-green-400 dark:hover:text-red-400"
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
