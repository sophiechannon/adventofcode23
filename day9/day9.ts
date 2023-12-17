import { readFile } from "../utils/utils";

export class PatternFinder {
  private reverseMod;
  constructor(reverseMod?: boolean) {
    this.reverseMod = reverseMod;
  }
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

  private getArray(string: string) {
    return string.split(" ").map((v) => +v);
  }

  private getNextLine(
    array: number[],
    lastInEachLine: number[] = []
  ): number[] {
    const newArr: number[] = [];

    lastInEachLine.push(array[this.reverseMod ? 0 : array.length - 1]);
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

  private getResult(array: number[]) {
    return array.reverse().reduce((a, b) => {
      if (this.reverseMod) return b - a;
      return a + b;
    });
  }
}
