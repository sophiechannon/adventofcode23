import { readFile } from "../utils/utils";

export const getNumberSets = (line: string) => {
  const nameAndNumber = line.split(": ");
  const withoutCardNo = nameAndNumber[1];
  const cardName = nameAndNumber[0].split(" ");
  const cardNo = cardName[cardName.length - 1];
  const twoHalves = withoutCardNo.split(" | ");
  return {
    winning: formatArray(twoHalves[0]),
    yours: formatArray(twoHalves[1]),
    cardNo,
    copies: 1,
  };
};

export const getMatchedNumbers = (winning: string[], yours: string[]) =>
  yours.filter((num) => winning.includes(num));

export const getScore = (array: string[]) => {
  let counter = 0;
  let score = 0;
  while (counter < array.length) {
    if (counter === 0) {
      score = 1;
    } else {
      score *= 2;
    }
    counter++;
  }
  return score;
};

export const getTotalScore = async (fileName: string) => {
  const reader = readFile(fileName);

  let res = 0;
  for await (const line of reader) {
    const numberSets = getNumberSets(line);
    const matchedNumbers = getMatchedNumbers(
      numberSets.winning,
      numberSets.yours
    );
    res += getScore(matchedNumbers);
  }

  return res;
};

export const formatArray = (string: string) =>
  string.replaceAll("  ", " ").trim().split(" ");
