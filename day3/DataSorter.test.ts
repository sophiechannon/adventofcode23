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
  it("passes test gears", async () => {
    const ds = new DataSorter();
    const res = await ds.getGearRatios("day3/test");
    expect(res).toEqual(467835);
  });
  it("passes longer test gears", async () => {
    const ds = new DataSorter();
    const res = await ds.getGearRatios("day3/longerTest");
    expect(res).toEqual(1345562);
  });
  it("passes real gears", async () => {
    const ds = new DataSorter();
    const res = await ds.getGearRatios("day3/input");
    expect(res).toEqual(84363105);
  });
});
