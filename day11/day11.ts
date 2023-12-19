import { readFile } from "../utils/utils";

type GalaxyMap = { row: number; col: number; id: string };

export class CosmosNavigator {
  cosmos: string[][];
  galaxyMap: GalaxyMap[];
  galaxyAge;

  constructor(galaxyAge: number) {
    this.cosmos = [];
    this.galaxyMap = [];
    this.galaxyAge = galaxyAge ? galaxyAge - 1 : 0;
  }

  async run(filename: string) {
    let res = 0;
    const { colsWithoutGalaxies, rowsWithoutGalaxies } = await this.parseMap(
      filename
    );
    this.mapGalaxies();
    res += this.findShortestPaths(
      this.galaxyMap,
      0,
      res,
      colsWithoutGalaxies,
      rowsWithoutGalaxies
    );
    return res;
  }

  private findShortestPaths(
    array: GalaxyMap[],
    sliceStart: number,
    res: number,
    colsWithout: number[],
    rowsWithout: number[]
  ): number {
    const sliced = array.slice(sliceStart);
    sliced.reduce((a, b) => {
      const numberOfExtraCols = this.getExpansionAmount(
        colsWithout,
        a.col,
        b.col
      );

      const numberOfExtraRows = this.getExpansionAmount(
        rowsWithout,
        a.row,
        b.row
      );

      const toAdd = Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
      res += toAdd + numberOfExtraCols + numberOfExtraRows;
      return a;
    });

    if (sliced.length === 2) {
      return res;
    } else {
      return (
        this,
        this.findShortestPaths(
          array,
          sliceStart + 1,
          res,
          colsWithout,
          rowsWithout
        )
      );
    }
  }

  private async parseMap(filename: string) {
    const reader = readFile(filename);
    let rowCounter = 0;
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

    return { colsWithoutGalaxies, rowsWithoutGalaxies };
  }

  private getExpansionAmount(array: number[], a: number, b: number) {
    return (
      array.filter((c) => {
        if (a < b) {
          return c > a && c < b;
        }
        return c > b && c < a;
      }).length * this.galaxyAge
    );
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
