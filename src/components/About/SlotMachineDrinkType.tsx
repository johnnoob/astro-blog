// react
import React, { useState, useEffect, useMemo } from "react";
// framer motion
import { motion, AnimatePresence, useAnimate } from "framer-motion";
// lodash
import _ from "lodash";
// assets
import storeDrinkImg from "@/images/drinks/storeDrinks.png";
import bubbleTeaImg from "@/images/drinks/bubbleTea.png";
import coffeeImg from "@/images/drinks/coffee.png";

export type DrinkType = "storeDrink" | "bubbleTea" | "coffee";
type DrinkTypeWeight = { type: DrinkType; weight: number };

const typeToDrinkImgs: { [type: string]: ImageMetadata[] } = {
  storeDrink: [storeDrinkImg],
  bubbleTea: [bubbleTeaImg],
  coffee: [coffeeImg],
};
const drinkTypeWeights: DrinkTypeWeight[] = [
  { type: "storeDrink", weight: 0.3 },
  { type: "bubbleTea", weight: 0.6 },
  { type: "coffee", weight: 0 },
];

function weightedChoice(drinkTypeWeights: DrinkTypeWeight[]) {
  const totalWeight = _.sumBy(drinkTypeWeights, "weight");
  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const drinkWeight of drinkTypeWeights) {
    cumulativeWeight += drinkWeight.weight;
    if (randomNum <= cumulativeWeight) return drinkWeight.type;
  }
}

export class Drink {
  type: DrinkType;
  img: ImageMetadata;
  constructor() {
    this.type = weightedChoice(drinkTypeWeights) as DrinkType;
    const image = _.sample(typeToDrinkImgs[this.type]);
    if (image) {
      this.img = image;
    } else {
      this.img = storeDrinkImg;
    }
  }
}

type Props = {
  isActive: boolean;
  setSlotMachineResult: React.Dispatch<React.SetStateAction<Drink | null>>;
  numOfRotation?: number;
};

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const SlotMachine = ({
  isActive,
  setSlotMachineResult,
  numOfRotation = 20,
}: Props) => {
  const drinks = useMemo(
    () => Array.from({ length: numOfRotation }, (_, index) => new Drink()),
    []
  );
  const [index, setIndex] = useState<number>(1);
  const breakCumulatedRatios: number[] = [0.7, 0.9];
  const breakIndices = breakCumulatedRatios.map(
    (cumulatedRatio) => cumulatedRatio * numOfRotation
  );
  const breakSleepTime = [200, 400, 800];
  const [scope, animate] = useAnimate();
  useEffect(() => {
    let isCancelled = false;
    const loop = async () => {
      for (let index = 1; index < drinks.length; index++) {
        if (isCancelled) break;
        setIndex(index);
        if (index < breakIndices[0]) {
          await sleep(breakSleepTime[0]);
        } else if (index < breakIndices[1]) {
          await sleep(breakSleepTime[1]);
        } else {
          await sleep(breakSleepTime[2]);
        }
      }
      setSlotMachineResult(drinks.at(-1) as Drink);
      animate(scope.current, {
        boxShadow: "0 0 20px #cfee28, 0 0 40px #cfee28",
      });
    };
    if (isActive) loop();
    return () => {
      isCancelled = true;
    };
  }, [isActive]);
  return (
    <div
      ref={scope}
      className="relative border-[1px] w-36 h-44 rounded-md overflow-hidden"
    >
      {isActive && (
        <AnimatePresence>
          <motion.img
            key={index - 1}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
              height: 112,
            }}
            className="h-28"
            src={drinks[index - 1].img.src}
            initial={{ y: 0 }}
            animate={{ y: -300 }}
            transition={{
              duration:
                index < breakIndices[0]
                  ? breakSleepTime[0] / 1000
                  : index < breakIndices[1]
                  ? breakSleepTime[1] / 1000
                  : breakSleepTime[2] / 1000,
              ease: "easeOut",
            }}
          />
          <motion.img
            key={index}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              translateX: "-50%",
              translateY: "-50%",
              height: 112,
            }}
            src={drinks[index].img.src}
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{
              duration:
                index < breakIndices[0]
                  ? breakSleepTime[0] / 1000
                  : index < breakIndices[1]
                  ? breakSleepTime[1] / 1000
                  : breakSleepTime[2] / 1000,
              ease: index === numOfRotation - 1 ? "backOut" : "easeOut",
            }}
          />
        </AnimatePresence>
      )}
      {!isActive && (
        <img
          src={drinks[0].img.src}
          className="h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
};

export default SlotMachine;
