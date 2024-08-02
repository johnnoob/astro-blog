// react
import { forwardRef } from "react";
// types
import type { ActiveArea } from "./VoteSection";
import type { Status } from "./Approach";
import type { IconType } from "react-icons/lib";
// motion framer
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const VoteAreaRotate = forwardRef<
  HTMLDivElement,
  {
    status: Status;
    activeArea: ActiveArea;
    Icon: IconType;
    label: string;
    color: string;
  }
>(({ activeArea, status, Icon, label, color }, ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mouseXPct = mouseX / width - 0.5;
    const mouseYPct = mouseY / height - 0.5;
    x.set(mouseXPct);
    y.set(mouseYPct);
  };
  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.1 }}
      style={{
        boxShadow: `0 0 10px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`flex justify-center items-center gap-3 w-32 h-24 border-[1px] border-[${color}] text-[${color}] neon-shadow-green rounded-lg shadow-sm font-semibold transition-all ${
        status !== "initial" ? "hidden" : ""
      } ${
        activeArea === "agree" ? `scale-150 bg-[${color}] text-primary` : ""
      }`}
    >
      <Icon style={{ transform: "translateZ(50px)" }} size={20} />
      <span style={{ transform: "translateZ(40px)" }} className="text-xl">
        {label}
      </span>
    </motion.div>
  );
});

export default VoteAreaRotate;
