import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import { UserButton } from "@clerk/react";

export default function Header() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <nav>
      <div className="p-3 px-5 flex justify-between shadow-md">
        <img src="/logo.svg" alt="logo" width={100} height={100} />
        {!isLoaded ? (
          <div className="h-9 w-28" />
        ) : isSignedIn ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to="/auth/signin">
            <Button>Get started</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
