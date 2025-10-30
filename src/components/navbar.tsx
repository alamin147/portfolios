import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { DiLinux } from "react-icons/di";
import { Link } from "react-router-dom";
import CommonTooltip from "./common-tooltip";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "CP Profiles", href: "/#cp-profiles" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    // { name: "Certificates", href: "/#certificates" },
    { name: "Blog", href: "/#blogs" },
    { name: "Education", href: "/#education" },
    { name: "Contact", href: "/#contact" },
    {
      name: DiLinux,
      href: "/linux",
      isIcon: true,
      tooltip: "Travel to my other side",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card backdrop-blur-md bg-background/80 border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Al Amin
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-2 lg:space-x-4">
              {navItems.map((item: any) => {
                const linkElement = item.href === "/linux" ? (
                  <Link
                    key={item.name.toString()}
                    to={item.href}
                    className="text-white hover:text-sky-400 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {item.isIcon ? (
                      <item.name className="h-5 w-5 lg:h-6 lg:w-6 inline mb-1" />
                    ) : (
                      item.name
                    )}
                  </Link>
                ) : (
                  <a
                    key={item.name.toString()}
                    href={item.href}
                    className="text-white hover:text-sky-400 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {item.isIcon ? (
                      <item.name className="h-5 w-5 lg:h-6 lg:w-6 inline mb-1" />
                    ) : (
                      item.name
                    )}
                  </a>
                );

                return item.tooltip ? (
                  <CommonTooltip key={item.name.toString()} content={item.tooltip}>
                    {linkElement}
                  </CommonTooltip>
                ) : (
                  linkElement
                );
              })}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-card hover:glass-card-hover p-1.5 sm:p-2 rounded-md text-white hover:text-sky-400 transition-all duration-300"
              >
                {isOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card rounded-lg mt-2 mx-2">
              {navItems.map((item: any) =>
                item.href === "/linux" ? (
                  <Link
                    key={item.name.toString()}
                    to={item.href}
                    className="text-white hover:text-sky-400 block px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.isIcon ? (
                      <span className="flex items-center">
                        <item.name className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />

                      </span>
                    ) : (
                      item.name
                    )}
                  </Link>
                ) : (
                  <a
                    key={item.name.toString()}
                    href={item.href}
                    className="text-white hover:text-sky-400 block px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.isIcon ? (
                      <span className="flex items-center">
                        <item.name className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />

                      </span>
                    ) : (
                      item.name
                    )}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
