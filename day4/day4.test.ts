import {
  getMatchedNumbers,
  getNumberSets,
  getScore,
  getTotalScore,
} from "./day4";

describe("day4", () => {
  it("gets number data", () => {
    const res = getNumberSets(
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1"
    );
    expect(res).toEqual({
      winning: ["1", "21", "53", "59", "44"],
      yours: ["69", "82", "63", "72", "16", "21", "14", "1"],
    });
  });
  it("gets matches numbers", () => {
    const res = getMatchedNumbers(
      ["41", "48", "83", "86", "17"],
      ["83", "86", "6", "31", "17", "9", "48", "53"]
    );
    expect(res).toEqual(["83", "86", "17", "48"]);
  });
  it("gets score", () => {
    const res = getScore(["83", "86", "17", "48"]);
    expect(res).toEqual(8);
  });
  it("gets total test score", async () => {
    const res = await getTotalScore("day4/test");
    expect(res).toEqual(13);
  });
  it("gets total real score", async () => {
    const res = await getTotalScore("day4/input");
    expect(res).toEqual(23673);
  });
});
