import { Round } from "./Round";

describe("HandCategorizer", () => {
  it("getPattern", () => {
    const round = new Round();
    expect(round.getPattern(["3", "2", "T", "3", "K"])).toEqual("2111");
    expect(round.getPattern(["T", "5", "5", "J", "5"])).toEqual("311");
    expect(round.getPattern(["K", "K", "6", "7", "7"])).toEqual("221");
    expect(round.getPattern(["K", "K", "K", "K", "K"])).toEqual("5");
    expect(round.getPattern(["A", "2", "3", "4", "5"])).toEqual("11111");
    expect(round.getPattern(["A", "5", "5", "5", "5"])).toEqual("41");
    expect(round.getPattern(["A", "A", "5", "5", "5"])).toEqual("32");
  });
  it("getPattern joker mod", () => {
    const round = new Round();
    expect(round.getPattern(["3", "2", "T", "3", "K"], true)).toEqual("2111");
    expect(round.getPattern(["T", "5", "5", "J", "5"], true)).toEqual("41");
    expect(round.getPattern(["K", "K", "6", "7", "7"], true)).toEqual("221");
    expect(round.getPattern(["K", "K", "K", "K", "K"], true)).toEqual("5");
    expect(round.getPattern(["A", "2", "3", "4", "5"], true)).toEqual("11111");
    expect(round.getPattern(["A", "2", "J", "4", "5"], true)).toEqual("2111");
    expect(round.getPattern(["J", "5", "J", "5", "5"], true)).toEqual("5");
    expect(round.getPattern(["A", "A", "J", "5", "5"], true)).toEqual("32");
    expect(round.getPattern(["2", "7", "A", "J", "A"], true)).toEqual("311");
  });
});
