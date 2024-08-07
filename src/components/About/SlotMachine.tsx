// react
import React, { useState, useEffect, useMemo } from "react";
// react icon
import { FaQuestion } from "react-icons/fa6";
// framer motion
import { motion, AnimatePresence } from "framer-motion";
// lodash
import _, { random } from "lodash";
// assets
import sm1 from "@/images/drinks/sm-1.png";
import sm2 from "@/images/drinks/sm-2.png";
import sm3 from "@/images/drinks/sm-3.png";
import md1 from "@/images/drinks/md-1.png";
import md2 from "@/images/drinks/md-2.png";
import lg1 from "@/images/drinks/lg-1.png";
import lg2 from "@/images/drinks/lg-2.png";
import bubble1 from "@/images/drinks/bubble-1.png";
import bubble2 from "@/images/drinks/bubble-2.png";
import coffee from "@/images/drinks/coffee.png";

type DrinkType = "sm" | "md" | "lg" | "bubble" | "coffee";
type DrinkWeight = { type: DrinkType; weight: number };

const typeToDrinkImgs: { [type: string]: ImageMetadata[] } = {
  sm: [sm1, sm2, sm3],
  md: [md1, md2],
  lg: [lg1, lg2],
  bubble: [bubble1, bubble2],
  coffee: [coffee],
};
const drinkWeights: DrinkWeight[] = [
  { type: "sm", weight: 0.45 },
  { type: "md", weight: 0.2 },
  { type: "lg", weight: 0.2 },
  { type: "bubble", weight: 0.1 },
  { type: "coffee", weight: 0.05 },
];
function weightedChoice(drinkWeights: DrinkWeight[]) {
  const totalWeight = _.sumBy(drinkWeights, "weight");
  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const drinkWeight of drinkWeights) {
    cumulativeWeight += drinkWeight.weight;
    if (randomNum <= cumulativeWeight) return drinkWeight.type;
  }
}

export class Drink {
  type: DrinkType;
  img: ImageMetadata;
  constructor() {
    this.type = weightedChoice(drinkWeights) as DrinkType;
    const image = _.sample(typeToDrinkImgs[this.type]);
    if (image) {
      this.img = image;
    } else {
      this.img = sm1;
    }
  }
}

type Props = {
  isActive: boolean;
  setSlotMachineResult: React.Dispatch<React.SetStateAction<Drink | null>>;
};

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const SlotMachine = ({ isActive, setSlotMachineResult }: Props) => {
  const drinks = useMemo(
    () => Array.from({ length: 15 }, (_, index) => new Drink()),
    []
  );
  const [index, setIndex] = useState<number>(1);
  useEffect(() => {
    let isCancelled = false;
    const loop = async () => {
      for (let index = 1; index < drinks.length; index++) {
        if (isCancelled) break;
        setIndex(index);
        if (index < 12) {
          await sleep(200);
        } else {
          await sleep(800);
        }
      }
      setSlotMachineResult(drinks.at(-1) as Drink);
    };
    if (isActive) loop();
    return () => {
      isCancelled = true;
    };
  }, [isActive]);

  return (
    <div className="relative border-[1px] w-28 h-36 rounded-md overflow-hidden">
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
            transition={{ duration: index < 12 ? 0.2 : 0.8, ease: "linear" }}
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
            transition={{ duration: index < 12 ? 0.2 : 0.8, ease: "linear" }}
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
