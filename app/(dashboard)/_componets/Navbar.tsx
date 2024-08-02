"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./Logo";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Add a slight delay before showing the content
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <div className="z-[9999] bg-background dark:bg-[#1f1f1f] border-solid border-b-2 border-black fixed top-0 flex items-center w-full p-6">
      <div className="flex items-center justify-start w-full">
        <Logo />
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!showContent ? (
          <Spinner />
        ) : (
          <>
            {!isSignedIn && (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Get code editor for free</Button>
                </SignUpButton>
              </>
            )}
            {isSignedIn && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/code">Enter code editor</Link>
                </Button>
                <UserButton signInUrl="/" />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
