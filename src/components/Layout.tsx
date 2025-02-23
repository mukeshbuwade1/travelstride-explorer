
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleGetCallback = () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    
    toast({
      title: "Request received",
      description: "We'll get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <div className="fixed bottom-8 right-8 z-50">
        <Button onClick={handleGetCallback} size="lg" className="shadow-lg">
          Get Call Back
        </Button>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />
      <Footer />
    </div>
  );
};
