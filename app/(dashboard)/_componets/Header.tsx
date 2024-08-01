"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Logo } from "./Logo";
import { ReactTyped } from "react-typed";

export const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Code Anywhere, Anytime
        </h1>
        <ReactTyped
          strings={[
            "Experience seamless coding with our powerful online editor.",
            "Collaborate, create, and code with ease, no matter where you are.",
            "Join a community of developers coding together.",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto block"
        />
        <div className="flex justify-center space-x-4">
          {!isSignedIn && (
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
              >
                Get Started for Free
              </Button>
            </SignUpButton>
          )}
          {isSignedIn && (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="px-8 py-3 rounded-full font-semibold transition duration-300"
            >
              <Link href="/code">Open Editor</Link>
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 rounded-full font-semibold transition duration-300"
          >
            Learn More
          </Button>
        </div>
      </div>
    </header>
  );
};
