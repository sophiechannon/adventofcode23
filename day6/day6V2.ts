import { readFile, removeWhitespace } from "../utils/utils";
import { getDistanceBasedOnPress } from "./day6";

export const getData = (string: string) => {
  const justNumbers = string.split(":")[1];
  return +removeWhitespace(justNumbers);
};

export const getMarginOfErrorV2 = async (fileName: string) => {
  const reader = readFile(fileName);
  let time = 0;
  let distanceToBeat = 0;

  for await (const line of reader) {
    if (!time) {
      time = getData(line);
      continue;
    }
    if (!distanceToBeat) {
      distanceToBeat = getData(line);
    }
  }

  return getDistanceBasedOnPress(time, distanceToBeat);
};
