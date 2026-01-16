import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PropertiesList from "./PropertiesList";

// Mock Firebase
const mockProperties = [
  {
    id: "1",
    title: "Test Property",
    category: "residential",
    location: "Nairobi",
    price: 500000,
    images: ["https://example.com/image.jpg"],
    description: "Test description",
    createdAt: { toMillis: () => Date.now() },
  },
];

let mockGetDocsResult: any;

const mockGetDocs = vi.fn(() => mockGetDocsResult);

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  getDocs: () => mockGetDocs(),
  onSnapshot: vi.fn((q, onNext, onError) => {
    // Simulate snapshot callback
    setTimeout(() => {
      try {
        onNext(mockGetDocsResult);
      } catch (error) {
        if (onError) onError(error);
      }
    }, 100);
    return () => {}; // Return unsubscribe function
  }),
}));

vi.mock("@/lib/firebase", () => ({
  db: {},
}));

describe("PropertiesList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetDocsResult = {
      forEach: (callback: (doc: any) => void) => {
        mockProperties.forEach((prop) => {
          callback({
            id: prop.id,
            data: () => prop,
          });
        });
      },
    };
  });

  it("should show loading state initially", () => {
    render(<PropertiesList />);
    // Component should render
    expect(screen.getByText(/loading properties/i)).toBeInTheDocument();
  });

  it("should display properties when loaded", async () => {
    render(<PropertiesList category="residential" />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading properties/i)).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("should show message when no properties found", async () => {
    mockGetDocsResult = {
      forEach: () => {}, // Empty result
    };
    
    render(<PropertiesList />);
    
    await waitFor(() => {
      expect(screen.getByText(/no properties found/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
