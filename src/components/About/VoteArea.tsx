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
    const [animateOrder, setAnimateOrder] = useState<number>(0);
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
        className={`relative flex justify-center items-center gap-3 w-32 h-24 rounded-lg text-[${color}] font-semibold ${
          status !== "initial" ? "hidden" : ""
        } ${activeArea === "agree" ? `bg-[${color}] text-primary` : ""}`}
        onAnimationComplete={() => setAnimateOrder((prev) => prev + 1)}
        initial={false}
        animate={{
          scale: activeArea === areaType ? 1.5 : 1,
          color: activeArea === areaType ? "#fff" : "#3fff2d",
        }}
        transition={{ duration: 0.5, type: "spring", delayChildren: 2 }}
      >
        <Icon size={20} />
        <span className="text-xl">{label}</span>
        <motion.div
          className={`absolute text-nowrap text-primary text-sm top-0 -translate-y-[55px] px-3 py-2 rounded-lg bg-[${color}]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeArea === areaType ? 1 : 0 }}
        >
          {btnBubblePhrase}
          <span className={`triangle`} />
        </motion.div>
      </motion.div>
    );
  }
);

export default VoteArea;
