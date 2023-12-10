import { MapReader } from "./day8";

describe("MapReader", () => {
  it("navigate test1", async () => {
    const reader = new MapReader();
    expect(await reader.navigate("day8/test1")).toEqual(2);
    expect(reader.directions).toEqual([1, 0]);
    expect(reader.nodes).toEqual({
      AAA: ["BBB", "CCC"],
      BBB: ["DDD", "EEE"],
      CCC: ["ZZZ", "GGG"],
      DDD: ["DDD", "DDD"],
      EEE: ["EEE", "EEE"],
      GGG: ["GGG", "GGG"],
      ZZZ: ["ZZZ", "ZZZ"],
    });
  });
  it("navigate test2", async () => {
    const reader = new MapReader();
    expect(await reader.navigate("day8/test2")).toEqual(6);
    expect(reader.directions).toEqual([0, 0, 1]);
    expect(reader.nodes).toEqual({
      AAA: ["BBB", "BBB"],
      BBB: ["AAA", "ZZZ"],
      ZZZ: ["ZZZ", "ZZZ"],
    });
  });
  it("navigate real", async () => {
    const reader = new MapReader();
    expect(await reader.navigate("day8/input")).toEqual(21409);
  });
});
