import * as fs from "fs";
import * as readline from "readline";

export const getNumericValues = (value: string) =>
  value.replaceAll(/[a-zA-Z]/g, "");

export const getFirstAndLast = (value: string) => {
  if (!value.length) return "0";
  return value[0] + value[value.length - 1];
};

export const main = async (fileName: string) => {
  const myInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
  });

  let res = 0;
  for await (const line of myInterface) {
    const numbers = getNumericValues(line);
    const firstAndLastOnly = getFirstAndLast(numbers);
    res += parseInt(firstAndLastOnly);
  }
  return res;
};

const VALID = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export const replaceWordsWithNumbers = (value: string) => {
  const valueArray = value.split("");
  let res = "";
  valueArray.forEach((element) => {
    res += element;
    Object.keys(VALID).forEach(
      (num) => (res = res.replaceAll(num, VALID[num as keyof typeof VALID]))
    );
  });
  return res;
};

export const mainV2 = async (fileName: string) => {
  const myInterface = readline.createInterface({
    input: fs.createReadStream(fileName),
  });

  let res = 0;
  for await (const line of myInterface) {
    const converted = replaceWordsWithNumbers(line);
    const numbers = getNumericValues(converted);
    const firstAndLastOnly = getFirstAndLast(numbers);
    res += parseInt(firstAndLastOnly);
  }
  return res;
};
