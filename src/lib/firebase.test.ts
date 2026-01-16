import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock environment variables
const mockEnv = {
  VITE_FIREBASE_API_KEY: "test-api-key",
  VITE_FIREBASE_AUTH_DOMAIN: "test.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "test-project",
  VITE_FIREBASE_STORAGE_BUCKET: "test-project.appspot.com",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "123456789",
  VITE_FIREBASE_APP_ID: "1:123456789:web:abc123",
};

describe("Firebase Configuration", () => {
  beforeEach(() => {
    vi.resetModules();
    // Set environment variables
    Object.entries(mockEnv).forEach(([key, value]) => {
      import.meta.env[key] = value;
    });
  });

  it("should export auth, db, and storage", async () => {
    const { auth, db, storage } = await import("./firebase");
    
    // These may be null if Firebase is not configured, which is expected behavior
    expect(auth).toBeDefined();
    expect(db).toBeDefined();
    expect(storage).toBeDefined();
  });

  it("should handle missing configuration gracefully", async () => {
    // Clear env vars
    Object.keys(mockEnv).forEach((key) => {
      delete import.meta.env[key];
    });
    
    vi.resetModules();
    const { auth, db, storage } = await import("./firebase");
    
    // Should be null when not configured
    expect(auth).toBeNull();
    expect(db).toBeNull();
    expect(storage).toBeNull();
  });
});
