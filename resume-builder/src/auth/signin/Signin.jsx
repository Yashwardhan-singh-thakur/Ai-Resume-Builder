import { SignUp } from "@clerk/react";
import React from "react";

export default function Signin() {
  return (
    <div className="flex justify-center h-screen items-center">
      <SignUp />
    </div>
  );
}
