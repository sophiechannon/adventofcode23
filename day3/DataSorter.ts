import { readFile } from "../utils/utils";

type PartNumbers = {
  [key: number]: {
    [key: number]: {
      number: string;
      valid: boolean;
      index: number;
      gear?: number;
      line: number;
    };
  }[];
};

export class DataSorter {
  previousLine;
  lineNumber;
  currentNo: { number: string; index: number; gear?: number } | undefined;
  lastValueType: "number" | "symbol" | "gear" | undefined;
  potentialPartNumbers: PartNumbers;
  isValidNumber;
  gears: { id: number; line: number; index: number }[];
  gearCounter;

  constructor() {
    this.previousLine = "";
    this.lineNumber = 0;
    this.currentNo;
    this.lastValueType = undefined;
    this.potentialPartNumbers = {};
    this.isValidNumber = false;
    this.gears = [];
    this.gearCounter = 0;
  }

  async getPartNumbers(fileName: string) {
    await this.processData(fileName);

    const result = Object.values(this.potentialPartNumbers)
      .flat()
      .map((v) => {
        const thisObj = Object.values(v)[0];
        return thisObj.valid ? +thisObj.number : 0;
      })
      .reduce((a, b) => a + b);

    this.reset();
    return result;
  }

  async getGearRatios(fileName: string) {
    let counter = 1;
    let result = 0;
    await this.processData(fileName);

    const gears = Object.values(this.potentialPartNumbers)
      .flat()
      .flatMap((v, i) => {
        return Object.values(v).filter((o) => o.valid && o.gear);
      });

    while (counter <= this.gearCounter) {
      const filtered = gears.filter((g) => g.gear === counter);
      if (filtered.length === 2) {
        result += filtered.map((g) => +g.number).reduce((a, b) => a * b);
      }
      counter++;
    }

    this.reset();
    return result;
  }

  private async processData(fileName: string) {
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
          this.handleSymbol(char, index);
          return;
        }
      });
      this.previousLine = line;
    }
  }

  private handleNumber(char: string, index: number) {
    if (!this.currentNo) {
      const wasGear = this.lastValueType === "gear";
      this.isValidNumber = this.lastValueType === "symbol" || wasGear;
      this.currentNo = {
        number: char,
        index,
        gear: wasGear ? this.gears[this.gears.length - 1].id : undefined,
      };
    } else {
      this.currentNo.number += char;
    }
    this.lastValueType = "number";
  }

  private handleNumberEnd(char: string) {
    const rowAboveInfo = this.hasSymbolAbove();
    const hasSymbolAfterOrAbove = this.isSymbol(char) || rowAboveInfo.hasSymbol;
    this.isValidNumber = hasSymbolAfterOrAbove || this.isValidNumber;
    if (this.potentialPartNumbers[this.lineNumber] === undefined) {
      this.potentialPartNumbers[this.lineNumber] = [];
    }
    if (this.currentNo) {
      this.potentialPartNumbers[this.lineNumber].push({
        [this.currentNo.index]: {
          ...this.currentNo,
          valid: this.isValidNumber,
          gear: rowAboveInfo.gearId ?? this.currentNo.gear,
          line: this.lineNumber,
        },
      });
    }
    this.currentNo = undefined;
    this.isValidNumber = false;
  }

  private handleSymbol(char: string, index: number) {
    const isGear = char === "*";
    if (isGear) {
      this.handleGear(index);
    }
    if (this.potentialPartNumbers[this.lineNumber - 1]) {
      this.potentialPartNumbers[this.lineNumber - 1] =
        this.potentialPartNumbers[this.lineNumber - 1]?.map((v) => {
          const thisObj = Object.values(v)[0];
          const matches = Array.from(
            { length: thisObj?.number.length + 2 },
            (_, i) => i + thisObj.index - 1
          );
          if (matches.includes(index)) {
            return {
              ...{
                [thisObj.index]: {
                  ...thisObj,
                  valid: true,
                  gear: isGear ? this.gearCounter : thisObj.gear,
                },
              },
            };
          }
          return v;
        });
    }

    this.lastValueType = isGear ? "gear" : "symbol";
  }

  private handleGear(index: number) {
    this.gearCounter++;
    this.gears.push({ id: this.gearCounter, index, line: this.lineNumber });
    if (this.lastValueType === "number") {
      Object.values(
        this.potentialPartNumbers[this.lineNumber][
          this.potentialPartNumbers[this.lineNumber].length - 1
        ]
      )[0].gear = this.gearCounter;
    }
  }

  private hasSymbolAbove() {
    if (!this.currentNo) return { hasSymbol: false, gearId: undefined };
    const start = !this.currentNo?.index ? 0 : this.currentNo.index - 1;
    const end = this.currentNo.index + this.currentNo.number.length + 1;

    const rowAbove = this.previousLine.slice(start, end);
    const hasSymbol = this.isSymbol(rowAbove);
    const isGear = rowAbove.includes("*");
    let gearId = undefined;
    if (isGear) {
      gearId = this.gears.find(
        (g) =>
          g.line === this.lineNumber - 1 && g.index >= start && g.index <= end
      )?.id;
    }
    return { hasSymbol, gearId };
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
