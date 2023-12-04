import { DataSorter } from "./DataSorter";
const ds = new DataSorter();

describe("DataSorter", () => {
  it("passes test", async () => {
    const ds = new DataSorter();
    const res = await ds.getPartNumbers("day3/test");
    expect(res).toEqual(4361);
  });
  it("gives result", async () => {
    const ds = new DataSorter();
    const res = await ds.getPartNumbers("day3/input");
    expect(res).toEqual(553079);
  });
});
