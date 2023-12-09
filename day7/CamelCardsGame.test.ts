import { CamelCardsGame } from "./CamelCardsGame";

describe("CamelCardsGame", () => {
  const game = new CamelCardsGame();
  // it("sortByCategory", () => {
  //   game.roundScores = [
  //     { category: "1112", bid: 765, hand: "32T3K" },
  //     { category: "113", bid: 684, hand: "T55J5" },
  //     { category: "122", bid: 28, hand: "KK677" },
  //     { category: "122", bid: 220, hand: "KTJJT" },
  //     { category: "113", bid: 483, hand: "QQQJA" },
  //   ];
  //   expect(
  //     game.sortByCategory([
  //       { category: "122", bid: 28, hand: "KK677" },
  //       { category: "122", bid: 220, hand: "KTJJT" },
  //     ])
  //   ).toEqual([
  //     { bid: 28, category: "122", hand: "KK677" },
  //     { bid: 220, category: "122", hand: "KTJJT" },
  //   ]);
  //   expect(
  //     game.sortByCategory([
  //       { bid: 684, category: "113", hand: "T55J5" },
  //       { bid: 483, category: "113", hand: "QQQJA" },
  //     ])
  //   ).toEqual([
  //     { bid: 483, category: "113", hand: "QQQJA" },
  //     { bid: 684, category: "113", hand: "T55J5" },
  //   ]);
  // });
  it("play tst", async () => {
    expect(await game.play("day7/test")).toEqual(6440);
  });
  it("play real", async () => {
    expect(await game.play("day7/input")).toEqual(250254244);
  });
});
