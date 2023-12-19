import { CosmosNavigator } from "./day11";

describe(CosmosNavigator, () => {
  it("test", async () => {
    const cos = new CosmosNavigator(2);
    expect(await cos.run("day11/test")).toEqual(374);
  });
  it("input", async () => {
    const cos = new CosmosNavigator(2);
    expect(await cos.run("day11/input")).toEqual(9724940);
  });
  it("test", async () => {
    const cos = new CosmosNavigator(10);
    expect(await cos.run("day11/test")).toEqual(1030);
  });
  it("test", async () => {
    const cos = new CosmosNavigator(100);
    expect(await cos.run("day11/test")).toEqual(8410);
  });
  it("input", async () => {
    const cos = new CosmosNavigator(1000000);
    expect(await cos.run("day11/input")).toEqual(569052586852);
  });
});
