"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Use the navigation router from "next/navigation".

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;

  // Ensure useRouter is accessed only in client-side rendering
  let currentPath = "/";
  if (typeof window !== "undefined") {
    const router = useRouter();
    currentPath = router.pathname; // Get the current route
  }

  return (
    <header>
      <nav>
        <ul>
          <li className={currentPath === "/" ? "active" : ""}>
            <Link href="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <>
              <li className={currentPath === "/login" ? "active" : ""}>
                <Link href="/login">Login</Link>
              </li>
              <li className={currentPath === "/register" ? "active" : ""}>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
          <li className={currentPath === "/todos" ? "active" : ""}>
            <Link href="/todos">Todos</Link>
          </li>
        </ul>
      </nav>

      {/* Add CSS for styling */}
      <style jsx>{`
        header {
          padding: 1rem;
          background: #f5f5f5;
        }
        nav ul {
          display: flex;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        nav li {
          margin-right: 15px;
        }
        nav a {
          text-decoration: none;
          color: black;
        }
        .active a {
          font-weight: bold;
          color: blue;
        }
      `}</style>
    </header>
  );
};

export default Header;
