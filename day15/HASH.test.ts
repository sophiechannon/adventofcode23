import { HASH } from "./HASH";

describe(HASH, () => {
  it("test", async () => {
    const hash = new HASH();
    expect(await hash.getValueFromInput("day15/test")).toEqual(145);
    expect(hash.hashmap).toEqual({
      "0": [
        {
          focus: 1,
          label: "rn",
        },
        {
          focus: 2,
          label: "cm",
        },
      ],
      "1": [],
      "3": [
        {
          focus: 7,
          label: "ot",
        },
        {
          focus: 5,
          label: "ab",
        },
        {
          focus: 6,
          label: "pc",
        },
      ],
    });
  });
  it("input", async () => {
    const hash = new HASH();
    expect(await hash.getValueFromInput("day15/input")).toEqual(244199);
  });
});
