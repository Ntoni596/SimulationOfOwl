type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

const movements = {
  UP: ([x, y]: [number, number]): [number, number] => [x - 1, y],
  RIGHT: ([x, y]: [number, number]): [number, number] => [x, y + 1],
  DOWN: ([x, y]: [number, number]): [number, number] => [x + 1, y],
  LEFT: ([x, y]: [number, number]): [number, number] => [x, y - 1],
};

export function moveTo(
  direction: Direction,
  currentPosition: [number, number],
  upperBound: number,
  lowerBound: number
): [number, number] {
  const transform = movements[direction];
  const newPosition = transform(currentPosition);

  if (
    newPosition.some(
      (position) => position > upperBound || position < lowerBound
    )
  )
    return currentPosition;

  return newPosition;
}
