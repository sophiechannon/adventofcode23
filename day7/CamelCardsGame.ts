import { readFile } from "../utils/utils";
import { Round } from "./Round";

type RoundData = { category: string; bid: number; hand: string };

export class CamelCardsGame {
  roundScores: RoundData[];
  joker?: boolean;
  static availableCards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ];
  static jokerCards = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
  ];
  static possibleHands = ["11111", "2111", "221", "311", "32", "41", "5"];

  constructor() {
    this.roundScores = [];
    this.joker = undefined;
  }

  async play(fileName: string, jokerMod?: boolean) {
    this.joker = jokerMod;
    this.roundScores = [];
    const reader = readFile(fileName);
    const round = new Round();

    for await (const line of reader) {
      const splitLine = line.split(" ");
      const hand = splitLine[0];
      const bid = +splitLine[1];
      const category = round.getPattern(hand.split(""), jokerMod);
      this.roundScores.push({ category, bid, hand });
    }

    let prevLength = 1;
    let res = 0;

    for (const hand of CamelCardsGame.possibleHands) {
      const roundsInThisCategory = this.roundScores.filter(
        (round) => round.category === hand
      );

      const sorted = this.sortByCategory(roundsInThisCategory);

      sorted.forEach((score, index) => {
        res += score.bid * (index + prevLength);
      });

      prevLength += roundsInThisCategory.length;
    }
    return res;
  }

  sortByCategory(roundsInThisCategory: RoundData[]) {
    const roundsWithHex = roundsInThisCategory.map((round) => {
      const handArray = round.hand.split("");
      const hexValue = handArray
        .map((value) => {
          return (
            (this.joker
              ? CamelCardsGame.jokerCards
              : CamelCardsGame.availableCards
            ).indexOf(value) + (this.joker ? 1 : 2)
          ).toString(16);
        })
        .join("");

      return { ...round, hand: hexValue };
    });

    const sorted = roundsWithHex.sort((a, b) => {
      const parseA = parseInt(a.hand, 16);
      const parseB = parseInt(b.hand, 16);
      if (parseA === parseB) return 0;
      return parseA < parseB ? -1 : 1;
    });

    return sorted.map((value) => ({
      ...value,
      hand: this.replaceHexWithActualCard(value.hand),
    }));
  }

  private replaceHexWithActualCard(hand: string) {
    return hand
      .replaceAll("1", "J")
      .replaceAll("a", "T")
      .replaceAll("b", this.joker ? "Q" : "J")
      .replaceAll("c", this.joker ? "K" : "Q")
      .replaceAll("d", this.joker ? "A" : "K")
      .replaceAll("e", "A");
  }
}
