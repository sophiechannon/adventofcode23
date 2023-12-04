import {
  getFirstAndLast,
  getNumericValues,
  main,
  mainV2,
  replaceWordsWithNumbers,
} from "./day1";

describe("getNumericValue", () => {
  it("works with a single array", () => {
    expect(getNumericValues("1abc2")).toEqual("12");
  });
  it("works with the test array", () => {
    expect(getNumericValues("a1b2c3d4e5f")).toEqual("12345");
  });
});
describe("getFirstAndLast", () => {
  it("works with no numbers", () => {
    expect(getFirstAndLast("")).toEqual("0");
  });
  it("works with single number", () => {
    expect(getFirstAndLast("7")).toEqual("77");
  });
  it("works with the test array", () => {
    expect(getFirstAndLast("12345")).toEqual("15");
  });
});
describe("main", () => {
  it("main test", async () => {
    expect(await main("day1/test")).toEqual(155);
  });
  it("main real", async () => {
    expect(await main("day1/input")).toEqual(54561);
  });
});
describe("replaceWordsWithNumbers", () => {
  it("finds 219", () => {
    expect(replaceWordsWithNumbers("two1nine")).toEqual("219");
  });
  it("finds 8wo3", () => {
    expect(replaceWordsWithNumbers("eightwothree")).toEqual("8wo3");
  });
  it("finds abc123xyz", () => {
    expect(replaceWordsWithNumbers("abcone2threexyz")).toEqual("abc123xyz");
  });
});
describe("mainV2", () => {
  it("main test", async () => {
    expect(await mainV2("day1/test2")).toEqual(281);
  });
  it("main real", async () => {
    expect(await mainV2("day1/input")).toEqual(54076);
  });
});
