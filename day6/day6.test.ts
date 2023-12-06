import {
  getDataAsArray,
  getDistanceBasedOnPress,
  getMarginOfError,
} from "./day6";

describe("day6", () => {
  it("getArray", () => {
    expect(getDataAsArray("Time:        40     81     77     72")).toEqual([
      40, 81, 77, 72,
    ]);
  });
  it("winningCount", () => {
    expect(getDistanceBasedOnPress(7, 9)).toBe(4);
    expect(getDistanceBasedOnPress(15, 40)).toBe(8);
    expect(getDistanceBasedOnPress(72, 1089)).toBe(29);
  });
  it("getMarginOfError", async () => {
    expect(await getMarginOfError("day6/test")).toBe(288);
  });
  it("getMarginOfError real", async () => {
    expect(await getMarginOfError("day6/input")).toBe(861300);
  });
});
