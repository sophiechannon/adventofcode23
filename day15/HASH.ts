import { readFile } from "../utils/utils";

type FocusObject = { label: string; focus: number };
type HashMap = {
  [key: number]: FocusObject[];
};

export class HASH {
  hashmap: HashMap;
  constructor() {
    this.hashmap = {};
  }

  async getValueFromInput(filename: string) {
    const strings = await this.parseFile(filename);
    for (const string of strings) {
      this.alignLens(string);
    }
    return this.getTotalFocusingPower();
  }

  private getTotalFocusingPower() {
    let total = 0;
    for (const box in this.hashmap) {
      this.hashmap[box].forEach(
        (value, index) => (total += (+box + 1) * (index + 1) * value.focus)
      );
    }
    return total;
  }
  private alignLens(string: string) {
    const focusObject = this.getFocusObject(string);
    const box = this.getBox(focusObject.label);

    if (!this.hashmap[box]) {
      this.hashmap[box] = [];
    }
    const thisLabel = this.hashmap[box].findIndex(
      (v) => v.label === focusObject.label
    );
    if (focusObject.focus) {
      if (thisLabel !== -1) {
        this.hashmap[box][thisLabel].focus = focusObject.focus;
      } else {
        this.hashmap[box].push(focusObject);
      }
    } else {
      if (thisLabel !== -1) {
        this.hashmap[box].splice(thisLabel, 1);
      }
    }
  }

  private async parseFile(filename: string) {
    const reader = readFile(filename);
    let strings: string[] = [];
    for await (const line of reader) {
      strings = line.split(",");
    }
    return strings;
  }

  private getBox(string: string) {
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

  private getFocusObject(string: string): FocusObject {
    const label = string.split(/[=-]/)[0];
    const focus = +string.split(/[=-]/)[1];
    return { label, focus };
  }
}
