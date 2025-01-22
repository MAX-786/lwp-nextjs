import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <html lang="en">
      <head>
        <title>Todo List App</title>
        <meta
          name="description"
          content="A simple Todo List app with daily quotes"
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
