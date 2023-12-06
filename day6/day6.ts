import { readFile, replaceExcessWhitespaceWithSingle } from "../utils/utils";

export const getDataAsArray = (string: string) => {
  return replaceExcessWhitespaceWithSingle(string)
    .split(" ")
    .slice(1)
    .map((s) => +s);
};

export const getDistanceBasedOnPress = (
  time: number,
  distanceToBeat: number
) => {
  let winningCount = 0;
  let counter = 0;
  while (counter < time) {
    const timeAfterPress = time - counter;
    const distanceTraveled = timeAfterPress * counter;
    if (distanceTraveled > distanceToBeat) {
      winningCount++;
    }
    counter++;
  }
  return winningCount;
};

export const getMarginOfError = async (fileName: string) => {
  const reader = readFile(fileName);
  let times: number[] | undefined = undefined;
  let distanceToBeat: number[] | undefined = undefined;

  for await (const line of reader) {
    if (!times) {
      times = getDataAsArray(line);
      continue;
    }
    if (!distanceToBeat) {
      distanceToBeat = getDataAsArray(line);
    }
  }

  const winningOptions: number[] = [];

  times?.forEach((element, index) => {
    const winning = getDistanceBasedOnPress(
      element,
      distanceToBeat?.[index] ?? 0
    );
    winningOptions.push(winning);
  });

  return winningOptions.reduce((a, b) => a * b);
};
