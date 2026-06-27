import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { RouterProvider } from "react-router-dom";
import Signin from "./auth/signin/Signin";
import Home from "./home/Home";
import "./index.css";
import Dashboard from "./dashboard/Dashboard";
import App from "./App.jsx";
import EditResume from "./dashboard/resume/[resumeId]/EditResume";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const children = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboard/resume/:resumeId/edit", element: <EditResume /> },
];

// Router Configuration
const router = createBrowserRouter([
  {
    element: <App />,
    children: children.map(({ path, element }) => ({ path, element })),
  },
  { path: "/auth/signin", element: <Signin /> },
  { path: "/", element: <Home /> },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}></RouterProvider>{" "}
  </ClerkProvider>,
  // </StrictMode>,
);
