import { MirrorFinder } from "./MirrorFinder";

describe(MirrorFinder, () => {
  it("test", async () => {
    const mf = new MirrorFinder();
    expect(await mf.find("day13/test")).toEqual(405);
    expect(mf.maps).toEqual([
      [
        "#.##..##.",
        "..#.##.#.",
        "##......#",
        "##......#",
        "..#.##.#.",
        "..##..##.",
        "#.#.##.#.",
      ],
      [
        "#...##..#",
        "#....#..#",
        "..##..###",
        "#####.##.",
        "#####.##.",
        "..##..###",
        "#....#..#",
      ],
    ]);
  });
  it("input", async () => {
    const mf = new MirrorFinder();
    expect(await mf.find("day13/input")).toEqual(30705);
  });
});
