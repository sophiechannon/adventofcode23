export const getData = (string: string) => {
  return string
    .split(":")
    .slice(1)
    .map((s) => +s);
};
