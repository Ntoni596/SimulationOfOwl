import * as React from "react";
import styled from "styled-components";
import {
  Direction,
  createGrid,
  generateKey,
  isCurrentPosition,
  rotationMapper,
} from "../helpers";

interface GridProps {
  rows: number;
  columns: number;
  currentPosition: [number, number];
  onGridClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  currentDirection: Direction;
}

const GridComponent: React.FC<GridProps> = ({
  rows,
  columns,
  currentPosition,
  onGridClick,
  currentDirection,
}) => {
  const grid = createGrid(rows, columns);

  return (
    <Grid data-rows={rows} data-columns={columns}>
      {grid.map((row: any[], x: number) =>
        row.map((_: any, y: number) => (
          <Cell
            key={generateKey(x, y)}
            id={`${x}${y}`}
            className={
              isCurrentPosition(x, y, currentPosition) ? "current" : ""
            }
            data-direction={rotationMapper[currentDirection].toString()}
            onClick={onGridClick}
          >
            {isCurrentPosition(x, y, currentPosition) && "𓅓"}
          </Cell>
        ))
      )}
    </Grid>
  );
};

const Grid = styled.div<{ "data-columns": number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props["data-columns"]}, 100px);
  grid-auto-rows: 100px;
`;

const Cell = styled.div<{ "data-direction": string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #777;
  background-color: #333;
  color: #ddd;
  font-size: 2em;
  transform: rotate(${(props) => `${props["data-direction"]}deg`});
  &:hover {
    cursor: pointer;
  }

  &.current {
    background-color: #ddd;
    color: #333;
  }
`;

export default GridComponent;
