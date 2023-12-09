import * as fs from "fs";
import * as readline from "readline";
export const readFile = (fileName: string) =>
  readline.createInterface({
    input: fs.createReadStream(fileName),
  });

export const replaceExcessWhitespaceWithSingle = (string: string) =>
  string.replace(/\s+/g, " ");

export const removeWhitespace = (string: string) => string.replace(/\s+/g, "");
