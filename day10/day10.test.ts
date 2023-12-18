import { PipeMapper } from "./day10";

describe(PipeMapper, () => {
  it("test", async () => {
    const mapper = new PipeMapper();
    expect(await mapper.run("day10/test")).toEqual(4);
    expect(mapper.area).toEqual([
      ["-", "L", "|", "F", "7"],
      ["7", "S", "-", "7", "|"],
      ["L", "|", "7", "|", "|"],
      ["-", "L", "-", "J", "|"],
      ["L", "|", "-", "J", "F"],
    ]);
    expect(mapper.startingPoint).toEqual({ row: 1, col: 1 });
  });
  it("test2", async () => {
    const mapper = new PipeMapper();
    expect(await mapper.run("day10/test2")).toEqual(8);
    expect(mapper.area).toEqual([
      ["7", "-", "F", "7", "-"],
      [".", "F", "J", "|", "7"],
      ["S", "J", "L", "L", "7"],
      ["|", "F", "-", "-", "J"],
      ["L", "J", ".", "L", "J"],
    ]);
    expect(mapper.startingPoint).toEqual({ row: 2, col: 0 });
  });
  it("input", async () => {
    const mapper = new PipeMapper();
    expect(await mapper.run("day10/input")).toEqual(6773);
  });
});
