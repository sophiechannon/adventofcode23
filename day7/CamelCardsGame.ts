import { readFile } from "../utils/utils";
import { Round } from "./Round";

type RoundData = { category: string; bid: number; hand: string };
type CategoryData = { [key: string]: RoundData[] };

export class CamelCardsGame {
  roundScores: RoundData[];
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
  static possibleHands = ["11111", "1112", "122", "113", "23", "14", "5"];

  constructor() {
    this.roundScores = [];
  }

  async play(fileName: string) {
    this.roundScores = [];
    const reader = readFile(fileName);
    const round = new Round();

    for await (const line of reader) {
      const splitLine = line.split(" ");
      const hand = splitLine[0];
      const bid = +splitLine[1];
      const category = round.getPattern(hand.split(""));
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
      const handString = round.hand.split("");
      const hexValue = handString
        .map((value) =>
          (CamelCardsGame.availableCards.indexOf(value) + 2).toString(16)
        )
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
      .replaceAll("a", "T")
      .replaceAll("b", "J")
      .replaceAll("c", "Q")
      .replaceAll("d", "K")
      .replaceAll("e", "A");
  }
}
