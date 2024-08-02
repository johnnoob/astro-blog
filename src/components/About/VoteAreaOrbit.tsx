// react
import { forwardRef, useState } from "react";
// types
import type { ActiveArea } from "./VoteSection";
import type { Status } from "./Approach";
import type { IconType } from "react-icons/lib";
// framer motion
import { motion } from "framer-motion";

const VoteArea = forwardRef<
  HTMLDivElement,
  {
    status: Status;
    activeArea: ActiveArea;
    Icon: IconType;
    label: string;
    color: string;
  }
>(({ activeArea, status, Icon, label, color }, ref) => {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const handleAnimationComplete = () => {
    setCurrentAnimation((prev) => (prev + 1) % 4); // 循環播放動畫
  };
  return (
    <div
      ref={ref}
      className={`relative flex justify-center items-center gap-3 w-32 h-24 border border-[${color}] text-[${color}] font-semibold transition-all ${
        status !== "initial" ? "hidden" : ""
      } ${
        activeArea === "agree" ? `scale-150 bg-[${color}] text-primary` : ""
      }`}
    >
      <Icon size={20} />
      <span className="text-xl">{label}</span>
      <div className="absolute overflow-hidden">
        {currentAnimation === 0 && (
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
        {currentAnimation === 1 && (
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
        {currentAnimation === 2 && (
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
        {currentAnimation === 3 && (
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
      </div>
    </div>
  );
});

export default VoteArea;
