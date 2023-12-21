import { readFile } from "../utils/utils";

export class MirrorFinder {
  maps: string[][];
  constructor() {
    this.maps = [];
  }

  async find(filename: string) {
    await this.parseMap(filename);
    let total = 0;

    for (const map of this.maps) {
      const rows = this.evaluateRows(map);
      total += rows;
      if (!rows) total += this.evaluateColumns(map);
    }

    return total;
  }

  private async parseMap(filename: string) {
    this.maps = [];
    const reader = readFile(filename);
    let section: string[] = [];

    for await (const line of reader) {
      if (!line) {
        this.maps.push(section);
        section = [];
      } else {
        section.push(line);
      }
    }
    this.maps.push(section);
  }

  private evaluateRows(map: string[]) {
    let matchingRows: number[] = [];
    const countMirrorLength = (distanceFromMirror: number): number => {
      if (!matchingRows.length) return 0;
      const one = matchingRows[0] - distanceFromMirror;
      const two = matchingRows[1] + distanceFromMirror;

      // reached the edge
      if (!map[one] || !map[two]) {
        return (matchingRows[0] + 1) * 100;
      }

      // a false reflection
      if (map[one] !== map[two]) return 0;

      // keep counting
      return countMirrorLength(distanceFromMirror + 1);
    };

    let res = 0;

    for (let i = 0; i < map.length; i++) {
      if (map[i] === map[i + 1]) {
        matchingRows = [i, i + 1];
        res = countMirrorLength(1);
        if (res !== 0) break;
      }
    }
    return res;
  }

  private evaluateColumns(map: string[]) {
    let matchingColumns: number[] = [];
    const numberOfCols = map[0].length;
    const countMirrorLength = (distanceFromMirror: number): number => {
      if (!matchingColumns.length) return 0;
      const one = map
        .map((m) => m[matchingColumns[0] - distanceFromMirror])
        .join("");
      const two = map
        .map((m) => m[matchingColumns[1] + distanceFromMirror])
        .join("");

      // reached the edge
      if (!one || !two) return matchingColumns[0] + 1;

      // a false reflection
      if (one !== two) return 0;

      // keep counting
      return countMirrorLength(distanceFromMirror + 1);
    };

    let res = 0;

    for (let i = 0; i < numberOfCols; i++) {
      const thisCol = map.map((m) => m[i]).join("");
      const nextCol = map.map((m) => m[i + 1]).join("");
      if (thisCol === nextCol) {
        matchingColumns = [i, i + 1];
        res = countMirrorLength(1);
        if (res !== 0) break;
      }
    }

    return countMirrorLength(1);
  }
}
