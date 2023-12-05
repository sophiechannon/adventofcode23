import { readFile } from "../utils/lineReader";
import { getMatchedNumbers, getNumberSets } from "./day4";

type Cards = {
  [key: string]: ReturnType<typeof getNumberSets>;
};

export const extractCardData = async (fileName: string) => {
  const allCards: Cards = {};

  const reader = readFile(fileName);

  for await (const line of reader) {
    const thisCard = getNumberSets(line);

    allCards[thisCard.cardNo] = { ...thisCard };
  }
  return allCards;
};

export const getTotalScore = async (fileName: string) => {
  const allCards = await extractCardData(fileName);
  const copies = Object.values(allCards).map((v) => {
    const numberOfMatches = getMatchedNumbers(v.winning, v.yours).length;
    const cardsToUpdate = Array.from(
      { length: numberOfMatches },
      (_, i) => i + parseInt(v.cardNo) + 1
    );
    cardsToUpdate.map((card) => {
      if (allCards[card]) {
        allCards[card].copies += v.copies;
      }
    });
    return v.copies;
  });
  return copies.reduce((a, b) => a + b);
};
