export function addSpaceEveryCharacter(string: string) {
  if (!string) return

  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
