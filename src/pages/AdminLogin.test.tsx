import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "./AdminLogin";

// Mock Firebase Auth
const mockSignIn = vi.fn();
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: () => mockSignIn(),
  getAuth: vi.fn(),
}));

// Mock Firebase
vi.mock("@/lib/firebase", () => ({
  auth: {},
}));

// Mock toast
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AdminLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form", async () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("should require email and password", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
    
    const submitButton = screen.getByRole("button", { name: /login/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInvalid();
    });
  });
});
