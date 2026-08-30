import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("debe renderizar el Navbar", () => {
    const { container } = render(<Navbar />);

    expect(container).not.toBeNull();
  });
});