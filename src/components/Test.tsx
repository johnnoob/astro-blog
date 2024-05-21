import React, { useState } from "react";
import { Button } from "./ui/button";

const Test = () => {
  const [num, setNum] = useState<number>(2);
  return (
    <div>
      <h1>{num}</h1>
      <button
        className="border-2"
        onClick={() => {
          setNum((prev) => prev + 1);
        }}
      >
        點擊
      </button>
    </div>
  );
};

export default Test;
