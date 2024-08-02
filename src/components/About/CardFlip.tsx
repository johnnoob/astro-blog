// react
import React, { useState } from "react";
// framer motion
import { motion } from "framer-motion";

type Props = {
  isFlipped: boolean;
  setAnimateOrder: React.Dispatch<React.SetStateAction<number>>;
  questionImg: ImageMetadata;
  answerImg: ImageMetadata;
  color: string;
};

const CardFlip = ({
  isFlipped,
  setAnimateOrder,
  questionImg,
  answerImg,
  color,
}: Props) => {
  return (
    <motion.div
      style={{ transformStyle: "preserve-3d" }}
      className={`relative w-[150px] h-[200px] rounded-lg`}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 1800 }}
      transition={{ duration: 1.5 }}
      onAnimationComplete={() => setAnimateOrder((prev) => prev + 1)}
    >
      <div
        style={{
          backfaceVisibility: "hidden",
          backgroundImage: `url(${questionImg.src})`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
        className={`absolute top-0 left-0 h-full w-full rounded-lg bg-cover bg-center bg-no-repeat bg-opacity-35`}
      >
        <div className="absolute top-0 left-0 p-3 flex justify-center items-center h-full w-full bg-black bg-opacity-50 rounded-lg"></div>
      </div>
      <div
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundImage: `url(${questionImg.src})`,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
        className="absolute top-0 left-0 h-full w-full bg--200 rounded-lg p-3 flex justify-center items-center bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute top-0 left-0 p-3 flex justify-center items-center h-full w-full bg-black bg-opacity-70 rounded-lg">
          <img src={answerImg.src} />
        </div>
      </div>
    </motion.div>
  );
};

export default CardFlip;
