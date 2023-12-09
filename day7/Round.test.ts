import { Round } from "./Round";

describe("HandCategorizer", () => {
  it("getPattern", () => {
    const round = new Round();
    expect(round.getPattern(["3", "2", "T", "3", "K"])).toEqual("1112");
    expect(round.getPattern(["T", "5", "5", "J", "5"])).toEqual("113");
    expect(round.getPattern(["K", "K", "6", "7", "7"])).toEqual("122");
    expect(round.getPattern(["K", "K", "K", "K", "K"])).toEqual("5");
    expect(round.getPattern(["A", "2", "3", "4", "5"])).toEqual("11111");
    expect(round.getPattern(["A", "5", "5", "5", "5"])).toEqual("14");
    expect(round.getPattern(["A", "A", "5", "5", "5"])).toEqual("23");
  });
});
