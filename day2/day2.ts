import * as fs from "fs";
import * as readline from "readline";

type ValuesKey = keyof typeof MAX_VALUES;

const MAX_VALUES = {
  red: 12,
  green: 13,
  blue: 14,
};

export const structureData = (line: string) => {
  const splitLine = line.split(": ");
  return [splitLine[0].replace("Game ", ""), splitLine[1]];
};

export const getColors = (value: string) => {
  const strings = value.replaceAll(";", ",").split(", ");
  return strings;
};

export const isSetValid = (values: string[]) => {
  let res = true;
  for (const v of values) {
    const color = v.split(" ")[1];
    const number = +v.split(" ")[0];
    if (MAX_VALUES[color as ValuesKey] < number) {
      res = false;
      break;
    }
  }
  return res;
};

export const main = async (fileName: string) => {
  const myInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
  });

  let res = 0;
  for await (const line of myInterface) {
    const number = +structureData(line)[0];
    const values = structureData(line)[1];
    const colors = getColors(values);
    const isValid = isSetValid(colors);
    if (isValid) res += number;
  }
  return res;
};

export const getLowestNumbers = (values: string[]) => {
  const minValues = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const v of values) {
    const color = v.split(" ")[1];
    const number = +v.split(" ")[0];
    if (minValues[color as ValuesKey] < number) {
      minValues[color as ValuesKey] = number;
    }
  }
  return minValues.red * minValues.green * minValues.blue;
};

export const mainV2 = async (fileName: string) => {
  const myInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
  });

  let res = 0;
  for await (const line of myInterface) {
    const number = +structureData(line)[0];
    const values = structureData(line)[1];
    const colors = getColors(values);
    const power = getLowestNumbers(colors);
    res += power;
  }
  return res;
};
