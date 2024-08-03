// react
import React, { useState } from "react";
// framer motion
import { motion } from "framer-motion";

type Props = {
  color: string;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

const BtnOrbit = ({ color, setIsSubmit }: Props) => {
  const [animationOrder, setAnimationOrder] = useState<number>(0);
  const handleAnimationComplete = () => {
    setAnimationOrder((prev) => (prev + 1) % 4); // 循環播放動畫
  };
  return (
    <button
      style={{ color }}
      className={`relative px-4 py-2 overflow-hidden tracking-widest font-semibold text-lg`}
      onClick={() => {
        setIsSubmit(true);
      }}
    >
      猜此選項
      {animationOrder === 0 && (
        <motion.span
          style={{
            background: `linear-gradient(90deg, transparent, ${color})`,
          }}
          className="absolute w-full h-[1px] top-0 left-0"
          animate={{ left: ["-100%", "100%"] }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      {animationOrder === 1 && (
        <motion.span
          style={{
            background: `linear-gradient(180deg, transparent, ${color})`,
          }}
          className="absolute w-[1px] h-full top-0 right-0"
          animate={{ top: ["-100%", "100%"] }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      {animationOrder === 2 && (
        <motion.span
          style={{
            background: `linear-gradient(270deg, transparent, ${color})`,
          }}
          className="absolute w-full h-[1px] bottom-0 right-0"
          animate={{ right: ["-100%", "100%"] }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      {animationOrder === 3 && (
        <motion.span
          style={{
            background: `linear-gradient(0deg, transparent, ${color})`,
          }}
          className="absolute w-[1px] h-full bottom-0 left-0"
          animate={{ bottom: ["-100%", "100%"] }}
          transition={{
            duration: 0.3,
            ease: "linear",
          }}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </button>
  );
};

export default BtnOrbit;
