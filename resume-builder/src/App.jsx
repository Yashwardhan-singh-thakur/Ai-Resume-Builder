import { Outlet, Navigate } from "react-router-dom";
import "./App.css";
import { useUser } from "@clerk/react";
import Header from "./components/custom/Header";

import { useEffect, useState } from "react";

function App() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/signin" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
