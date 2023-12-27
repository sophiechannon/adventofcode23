import { HASH } from "./HASH";

describe(HASH, () => {
  it("test", async () => {
    const hash = new HASH();
    expect(await hash.getValueFromInput("day15/test")).toEqual(1320);
  });
  it("input", async () => {
    const hash = new HASH();
    expect(await hash.getValueFromInput("day15/input")).toEqual(514281);
  });
});
