import {
  getMatchedNumbers,
  getNumberSets,
  getScore,
  getTotalScore,
} from "./day4";
import { extractCardData, getTotalScore as getTotalScoreV2 } from "./day4V2";

describe("day4", () => {
  it("gets number data", () => {
    const res = getNumberSets(
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1"
    );
    expect(res).toEqual({
      winning: ["1", "21", "53", "59", "44"],
      yours: ["69", "82", "63", "72", "16", "21", "14", "1"],
      cardNo: "3",
      copies: 1,
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

describe("day4 part 2", () => {
  it("returns card data as object", async () => {
    const res = await extractCardData("day4/test");
    expect(res).toEqual({
      "1": {
        cardNo: "1",
        copies: 1,
        winning: ["41", "48", "83", "86", "17"],
        yours: ["83", "86", "6", "31", "17", "9", "48", "53"],
      },
      "2": {
        cardNo: "2",
        copies: 1,
        winning: ["13", "32", "20", "16", "61"],
        yours: ["61", "30", "68", "82", "17", "32", "24", "19"],
      },
      "3": {
        cardNo: "3",
        copies: 1,
        winning: ["1", "21", "53", "59", "44"],
        yours: ["69", "82", "63", "72", "16", "21", "14", "1"],
      },
      "4": {
        cardNo: "4",
        copies: 1,
        winning: ["41", "92", "73", "84", "69"],
        yours: ["59", "84", "76", "51", "58", "5", "54", "83"],
      },
      "5": {
        cardNo: "5",
        copies: 1,
        winning: ["87", "83", "26", "28", "32"],
        yours: ["88", "30", "70", "12", "93", "22", "82", "36"],
      },
      "6": {
        cardNo: "6",
        copies: 1,
        winning: ["31", "18", "13", "56", "72"],
        yours: ["74", "77", "10", "23", "35", "67", "36", "11"],
      },
    });
  });
  it("gets total test score v2", async () => {
    const res = await getTotalScoreV2("day4/test");
    expect(res).toEqual(30);
  });
  it("gets total real score v2", async () => {
    const res = await getTotalScoreV2("day4/input");
    expect(res).toEqual(12263631);
  });
});
