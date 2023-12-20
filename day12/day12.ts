import { readFile } from "../utils/utils";

export const main = async (filename: string) => {
  const reader = readFile(filename);
  let res = 0;

  for await (const line of reader) {
    const numbers = getNumbers(line);
    const springs = getSprings(line);
    const total = getTotalNumbers(numbers);
    const values = generateVariants(springs, total);
    const re = generateRegex(numbers);
    values.forEach((v) => (v.match(re) ? (res += 1) : undefined));
  }
  return res;
};

export const getNumbers = (line: string) => line.split(" ")[1].split(",");
export const getSprings = (line: string) => line.split(" ")[0];
export const getTotalNumbers = (nums: string[]) => {
  const total = nums.map((n) => +n).reduce((a, b) => a + b);
  return total;
};

const generateRegex = (numbers: string[]) => {
  const middleOfRegexArr: string[] = [];
  numbers.forEach((num) => {
    middleOfRegexArr.push(`#{${num}}`);
  });
  const middleOfRegex = middleOfRegexArr.join("[.?]{1,}");
  const fullRegex = `[.?]{0,}${middleOfRegex}[.?]{0,}`;
  return new RegExp(fullRegex, "g");
};

const generateVariants = (inputString: string, targetCount: number) => {
  const existingHashes = inputString.match(/#/g)?.length ?? 0;
  const variants: string[] = [];

  const generateVariant = (str: string, index: number, count: number) => {
    if (index === str.length) {
      if (count === targetCount) {
        variants.push(str);
      }
      return;
    }

    if (str[index] === "?") {
      generateVariant(
        str.slice(0, index) + "#" + str.slice(index + 1),
        index + 1,
        count + 1
      );
    }

    generateVariant(str, index + 1, count);
  };

  generateVariant(inputString, 0, existingHashes);

  return variants;
};
