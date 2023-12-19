import { readFile } from "../utils/utils";

export class CosmicExpansion {
  cosmos: string[][];

  constructor() {
    this.cosmos = [];
  }

  async run(filename: string) {
    await this.parseMap(filename);
  }

  private async parseMap(filename: string) {
    const reader = readFile(filename);
    let rowCounter = 0;
    let galaxyCounter = 0;
    const colsWithGalaxies: number[] = [];
    const rowsWithoutGalaxies: number[] = [];

    for await (const line of reader) {
      let lineAsArray: string[] = line.split("");

      if (!lineAsArray.includes("#")) {
        rowsWithoutGalaxies.push(rowCounter);
      } else {
        lineAsArray = lineAsArray.map((element, index) => {
          if (element === "#") {
            if (!colsWithGalaxies.includes(index)) {
              colsWithGalaxies.push(index);
            }
            galaxyCounter++;
            return galaxyCounter.toString();
          }
          return element;
        });
      }

      this.cosmos.push(lineAsArray);
      rowCounter++;
    }

    const colsWithoutGalaxies = Array.from(
      {
        length: this.cosmos[0].length,
      },
      (v, i) => i
    ).filter((c) => !colsWithGalaxies.includes(c));
    this.cosmos = this.expandGalaxy(colsWithoutGalaxies, rowsWithoutGalaxies);
  }

  expandGalaxy(colsWithout: number[], rowsWithout: number[]) {
    const emptyRow = Array.from(
      {
        length: this.cosmos[0].length + colsWithout.length,
      },
      (_v) => "."
    );
    const cols = this.cosmos.map((row) => {
      colsWithout.forEach((c, i) => {
        row.splice(c + i, 0, ".");
      });
      return row;
    });
    rowsWithout.forEach((r, i) => {
      cols.splice(r + i, 0, emptyRow);
    });

    return cols;
  }
}
