// react
import React, { useState, useEffect, useMemo } from "react";
// framer motion
import { motion, AnimatePresence } from "framer-motion";
// lodash
import _ from "lodash";
// assets
import storeDrinkSmImg from "@/images/drinks/sm-1.png";
import storeDrinkMdImg from "@/images/drinks/md-1.png";
import storeDrinkLgImg from "@/images/drinks/lg-1.png";
import bubble50 from "@/images/drinks/50.png";
import bubbleFortune from "@/images/drinks/fortune.png";
import bubbleGuiji from "@/images/drinks/guiji.png";
import bubbleElephant from "@/images/drinks/elephant.png";
import bubbleGoldenFish from "@/images/drinks/goldenFish.png";
import bubbleKongFo from "@/images/drinks/kongfo.png";
import bubbleFishPool from "@/images/drinks/fishPool.png";
import coffeeImg from "@/images/drinks/coffee.png";
// types
import type { DrinkType, Drink } from "./SlotMachineDrinkType";

type DetailWeight = { detail: string; weight: number };

type StoreDrinkImages = {
  sm: ImageMetadata;
  md: ImageMetadata;
  lg: ImageMetadata;
};
type BubbleTeaImages = {
  arashi: ImageMetadata;
  fortune: ImageMetadata;
  guiji: ImageMetadata;
  elephant: ImageMetadata;
  goldenFish: ImageMetadata;
  kongFo: ImageMetadata;
  fishPool: ImageMetadata;
};
type CoffeeImages = {
  brand1: ImageMetadata;
  brand2: ImageMetadata;
};

type TypeToDetailToImg = {
  storeDrink: StoreDrinkImages;
  bubbleTea: BubbleTeaImages;
  coffee: CoffeeImages;
};

const typeToDetailToImgMap: TypeToDetailToImg = {
  storeDrink: {
    sm: storeDrinkSmImg,
    md: storeDrinkMdImg,
    lg: storeDrinkLgImg,
  },
  bubbleTea: {
    arashi: bubble50,
    fortune: bubbleFortune,
    guiji: bubbleGuiji,
    elephant: bubbleElephant,
    goldenFish: bubbleGoldenFish,
    kongFo: bubbleKongFo,
    fishPool: bubbleFishPool,
  },
  coffee: {
    brand1: coffeeImg,
    brand2: coffeeImg,
  },
};
const typeToWeightsMap = {
  storeDrink: [
    { detail: "sm", weight: 0.4 },
    { detail: "md", weight: 0.3 },
    { detail: "lg", weight: 0.3 },
  ],
  bubbleTea: [
    { detail: "arashi", weight: 0.2 },
    { detail: "fortune", weight: 0.2 },
    { detail: "guiji", weight: 0.2 },
    { detail: "elephant", weight: 0.2 },
    { detail: "goldenFish", weight: 0.2 },
    { detail: "kongFo", weight: 0.2 },
    { detail: "fishPool", weight: 0.2 },
  ],
  coffee: [
    { detail: "brand1", weight: 0.5 },
    { detail: "brand2", weight: 0.5 },
  ],
};

function weightedChoice(detailWeights: DetailWeight[]) {
  const totalWeight = _.sumBy(detailWeights, "weight");
  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const detailWeight of detailWeights) {
    cumulativeWeight += detailWeight.weight;
    if (randomNum <= cumulativeWeight) return detailWeight.detail;
  }
}

export class DrinkDetail {
  detail: string;
  img: ImageMetadata;
  constructor(drinkType: DrinkType) {
    this.detail = weightedChoice(typeToWeightsMap[drinkType]) as DrinkType;
    const image = (typeToDetailToImgMap[drinkType] as any)[this.detail];
    if (image) {
      this.img = image;
    } else {
      this.img = bubble50;
    }
  }
}

type Props = {
  isActive: boolean;
  drinkType: DrinkType;
  setSlotMachineResult: React.Dispatch<
    React.SetStateAction<DrinkDetail | null>
  >;
  numOfRotation?: number;
};

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const SlotMachineDetail = ({
  isActive,
  drinkType,
  setSlotMachineResult,
  numOfRotation = 20,
}: Props) => {
  const drinkDetails = useMemo(
    () =>
      Array.from(
        { length: numOfRotation },
        (_, index) => new DrinkDetail(drinkType)
      ),
    []
  );
  const [index, setIndex] = useState<number>(1);
  const breakCumulatedRatios: number[] = [0.7, 0.9];
  const breakIndices = breakCumulatedRatios.map(
    (cumulatedRatio) => cumulatedRatio * numOfRotation
  );

  const breakSleepTime = [200, 400, 800];
  useEffect(() => {
    let isCancelled = false;
    const loop = async () => {
      for (let index = 1; index < drinkDetails.length; index++) {
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
      setSlotMachineResult(drinkDetails.at(-1) as DrinkDetail);
    };
    if (isActive) loop();
    return () => {
      isCancelled = true;
    };
  }, [isActive]);
  return (
    <motion.div
      className="relative border-[1px] w-28 h-36 rounded-md overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3 }}
      layout
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
              height: 80,
            }}
            className="h-28"
            src={drinkDetails[index - 1].img.src}
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
              height: 80,
            }}
            src={drinkDetails[index].img.src}
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
          src={drinkDetails[0].img.src}
          className="h-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </motion.div>
  );
};

export default SlotMachineDetail;
