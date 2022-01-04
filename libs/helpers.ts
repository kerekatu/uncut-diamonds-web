export function addSpaceEveryCharacter(string: string | number) {
  if (!string) return

  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function random(min: number, max: number) {
  Math.floor(Math.random() * (max - min)) + min
}
