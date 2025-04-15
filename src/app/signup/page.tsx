import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { SignupForm } from "@/components/forms/signup-form";

export const metadata: Metadata = {
  title: "Sign Up - SocFlow",
  description: "Create a new SocFlow account",
};

export default function SignupPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link href="/" className="mx-auto">
            <Image 
              src="/logo.svg" 
              alt="SocFlow Logo" 
              width={40} 
              height={40}
              className="rounded-md"
            />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create a new account
          </p>
        </div>
        <SignupForm />
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
