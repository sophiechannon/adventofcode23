import { SeedMapper } from "./day5";
import { seedToSoilMap } from "../utils/testResults";

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
    expect(seedMapper.soilToFertilizerMap).toEqual([
      {
        diff: -15,
        from: 15,
        to: 51,
      },
      {
        diff: -15,
        from: 52,
        to: 53,
      },
      {
        diff: 39,
        from: 0,
        to: 14,
      },
    ]);
    expect(seedMapper.fertilizerToWaterMap.length).toBe(4);
    expect(seedMapper.waterToLightMap.length).toBe(2);
    expect(seedMapper.lightToTemperatureMap.length).toBe(3);
    expect(seedMapper.temperatureToHumidityMap.length).toBe(2);
    expect(seedMapper.humidityToLocationMap.length).toBe(2);
  });
  it("processData", async () => {
    const seedMapper = new SeedMapper([
      "950527520",
      "85181200",
      "546703948",
      "123777711",
      "63627802",
      "279111951",
      "1141059215",
      "246466925",
      "1655973293",
      "98210926",
      "3948361820",
      "92804510",
      "2424412143",
      "247735408",
      "4140139679",
      "82572647",
      "2009732824",
      "325159757",
      "3575518161",
      "370114248",
    ]);
    await seedMapper.processData("day5/input");
    expect(seedMapper.seedToSoilMap.length).toBe(33);
    expect(seedMapper.soilToFertilizerMap.length).toBe(24);
    expect(seedMapper.fertilizerToWaterMap.length).toBe(22);
    expect(seedMapper.waterToLightMap.length).toBe(19);
    expect(seedMapper.lightToTemperatureMap.length).toBe(11);
    expect(seedMapper.temperatureToHumidityMap.length).toBe(9);
    expect(seedMapper.humidityToLocationMap.length).toBe(32);
  });
  it("readsMap", () => {
    const seedMapper = new SeedMapper(["79", "14", "55", "13"]);
    seedMapper.seedToSoilMap = seedToSoilMap;
    const res = seedMapper.readMap(seedMapper.seedToSoilMap, 14);
    expect(res).toEqual(14);
    const res2 = seedMapper.readMap(seedMapper.seedToSoilMap, 79);
    expect(res2).toEqual(81);
  });
  it("findSmallestLocation test", async () => {
    const seedMapper = new SeedMapper(["79", "14", "55", "13"]);
    const res = await seedMapper.findSmallestLocation("day5/test");
    expect(res).toEqual(35);
  });
  it("findSmallestLocation real", async () => {
    const seedMapper = new SeedMapper([
      "950527520",
      "85181200",
      "546703948",
      "123777711",
      "63627802",
      "279111951",
      "1141059215",
      "246466925",
      "1655973293",
      "98210926",
      "3948361820",
      "92804510",
      "2424412143",
      "247735408",
      "4140139679",
      "82572647",
      "2009732824",
      "325159757",
      "3575518161",
      "370114248",
    ]);
    const res = await seedMapper.findSmallestLocation("day5/input");
    expect(res).toEqual(196167384);
  });
});
