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
      style={{
        boxShadow: `0 0 10px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
      }}
      className={`relative flex justify-center items-center gap-3 w-32 h-24 rounded-lg text-[${color}] font-semibold transition-all ${
        status !== "initial" ? "hidden" : ""
      } ${
        activeArea === "agree" ? `scale-150 bg-[${color}] text-primary` : ""
      }`}
    >
      <Icon size={20} />
      <span className="text-xl">{label}</span>
    </div>
  );
});

export default VoteArea;
