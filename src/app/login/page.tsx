import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { LoginForm } from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Login - SocFlow",
  description: "Login to your SocFlow account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
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
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to log in to your account
          </p>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
