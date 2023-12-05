import { readFile } from "../utils/lineReader";
type Map = { [key: number]: number };

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
    this.seedToSoilMap = {};
    this.soilToFertilizerMap = {};
    this.fertilizerToWaterMap = {};
    this.waterToLightMap = {};
    this.lightToTemperatureMap = {};
    this.temperatureToHumidityMap = {};
    this.humidityToLocationMap = {};
    this.currentType = "";
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
    return true;
  }

  createMap(set: string[]) {
    const map = this.getMap();
    let counter = 0;
    const range = +set[2];
    const dest = set[0];
    const source = set[1];
    while (counter < range) {
      map[+source + counter] = +dest + counter;
      counter++;
    }
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
        return {};
    }
  }
}
