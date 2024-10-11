export function isCurrentPosition(
  x: number,
  y: number,
  currentPosition: number[]
): boolean {
  return x === currentPosition[0] && y === currentPosition[1];
}
