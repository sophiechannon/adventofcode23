import { PatternFinder } from "./day9";

describe("day9", () => {
  it("getNextLine", () => {
    const pf = new PatternFinder();
    expect(pf.getNextLine([0, 3, 6, 9, 12, 15])).toEqual([15, 3]);
  });
  it("getNextLine", () => {
    const pf = new PatternFinder();
    expect(pf.getNextLine([10, 13, 16, 21, 30, 45])).toEqual([45, 15, 6, 2]);
  });
  it("getResult", () => {
    const pf = new PatternFinder();
    expect(pf.getResult([45, 15, 6, 2])).toEqual(68);
  });
  it("test", async () => {
    const pf = new PatternFinder();
    expect(await pf.run("day9/test")).toEqual(114);
  });
  it("input", async () => {
    const pf = new PatternFinder();
    expect(await pf.run("day9/input")).toEqual(2005352194);
  });
});
