"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignupForm } from "@/components/forms/signup-form";

interface SignupModalProps {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

export function SignupModal({ trigger, defaultOpen = false, onOpenChange, onSwitchToLogin }: SignupModalProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleSwitchToLogin = () => {
    handleOpenChange(false);
    onSwitchToLogin?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create an account</DialogTitle>
          <DialogDescription className="text-center">
            Sign up to start managing your social media presence
          </DialogDescription>
        </DialogHeader>
        <SignupForm />
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button variant="link" className="p-0 h-auto" onClick={handleSwitchToLogin}>
            Log in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
