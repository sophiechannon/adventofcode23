import {
  getDataAsArray,
  getDistanceBasedOnPress,
  getMarginOfError,
} from "./day6";
import { getData, getMarginOfErrorV2 } from "./day6V2";

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

describe("day6V2", () => {
  it("getData", () => {
    expect(getData("Time:        40     81     77     72")).toEqual(40817772);
  });
  it("getMarginOfErrorV2", async () => {
    expect(await getMarginOfErrorV2("day6/test")).toBe(71503);
  });
  it("getMarginOfErrorV2 real", async () => {
    expect(await getMarginOfErrorV2("day6/input")).toBe(28101347);
  });
});
