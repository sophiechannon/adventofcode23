import { readFile } from "../utils/utils";

export class ParabolicReflectorDish {
  filename;
  dish: string[][];

  constructor(filename: string) {
    this.filename = filename;
    this.dish = [];
  }

  async placeRocks() {
    const reader = readFile(this.filename);
    for await (const line of reader) {
      this.dish.push(line.split(""));
    }
  }

  tilt() {
    const lowestPointWithoutRocks = Array.from(
      {
        length: this.dish[0].length,
      },
      () => 0
    );

    for (let i = 0; i < this.dish.length; i++) {
      if (i !== 0) {
        this.dish[i] = this.dish[i].map((point, index) => {
          const lowestPoint = lowestPointWithoutRocks[index];

          if (point === "O" && lowestPoint !== i) {
            this.dish[lowestPoint][index] = "O";
            lowestPointWithoutRocks[index]++;

            return ".";
          }
          return point;
        });
      }

      this.dish[i].forEach((point, index) => {
        if (point !== ".") {
          lowestPointWithoutRocks[index] = i + 1;
        }
      });
    }
  }

  getTotalLoad() {
    let res = 0;
    this.dish.reverse().forEach((row, index) => {
      res += row.filter((val) => val === "O").length * (index + 1);
    });
    return res;
  }
}
