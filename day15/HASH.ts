import { readFile } from "../utils/utils";

export class HASH {
  async getValueFromInput(filename: string) {
    const strings = await this.parseFile(filename);
    let total = 0;
    for (const string of strings) {
      total += this.getTotalForString(string);
    }
    return total;
  }

  private async parseFile(filename: string) {
    const reader = readFile(filename);
    let strings: string[] = [];
    for await (const line of reader) {
      strings = line.split(",");
    }
    return strings;
  }

  private getTotalForString(string: string) {
    let currentValue = 0;
    const asciiValues = this.getAsciiValues(string);
    asciiValues.forEach((value) => {
      currentValue += value;
      currentValue *= 17;
      currentValue = currentValue % 256;
    });
    return currentValue;
  }

  private getAsciiValues(string: string) {
    return string.split("").map((char) => char.charCodeAt(0));
  }
}
