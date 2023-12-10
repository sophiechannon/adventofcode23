import { readFile } from "../utils/utils";

type Nodes = { [key: string]: string[] };

export class MapReader {
  nodes: Nodes;
  directions: number[];

  constructor() {
    this.nodes = {};
    this.directions = [];
  }

  async navigate(filename: string) {
    const reader = readFile(filename);

    for await (const line of reader) {
      if (line === "") continue;
      if (this.directions.length) {
        this.addNodes(line);
      } else {
        this.getDirections(line);
      }
    }

    return this.getNumberOfSteps();
  }

  getNumberOfSteps() {
    let rounds = 0;
    let counter = 0;
    let nextNode = "AAA";
    while (nextNode !== "ZZZ") {
      if (counter === this.directions.length) {
        counter = 0;
        rounds += 1;
      }
      const currentDirection = this.directions[counter];
      nextNode = this.nodes[nextNode][currentDirection];
      counter++;
    }
    return rounds * this.directions.length + counter;
  }

  private getDirections(line: string) {
    this.directions = line
      .replace(/L/g, "0")
      .replace(/R/g, "1")
      .split("")
      .map((d) => +d);
  }

  addNodes(line: string) {
    const halves = line.split(" = ");
    const values = halves[1].replace(/[()]/g, "").split(", ");
    this.nodes[halves[0]] = values;
  }
}
