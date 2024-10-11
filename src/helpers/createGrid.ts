export function createGrid(rows: number, columns: number): [][] {
  const array = Array(rows);

  for (let i = 0; i < rows; i++) {
    array[i] = Array(columns).fill("");
  }

  return array;
}
