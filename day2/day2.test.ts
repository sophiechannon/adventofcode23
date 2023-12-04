import {
  getColors,
  isSetValid,
  structureData,
  main,
  getLowestNumbers,
  mainV2,
} from "./day2";

describe("day2", () => {
  it("structureData", () => {
    expect(
      structureData("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
    ).toEqual(["1", "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"]);
  });

  it("getColors", () => {
    expect(getColors("3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")).toEqual(
      ["3 blue", "4 red", "1 red", "2 green", "6 blue", "2 green"]
    );
  });

  it("isSetValid returns true", () => {
    expect(
      isSetValid(["3 blue", "4 red", "1 red", "2 green", "6 blue", "2 green"])
    ).toEqual(true);
  });
  it("isSetValid returns false", () => {
    expect(
      isSetValid([
        "8 green",
        "6 blue",
        "20 red",
        "5 blue",
        "4 red",
        "13 green",
        "5 green",
        "1 red",
      ])
    ).toEqual(false);
  });
  it("returns power 1", () => {
    expect(
      getLowestNumbers([
        "3 blue",
        "4 red",
        "1 red",
        "2 green",
        "6 blue",
        "2 green",
      ])
    ).toEqual(48);
  });
  it("returns power 2", () => {
    expect(
      getLowestNumbers([
        "8 green",
        "6 blue",
        "20 red",
        "5 blue",
        "4 red",
        "13 green",
        "5 green",
        "1 red",
      ])
    ).toEqual(1560);
  });
});

describe("integration", () => {
  it("works for test cases", async () => {
    expect(await main("day2/test")).toEqual(8);
  });
  it("works for real input", async () => {
    expect(await main("day2/input")).toEqual(2439);
  });
  it("works for test cases v2", async () => {
    expect(await mainV2("day2/test")).toEqual(2286);
  });
  it("works for test cases v2", async () => {
    expect(await mainV2("day2/input")).toEqual(63711);
  });
});
