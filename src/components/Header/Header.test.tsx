// Header.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { useAuth } from "@/context/AuthContext";

// Mock the useAuth hook
jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(() => ({
    user: null,
    logout: jest.fn(),
  })),
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock CSS modules
jest.mock("./Header.module.css", () => ({
  header: "header",
  nav: "nav",
  navList: "navList",
  navItem: "navItem",
  navLink: "navLink",
  logoutButton: "logoutButton",
}));

describe("Header Component", () => {
  const mockLogout = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When user is logged out", () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        user: null,
        logout: mockLogout,
      });
      render(<Header />);
    });

    it("renders the basic navigation links", () => {
      expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByRole("link", { name: "Todos" })).toHaveAttribute(
        "href",
        "/todos"
      );
      expect(screen.getByRole("link", { name: "Chats" })).toHaveAttribute(
        "href",
        "/chats"
      );
    });

    it("shows login and register links", () => {
      expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
        "href",
        "/login"
      );
      expect(screen.getByRole("link", { name: "Register" })).toHaveAttribute(
        "href",
        "/register"
      );
    });

    it("does not show logout button", () => {
      expect(
        screen.queryByRole("button", { name: "Logout" })
      ).not.toBeInTheDocument();
    });
  });

  describe("When user is logged in", () => {
    beforeEach(() => {
      (useAuth as jest.Mock).mockReturnValue({
        user: { id: "123", email: "test@example.com" },
        logout: mockLogout,
      });
      render(<Header />);
    });

    it("shows logout button", () => {
      expect(
        screen.getByRole("button", { name: "Logout" })
      ).toBeInTheDocument();
    });

    it("hides login and register links", () => {
      expect(
        screen.queryByRole("link", { name: "Login" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Register" })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: "Chats" })
      ).toBeInTheDocument();
    });

    it("triggers logout when clicking logout button", () => {
      const logoutButton = screen.getByRole("button", { name: "Logout" });
      fireEvent.click(logoutButton);
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  it("matches snapshot when logged out", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: "123", email: "test@example.com" },
      logout: mockLogout,
    });
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
