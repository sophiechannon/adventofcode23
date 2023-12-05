import { SeedMapper } from "./day5";
import { seedToSoilMap } from "./testResults";

describe("SeedMapper", () => {
  it("createMap", () => {
    const seedMapper = new SeedMapper(["79", "14", "55", "13"]);
    seedMapper.currentType = "seed-to-soil map:";
    seedMapper.createMap(["50", "98", "2"]);
    seedMapper.createMap(["52", "50", "48"]);
    expect(seedMapper.seedToSoilMap).toEqual(seedToSoilMap);
  });
  it("getDataForMapping", () => {
    const seedMapper = new SeedMapper(["79", "14", "55", "13"]);
    const res = seedMapper.getDataForMapping("189674484 0 19444885");
    expect(res).toEqual(["189674484", "0", "19444885"]);
  });
  it("processData", async () => {
    const seedMapper = new SeedMapper(["79", "14", "55", "13"]);
    await seedMapper.processData("day5/test");
    expect(seedMapper.seedToSoilMap).toEqual(seedToSoilMap);
    expect(Object.keys(seedMapper.soilToFertilizerMap).length).toBeTruthy();
    expect(Object.keys(seedMapper.fertilizerToWaterMap).length).toBeTruthy();
    expect(Object.keys(seedMapper.waterToLightMap).length).toBeTruthy();
    expect(Object.keys(seedMapper.lightToTemperatureMap).length).toBeTruthy();
    expect(
      Object.keys(seedMapper.temperatureToHumidityMap).length
    ).toBeTruthy();
    expect(Object.keys(seedMapper.humidityToLocationMap).length).toBeTruthy();
  });
});
