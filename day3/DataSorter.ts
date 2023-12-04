import { readFile } from "../utils/lineReader";

type PartNumbers = {
  [key: number]: {
    [key: number]: {
      number: string;
      valid: boolean;
      index: number;
    };
  }[];
};

export class DataSorter {
  previousLine;
  lineNumber;
  currentNo: { number: string; index: number } | undefined;
  lastValueType: "number" | "symbol" | undefined;
  potentialPartNumbers: PartNumbers;
  isValidNumber;

  constructor() {
    this.previousLine = "";
    this.lineNumber = 0;
    this.currentNo;
    this.lastValueType = undefined;
    this.potentialPartNumbers = {};
    this.isValidNumber = false;
  }

  async getPartNumbers(fileName: string) {
    const myInterface = readFile(fileName);

    for await (const line of myInterface) {
      this.lineNumber++;
      const lineArray = line.split("");
      lineArray.forEach((char, index) => {
        if (this.currentNo && !this.isNumber(char)) {
          this.handleNumberEnd(char);
        }
        if (this.shouldSkip(char)) {
          this.lastValueType = undefined;
          return;
        }
        if (this.isNumber(char)) {
          this.handleNumber(char, index);
          if (index === line.length - 1) {
            this.handleNumberEnd(char);
          }
          return;
        }
        if (this.isSymbol(char)) {
          this.handleSymbol(index);
          return;
        }
      });
      this.previousLine = line;
    }

    const result = Object.values(this.potentialPartNumbers)
      .flat()
      .map((v) => {
        const thisObj = v[+Object.keys(v)[0]];
        return thisObj.valid ? +thisObj.number : 0;
      })
      .reduce((a, b) => a + b);

    this.reset();
    return result;
  }

  private handleNumber(char: string, index: number) {
    if (!this.currentNo) {
      this.isValidNumber = this.lastValueType === "symbol";
      this.currentNo = { number: char, index };
    } else {
      this.currentNo.number += char;
    }
    this.lastValueType = "number";
  }

  private handleNumberEnd(char: string) {
    const hasSymbolAfterOrAbove = this.isSymbol(char) || this.hasSymbolAbove();
    this.isValidNumber = hasSymbolAfterOrAbove || this.isValidNumber;
    if (this.potentialPartNumbers[this.lineNumber] === undefined) {
      this.potentialPartNumbers[this.lineNumber] = [];
    }
    if (this.currentNo)
      this.potentialPartNumbers[this.lineNumber].push({
        [this.currentNo.index]: {
          ...this.currentNo,
          valid: this.isValidNumber,
        },
      });
    this.currentNo = undefined;
    this.isValidNumber = false;
  }

  private handleSymbol(index: number) {
    if (this.potentialPartNumbers[this.lineNumber - 1]) {
      this.potentialPartNumbers[this.lineNumber - 1] =
        this.potentialPartNumbers[this.lineNumber - 1]?.map((v) => {
          const actualIndex = +Object.keys(v)[0];
          const thisObj = v[actualIndex];
          const matches = Array.from(
            { length: thisObj?.number.length + 2 },
            (_, i) => i + thisObj.index - 1
          );
          if (matches.includes(index)) {
            return {
              ...v,
              ...{ [actualIndex]: { ...thisObj, valid: true } },
            };
          }
          return v;
        });
    }

    this.lastValueType = "symbol";
  }

  private hasSymbolAbove() {
    if (!this.currentNo) return false;
    const start = !this.currentNo?.index ? 0 : this.currentNo.index - 1;
    const end = this.currentNo.index + this.currentNo.number.length + 1;
    return this.isSymbol(this.previousLine.slice(start, end));
  }

  private isSymbol(string: string) {
    return !!string.match(/[^\.\d]/);
  }

  private isNumber(string: string) {
    return !!string.match(/[\d]/);
  }

  private shouldSkip(string: string) {
    return !this.isSymbol(string) && !this.isNumber(string);
  }

  private reset() {
    this.previousLine = "";
    this.lineNumber = 0;
    this.currentNo;
    this.lastValueType = undefined;
    this.potentialPartNumbers = {};
    this.isValidNumber = false;
  }
}
