"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

const Header: React.FC<object> = () => {
  const { user, logout } = useAuth();
  const isLoggedIn = user !== null;
  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/todos" className={styles.navLink}>Todos</Link>
          </li>
          {isLoggedIn ? (
            <li className={styles.navItem}>
              <button onClick={logout} className={styles.logoutButton}>Logout</button>
            </li>
          ) : (
            <>
              <li className={styles.navItem}>
                <Link href="/login" className={styles.navLink}>Login</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/register" className={styles.navLink}>Register</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/chats" className={styles.navLink}>Chats</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;