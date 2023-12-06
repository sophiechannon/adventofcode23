import { readFile } from "../utils/utils";
type Map = { from: number; to: number; diff: number }[];

export class SeedMapper {
  seeds: string[];
  seedToSoilMap: Map;
  soilToFertilizerMap: Map;
  fertilizerToWaterMap: Map;
  waterToLightMap: Map;
  lightToTemperatureMap: Map;
  temperatureToHumidityMap: Map;
  humidityToLocationMap: Map;
  currentType;

  constructor(seeds: string[]) {
    this.seeds = seeds;
    this.seedToSoilMap = [];
    this.soilToFertilizerMap = [];
    this.fertilizerToWaterMap = [];
    this.waterToLightMap = [];
    this.lightToTemperatureMap = [];
    this.temperatureToHumidityMap = [];
    this.humidityToLocationMap = [];
    this.currentType = "";
  }

  async findSmallestLocation(fileName: string) {
    await this.processData(fileName);
    const locations: number[] = [];
    this.seeds.forEach((seed) => {
      const stepOne = this.readMap(this.seedToSoilMap, +seed);
      const stepTwo = this.readMap(this.soilToFertilizerMap, stepOne);
      const stepThree = this.readMap(this.fertilizerToWaterMap, stepTwo);
      const stepFour = this.readMap(this.waterToLightMap, stepThree);
      const stepFive = this.readMap(this.lightToTemperatureMap, stepFour);
      const stepSix = this.readMap(this.temperatureToHumidityMap, stepFive);
      const stepSeven = this.readMap(this.humidityToLocationMap, stepSix);
      locations.push(stepSeven);
    });
    return Math.min(...locations);
  }

  async processData(fileName: string) {
    const reader = readFile(fileName);

    for await (const line of reader) {
      if (this.isEmptyLine(line)) {
        continue;
      }
      if (this.isNewType(line)) {
        continue;
      }

      const data = this.getDataForMapping(line);
      this.createMap(data);
    }
  }

  readMap(array: Map, seed: number) {
    const winner = array.filter(
      (entry) => entry.from <= seed && entry.to >= seed
    )[0];

    return (winner?.diff ?? 0) + seed;
  }

  createMap(set: string[]) {
    const map = this.getMap();
    const range = +set[2];
    const dest = +set[0];
    const source = +set[1];
    map.push({
      from: source,
      to: source + range - 1,
      diff: dest - source,
    });
  }

  getDataForMapping(string: string) {
    return string.split(" ");
  }

  isNewType(string: string) {
    switch (string) {
      case "seed-to-soil map:":
        this.currentType = string;
        return true;
      case "soil-to-fertilizer map:":
        this.currentType = string;
        return true;
      case "fertilizer-to-water map:":
        this.currentType = string;
        return true;
      case "water-to-light map:":
        this.currentType = string;
        return true;
      case "light-to-temperature map:":
        this.currentType = string;
        return true;
      case "temperature-to-humidity map:":
        this.currentType = string;
        return true;
      case "humidity-to-location map:":
        this.currentType = string;
        return true;
      default:
        return false;
    }
  }

  isEmptyLine(string: string) {
    if (string === "") {
      this.currentType = "";
      return true;
    }
    return false;
  }

  getMap() {
    switch (this.currentType) {
      case "seed-to-soil map:":
        return this.seedToSoilMap;
      case "soil-to-fertilizer map:":
        return this.soilToFertilizerMap;
      case "fertilizer-to-water map:":
        return this.fertilizerToWaterMap;
      case "water-to-light map:":
        return this.waterToLightMap;
      case "light-to-temperature map:":
        return this.lightToTemperatureMap;
      case "temperature-to-humidity map:":
        return this.temperatureToHumidityMap;
      case "humidity-to-location map:":
        return this.humidityToLocationMap;
      default:
        return [];
    }
  }
}
