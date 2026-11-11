import { describe, expect, it } from "vitest";
import { frameLoadOrder } from "./scroll-sequence";

describe("frameLoadOrder", () => {
  it("loads the first frame, a coarse pass, then every remaining frame once", () => {
    const order = frameLoadOrder(20);
    expect(order.slice(0, 3)).toEqual([0, 8, 16]);
    expect([...order].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 20 }, (_, i) => i),
    );
  });
});
