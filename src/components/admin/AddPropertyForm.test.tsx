import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddPropertyForm from "./AddPropertyForm";

// Mock Firebase
vi.mock("@/lib/firebase", () => ({
  db: {},
  storage: {},
}));

// Mock Firestore functions
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(() => Promise.resolve({ id: "test-id" })),
}));

// Mock Storage functions
vi.mock("firebase/storage", () => ({
  ref: vi.fn(),
  uploadBytes: vi.fn(() => Promise.resolve()),
  getDownloadURL: vi.fn(() => Promise.resolve("https://example.com/image.jpg")),
}));

// Mock toast
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

describe("AddPropertyForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form", () => {
    const { container } = render(<AddPropertyForm />);
    expect(container).toBeInTheDocument();
  });

  it("should allow adding multiple image fields", async () => {
    const user = userEvent.setup();
    render(<AddPropertyForm />);
    
    const addButton = screen.getByRole("button", { name: /add another image/i });
    expect(addButton).toBeInTheDocument();
    
    await user.click(addButton);
    
    // After clicking, there should be multiple image URL inputs
    const imageInputs = screen.getAllByPlaceholderText(/https:\/\/example.com\/image.jpg/i);
    expect(imageInputs.length).toBeGreaterThanOrEqual(2);
  });
});
