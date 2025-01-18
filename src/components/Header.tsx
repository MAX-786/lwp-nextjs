"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC<object> = () => {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  return (
    <header>
      <nav>
        <li>
          <Link href="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/todos">Todos</Link>
        </li>
      </nav>
    </header>
  );
};

export default Header;
