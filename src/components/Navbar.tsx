
import { useState } from "react";
import { Menu, X, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "./auth/AuthModal";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">TravelEase</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/packages" className="text-gray-700 hover:text-primary transition-colors">
              Packages
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            {session ? (
              <Button
                variant="ghost"
                size="icon"
                className="ml-4"
                onClick={() => navigate('/profile')}
              >
                <UserRound className="h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button variant="outline" className="ml-4" onClick={() => setShowAuthModal(true)}>
                  Sign In
                </Button>
                <Button onClick={() => setShowAuthModal(true)}>Sign Up</Button>
              </>
            )}
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
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/packages"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Packages
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </Link>
              {session ? (
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  My Profile
                </Link>
              ) : (
                <div className="space-y-2 pt-2">
                  <Button variant="outline" className="w-full" onClick={() => setShowAuthModal(true)}>
                    Sign In
                  </Button>
                  <Button className="w-full" onClick={() => setShowAuthModal(true)}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />
    </nav>
  );
};
