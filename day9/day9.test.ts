import { PatternFinder } from "./day9";

describe("day9", () => {
  it("test", async () => {
    const pf = new PatternFinder();
    expect(await pf.run("day9/test")).toEqual(114);
  });
  it("input", async () => {
    const pf = new PatternFinder();
    expect(await pf.run("day9/input")).toEqual(2005352194);
  });
  it("test reverse", async () => {
    const pf = new PatternFinder(true);
    expect(await pf.run("day9/test")).toEqual(2);
  });
  it("input reverse", async () => {
    const pf = new PatternFinder(true);
    expect(await pf.run("day9/input")).toEqual(1077);
  });
});
