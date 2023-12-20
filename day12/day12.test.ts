import { getNumbers, getSprings, getTotalNumbers, main } from "./day12";

describe("day12", () => {
  it("getsNumber", () => {
    expect(getNumbers(".??..??...?##. 1,1,3")).toEqual(["1", "1", "3"]);
  });
  it("getSprings", () => {
    expect(getSprings(".??..??...?##. 1,1,3")).toEqual(".??..??...?##.");
  });
  it("getTotalNumbers", () => {
    expect(getTotalNumbers(["1", "1", "3"])).toEqual(5);
  });
  it("test", async () => {
    expect(await main("day12/test")).toEqual(21);
  });
  it("test", async () => {
    expect(await main("day12/input")).toEqual(7007);
  });
});
