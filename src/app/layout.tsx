// app/layout.tsx
import Link from 'next/link';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Todo List App</title>
        <meta name="description" content="A simple Todo List app with daily quotes" />
      </head>
      <body>
        <header>
          <nav>
            <li>
              <Link href="/">Home</Link> 
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/todos">Todos</Link>
            </li>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;