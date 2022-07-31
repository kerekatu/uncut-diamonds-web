export function addSpaceEveryCharacter(string: string | number) {
  if (!string) return;

  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function random(min: number, max: number) {
  Math.floor(Math.random() * (max - min)) + min;
}

export const formatHoursToDays = (hours: number): string => {
  const str = (hours / 24).toString();

  return str === "1" ? `${str} dzień` : `${str} dni`;
};
