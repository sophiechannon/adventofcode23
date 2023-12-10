import { CamelCardsGame } from "./CamelCardsGame";

describe("CamelCardsGame", () => {
  const game = new CamelCardsGame();
  it("play tst", async () => {
    expect(await game.play("day7/test")).toEqual(6440);
  });
  it("play real", async () => {
    expect(await game.play("day7/input")).toEqual(250254244);
  });
  it("play tst joker", async () => {
    expect(await game.play("day7/test", true)).toEqual(5905);
  });
  it("play real joker", async () => {
    expect(await game.play("day7/input", true)).toEqual(250087440);
  });
});
