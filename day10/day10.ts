type Joins = "bottomJoin" | "topJoin" | "rightJoin" | "leftJoin";
type PipeMap = {
  [key in Joins]: { [key: string]: { rowDiff: number; colDiff: number } }[];
};

export class PipeMapper {
  area: string[][];
  pipeMap: PipeMap;
  pipes;

  constructor() {
    this.pipeMap = {
      bottomJoin: [
        { "|": { rowDiff: 0, colDiff: -1 } },
        { "7": { rowDiff: -1, colDiff: -1 } },
        { F: { rowDiff: -1, colDiff: 1 } },
      ],
      topJoin: [
        { "|": { rowDiff: 0, colDiff: 1 } },
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
  }

  findNextSegment(currentRow: number, currentCol: number) {
    this.area[currentRow][currentCol];
  }
}
