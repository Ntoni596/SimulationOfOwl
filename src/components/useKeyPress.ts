import * as React from "react";

function useKeyPress(
  cb: (event: KeyboardEvent) => void,
  currentDirection: any,
  currentPosition: any
) {
  React.useEffect(() => {
    document.addEventListener("keydown", cb);
    return () => document.removeEventListener("keydown", cb);
  }, [currentDirection, currentPosition]);
}

export default useKeyPress;
