import { readFile } from "../utils/utils";

export class PatternFinder {
  async run(filename: string) {
    const reader = readFile(filename);
    let result = 0;

    for await (const line of reader) {
      const array = this.getArray(line);
      const nextLine = this.getNextLine(array);
      const nextInLine = this.getResult(nextLine);
      result += nextInLine;
    }
    return result;
  }

  getArray(string: string) {
    return string.split(" ").map((v) => +v);
  }

  getNextLine(array: number[], lastInEachLine: number[] = []): number[] {
    const newArr: number[] = [];
    lastInEachLine.push(array[array.length - 1]);
    array.reduce((a, b) => {
      newArr.push(b - a);
      return b;
    });
    if (newArr.filter((v) => v !== 0).length) {
      return this.getNextLine(newArr, lastInEachLine);
    } else {
      return lastInEachLine;
    }
  }

  getResult(array: number[]) {
    return array.reverse().reduce((a, b) => a + b);
  }
}
