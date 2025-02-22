
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary">TravelEase</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#packages" className="text-gray-700 hover:text-primary transition-colors">
              Packages
            </a>
            <a href="#offers" className="text-gray-700 hover:text-primary transition-colors">
              Offers
            </a>
            <a href="#blog" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </a>
            <Button variant="outline" className="ml-4">
              Sign In
            </Button>
            <Button>Sign Up</Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden animate-fade-down">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#packages"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Packages
              </a>
              <a
                href="#offers"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Offers
              </a>
              <a
                href="#blog"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </a>
              <div className="space-y-2 pt-2">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
