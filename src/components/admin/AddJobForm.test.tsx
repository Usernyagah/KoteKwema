import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AddJobForm from "./AddJobForm";

// Mock Firebase
vi.mock("@/lib/firebase", () => ({
  db: {},
}));

// Mock Firestore functions
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(() => Promise.resolve({ id: "test-id" })),
}));

// Mock toast
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

describe("AddJobForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form", () => {
    const { container } = render(<AddJobForm />);
    expect(container).toBeInTheDocument();
  });
});
