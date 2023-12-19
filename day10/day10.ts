import { readFile } from "../utils/utils";

type Coords = { row: number; col: number };
type Joins = (typeof PipeMapper.joins)[number];
type PipeMap = {
  [key in Joins]: { [key: string]: { rowDiff: number; colDiff: number } }[];
};
type PreviousMove = Coords & {
  segment: string;
  joinType: Joins;
};

export class PipeMapper {
  area: string[][];
  pipeMap: PipeMap;
  pipes;
  startingPoint: Coords | undefined;
  joinCoords: { [key in Joins]: Coords & { oppositeJoin: Joins } };
  static joins = ["bottomJoin", "topJoin", "rightJoin", "leftJoin"] as const;

  constructor() {
    this.pipeMap = {
      bottomJoin: [
        { "|": { rowDiff: -1, colDiff: 0 } },
        { "7": { rowDiff: -1, colDiff: -1 } },
        { F: { rowDiff: -1, colDiff: 1 } },
      ],
      topJoin: [
        { "|": { rowDiff: 1, colDiff: 0 } },
        { L: { rowDiff: 1, colDiff: 1 } },
        { J: { rowDiff: 1, colDiff: -1 } },
      ],
      leftJoin: [
        { "-": { rowDiff: 0, colDiff: 1 } },
        { "7": { rowDiff: 1, colDiff: 1 } },
        { J: { rowDiff: -1, colDiff: 1 } },
      ],
      rightJoin: [
        { "-": { rowDiff: 0, colDiff: -1 } },
        { F: { rowDiff: 1, colDiff: -1 } },
        { L: { rowDiff: -1, colDiff: -1 } },
      ],
    };
    this.pipes = ["|", "-", "7", "L", "F", "J"];
    this.area = [];
    this.startingPoint = undefined;
    this.joinCoords = {
      topJoin: { row: -1, col: 0, oppositeJoin: "bottomJoin" },
      bottomJoin: { row: 1, col: 0, oppositeJoin: "topJoin" },
      leftJoin: { row: 0, col: -1, oppositeJoin: "rightJoin" },
      rightJoin: { row: 0, col: 1, oppositeJoin: "leftJoin" },
    };
  }

  async run(filename: string) {
    await this.parseMap(filename);
    const firstMoves = this.handleFirstMove();
    if (!firstMoves || !firstMoves[0]) return 0;

    let nextMove: (PreviousMove | undefined)[] = firstMoves;
    let counter = 1;

    while (
      !(
        nextMove[0]?.segment === nextMove[1]?.segment &&
        nextMove[0]?.col === nextMove[1]?.col &&
        nextMove[0]?.row === nextMove[1]?.row
      )
    ) {
      nextMove = this.navigate(nextMove as PreviousMove[]);
      counter++;
    }
    return counter;
  }

  private async parseMap(filename: string) {
    const reader = readFile(filename);
    let rowCounter = 0;

    for await (const line of reader) {
      const lineAsArray = line.split("");
      this.area.push(lineAsArray);
      if (!this.startingPoint) {
        const sIndex = lineAsArray.findIndex((char) => char === "S");
        if (sIndex !== -1) {
          this.setStartingPoint(rowCounter, sIndex);
        }
      }
      rowCounter++;
    }
  }

  private navigate(prevMoves: PreviousMove[]): (PreviousMove | undefined)[] {
    const nextMove = prevMoves.map((move) => {
      const nextJoin = this.findJoinsForThisSegment(move.segment).filter(
        (j) => j !== move.joinType
      )[0];
      const check = this.checkForJoin(move.row, move.col, nextJoin as Joins);
      return check;
    });

    return nextMove;
  }

  private handleFirstMove(): (PreviousMove | undefined)[] {
    if (this.startingPoint === undefined) return [];
    const res: (PreviousMove | undefined)[] = [];

    PipeMapper.joins.forEach((j) => {
      const check = this.checkForJoin(
        this.startingPoint?.row ?? 0,
        this.startingPoint?.col ?? 0,
        j
      );
      res.push(check);
    });
    return res.filter((j) => j !== undefined);
  }

  private checkForJoin(
    row: number,
    col: number,
    joinType: "bottomJoin" | "topJoin" | "leftJoin" | "rightJoin"
  ): PreviousMove | undefined {
    const oppositeJoin = this.joinCoords[joinType].oppositeJoin;
    const nextRow = row + this.joinCoords[joinType].row;
    const nextCol = col + this.joinCoords[joinType].col;
    const segment = this.area[nextRow][nextCol];
    const possibleJoins = this.pipeMap[oppositeJoin].flatMap((seg) =>
      Object.keys(seg)
    );

    if (possibleJoins.includes(segment)) {
      return {
        segment,
        row: nextRow,
        col: nextCol,
        joinType: oppositeJoin,
      };
    }
  }

  private setStartingPoint(row: number, col: number) {
    this.startingPoint = { row, col };
  }

  private findJoinsForThisSegment(segment: string) {
    return Object.entries(this.pipeMap)
      .filter((e) => e[1].flatMap((v) => Object.keys(v)[0]).includes(segment))
      .map((g) => g[0]);
  }
}
