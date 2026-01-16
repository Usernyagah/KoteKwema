import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
  });

  it("should handle undefined and null", () => {
    expect(cn("class1", undefined, null, "class2")).toBe("class1 class2");
  });

  it("should handle empty strings", () => {
    expect(cn("class1", "", "class2")).toBe("class1 class2");
  });
});
