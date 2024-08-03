// react
import { forwardRef, useState, useEffect } from "react";
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
    areaType: "agree" | "disagree";
    bubblePhrases: string[];
    Icon: IconType;
    label: string;
    color: string;
  }
>(
  (
    { status, activeArea, areaType, bubblePhrases, Icon, label, color },
    ref
  ) => {
    const [btnBubblePhrase, setBtnBubblePhrase] = useState<string>("");
    const sleep = async (ms: number): Promise<void> => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    useEffect(() => {
      let isCanceled = false;
      const bubbleLoop = async () => {
        while (!isCanceled) {
          for (let i = 0; i < bubblePhrases.length; i++) {
            if (isCanceled) break;
            const currentBubblePhrase = bubblePhrases[i];
            setBtnBubblePhrase(currentBubblePhrase);
            await sleep(1500);
          }
        }
      };
      if (activeArea === areaType) bubbleLoop();
      return () => {
        isCanceled = true;
      };
    }, [activeArea, areaType]);
    return (
      <motion.div
        ref={ref}
        style={
          {
            boxShadow: `0 0 10px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
            "--triangle-border-top-color": color,
          } as React.CSSProperties
        }
        className={`relative flex justify-center items-center gap-3 w-32 h-24 rounded-lg font-semibold ${
          status !== "initial" ? "hidden" : ""
        } ${activeArea === "agree" ? `bg-[${color}] text-primary` : ""}`}
        initial={false}
        animate={{
          scale: activeArea === areaType ? 1.5 : 1,
          color: activeArea === areaType ? "#fff" : "#3fff2d",
          backgroundColor: activeArea === areaType ? "#3fff2d" : "transparent",
        }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Icon size={20} />
        <span className="text-xl">{label}</span>
        <motion.div
          style={{
            backgroundColor: color,
            y: -40,
            transformOrigin: "50% calc(100% + 10px)",
          }}
          className={`absolute text-nowrap text-primary text-sm top-0 px-3 py-2 rounded-lg`}
          initial={false}
          animate={{
            opacity: activeArea === areaType ? 1 : 0,
            scale: 0.6667,
            y: activeArea === areaType ? -50 : -40,
            rotate: activeArea === areaType ? [-10, 10] : 0,
          }}
          transition={{
            rotate: {
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            opacity: {
              duration: 0.5, // Set a duration for opacity transition
            },
          }}
        >
          {btnBubblePhrase}
          <span className={`triangle`} />
        </motion.div>
      </motion.div>
    );
  }
);

export default VoteArea;
