import { ParabolicReflectorDish } from "./ParabolicReflectorDish";

describe(ParabolicReflectorDish, () => {
  it("test", async () => {
    const prd = new ParabolicReflectorDish("day14/test");
    await prd.placeRocks();
    expect(prd.dish).toEqual([
      ["O", ".", ".", ".", ".", "#", ".", ".", ".", "."],
      ["O", ".", "O", "O", "#", ".", ".", ".", ".", "#"],
      [".", ".", ".", ".", ".", "#", "#", ".", ".", "."],
      ["O", "O", ".", "#", "O", ".", ".", ".", ".", "O"],
      [".", "O", ".", ".", ".", ".", ".", "O", "#", "."],
      ["O", ".", "#", ".", ".", "O", ".", "#", ".", "#"],
      [".", ".", "O", ".", ".", "#", "O", ".", ".", "O"],
      [".", ".", ".", ".", ".", ".", ".", "O", ".", "."],
      ["#", ".", ".", ".", ".", "#", "#", "#", ".", "."],
      ["#", "O", "O", ".", ".", "#", ".", ".", ".", "."],
    ]);

    prd.tilt();

    expect(prd.getTotalLoad()).toEqual(136);
  });
  it("test", async () => {
    const prd = new ParabolicReflectorDish("day14/input");
    await prd.placeRocks();
    prd.tilt();
    expect(prd.getTotalLoad()).toEqual(109424);
  });
});
