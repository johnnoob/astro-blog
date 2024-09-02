// react
import { useState, useEffect } from "react";
// lodash
import _ from "lodash";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const title = "哈囉，我叫“John”";
const getNumOfIndices = () => Math.ceil(Math.random() * 3);
const getSleepTime = () => 1500 + Math.ceil(Math.random() * 4000);

const NeonTitle = () => {
  const [flickInices, setFlickInices] = useState<number[]>(
    _.sampleSize(_.range(title.length), getNumOfIndices())
  );
  useEffect(() => {
    let isCanceled = false;
    const randomFlick = async () => {
      while (true) {
        if (isCanceled) break;
        const numOfIndices = getNumOfIndices();
        const indices = _.sampleSize(_.range(title.length), numOfIndices);
        setFlickInices(indices);
        const sleeptime = getSleepTime();
        await sleep(sleeptime);
      }
    };
    randomFlick();
    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <h1 className="text-4xl tracking-wider neon-text font-medium">
      {title.split("").map((word, index) => (
        <span
          key={index}
          className={`${flickInices.includes(index) && "flick"}`}
        >
          {word}
        </span>
      ))}
    </h1>
  );
};

export default NeonTitle;
