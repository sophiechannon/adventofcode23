import { readFile } from "../utils/utils";

type GalaxyMap = { row: number; col: number; id: string };

export class CosmosNavigator {
  cosmos: string[][];
  galaxyMap: GalaxyMap[];

  constructor() {
    this.cosmos = [];
    this.galaxyMap = [];
  }

  async run(filename: string) {
    let res = 0;
    await this.parseMap(filename);
    this.mapGalaxies();
    res += this.findShortestPaths(this.galaxyMap, 0, res);
    return res;
  }

  private findShortestPaths(
    array: GalaxyMap[],
    sliceStart: number,
    res: number
  ): number {
    const sliced = array.slice(sliceStart);
    sliced.reduce((a, b) => {
      const toAdd = Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
      res += toAdd;
      return a;
    });

    if (sliced.length === 2) {
      return res;
    } else {
      return this, this.findShortestPaths(array, sliceStart + 1, res);
    }
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
      (_v, i) => i
    ).filter((c) => !colsWithGalaxies.includes(c));
    this.cosmos = this.expandCosmos(colsWithoutGalaxies, rowsWithoutGalaxies);
  }

  private expandCosmos(colsWithout: number[], rowsWithout: number[]) {
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

  private mapGalaxies() {
    this.cosmos.forEach((line, row) => {
      line.forEach((space, col) => {
        if (space !== ".") {
          this.galaxyMap.push({ row, col, id: space });
        }
      });
    });
  }
}
