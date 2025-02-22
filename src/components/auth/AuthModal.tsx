
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

type AuthView = "login" | "signup" | "forgotPassword";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ isOpen, onOpenChange }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>("login");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {view === "login" && (
          <LoginForm
            onForgotPassword={() => setView("forgotPassword")}
            onSignupClick={() => setView("signup")}
          />
        )}
        {view === "signup" && (
          <SignupForm onLoginClick={() => setView("login")} />
        )}
        {view === "forgotPassword" && (
          <ForgotPasswordForm onBackToLogin={() => setView("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
};
