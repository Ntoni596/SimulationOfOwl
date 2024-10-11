import * as React from "react";
import styled from "styled-components";
import Grid from "./Grid"; // Add quotes around the path
import { moveTo, keyMapper, Direction } from "../helpers";
import useKeyPress from "./useKeyPress";

const { useState } = React;

const upperBound = 4;
const lowerBound = 0;

const App: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [currentDirection, setCurrentDirection] = useState<Direction>("RIGHT");

  const moveRobot = (): void => {
    // Add the return type of void
    const newPosition = moveTo(
      currentDirection,
      currentPosition,
      upperBound,
      lowerBound
    );
    setCurrentPosition(newPosition);
  };

  const handleKeyPress = (event: KeyboardEvent): void => {
    const newDirection = keyMapper[event.key as keyof typeof keyMapper];
    if (!newDirection) return;

    if (newDirection !== currentDirection)
      return setCurrentDirection(newDirection as Direction);

    moveRobot();
  };

  useKeyPress(handleKeyPress, currentDirection, currentPosition); // Correct the spelling of currentDirection
  const handleControlClick = (direction: Direction) => () => {
    direction === currentDirection
      ? moveRobot()
      : setCurrentDirection(direction);
  };

  const handleGridClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const target = event.target as HTMLDivElement;

    const positionX = Number(target.id[0]);
    const positionY = Number(target.id[1]);

    setCurrentPosition([positionX, positionY]);
  };

  return (
    <Container>
      <Grid
        rows={5}
        columns={5}
        currentPosition={currentPosition}
        onGridClick={handleGridClick}
        currentDirection={currentDirection}
      />
      <Controls>
        <Button onClick={handleControlClick("UP")}>↑</Button>
        <div>
          <Button className="alt" onClick={handleControlClick("LEFT")}>
            ←
          </Button>
          <Button className="alt" onClick={handleControlClick("RIGHT")}>
            →
          </Button>
        </div>
        <Button onClick={handleControlClick("DOWN")}>↓</Button>
      </Controls>
      <span>The robot owl can also be controlled using your arrow keys!</span>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3% 0;
  text-align: center;
`;

const Button = styled.button`
  font-size: 1em;
  padding: 1em 2em;
  border-style: none;
  background-color: rgb(225, 90, 29);
  color: #ddd;
  cursor: pointer;
  outline: 0;
  max-width: 200px;
  &:hover {
    background-color: #ddd;
    color: #333;
  }
  &.alt {
    max-width: 200px;
    background-color: rgb(195, 90, 29);
    &:hover {
      background-color: #ddd;
      color: #444;
    }
  }
`;

export default App;
