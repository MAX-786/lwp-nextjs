import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { vi } from "vitest";



// example test for showing vitest ability
vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

it("calls logout function when the Logout button is clicked", () => {
  const logoutMock = vi.fn();
  (useAuth as vi.Mock).mockReturnValue({
    user: { username: "testuser" },
    logout: logoutMock,
  });

  render(<Header />);

  fireEvent.click(screen.getByText("Logout"));

  expect(logoutMock).toHaveBeenCalled();
});
