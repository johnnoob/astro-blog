// react
import { useState, useEffect, useRef } from "react";
// motion framer
import { motion, type PanInfo } from "framer-motion";
// react icons
import { FaHeart, FaCheck, FaX, FaArrowRotateRight } from "react-icons/fa6";
// react component
// types
import { type Status } from "./Approach";

const bubblePhrases = ["不要選我啦>.<", "沒看到我在發抖嗎？", "No~No~plz!!!"];
const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
type Props = {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};
type ActiveArea = "agree" | "disagree" | null;

const VoteSection = ({ status, setStatus }: Props) => {
  const [btnBubblePhrase, setBtnBubblePhrase] = useState<string>("");
  const [activeArea, setActiveArea] = useState<ActiveArea>(null);
  const voteSectionRef = useRef<HTMLElement>(null);
  const disagreeAreaRef = useRef<HTMLDivElement>(null);
  const agreeAreaRef = useRef<HTMLDivElement>(null);
  const handleDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { point } = info;
    const isPointInsideArea = (
      areaRect: DOMRect | undefined,
      point: { x: number; y: number }
    ): boolean => {
      if (!areaRect) return false;
      return (
        point.x > areaRect.left &&
        point.x < areaRect.right &&
        point.y > areaRect.top + window.scrollY &&
        point.y < areaRect.bottom + window.scrollY
      );
    };
    const disagreeAreaRect = disagreeAreaRef.current?.getBoundingClientRect();
    if (isPointInsideArea(disagreeAreaRect, point)) {
      console.log("Dragging over disagree button");
      setActiveArea("disagree");
      return;
    }
    const agreeAreaRect = agreeAreaRef.current?.getBoundingClientRect();
    if (isPointInsideArea(agreeAreaRect, point)) {
      console.log("Dragging over agree button");
      setActiveArea("agree");
      return;
    }
    setActiveArea(null);
  };
  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { point } = info;
    const isPointInsideArea = (
      areaRect: DOMRect | undefined,
      point: { x: number; y: number }
    ): boolean => {
      if (!areaRect) return false;
      return (
        point.x > areaRect.left &&
        point.x < areaRect.right &&
        point.y > areaRect.top + window.scrollY &&
        point.y < areaRect.bottom + window.scrollY
      );
    };
    const disagreeAreaRect = disagreeAreaRef.current?.getBoundingClientRect();
    if (isPointInsideArea(disagreeAreaRect, point)) {
      console.log("Dragging over disagree button");
      setStatus("disagree");
      return;
    }
    const agreeAreaRect = agreeAreaRef.current?.getBoundingClientRect();
    if (isPointInsideArea(agreeAreaRect, point)) {
      console.log("Dragging over agree button");
      setStatus("agree");
      return;
    }
  };
  useEffect(() => {
    let isCanceled = false;
    const bubbleLoop = async () => {
      while (!isCanceled) {
        for (let i = 0; i < bubblePhrases.length; i++) {
          if (isCanceled) break;
          const currentBubblePhrase = bubblePhrases[i];
          setBtnBubblePhrase(currentBubblePhrase);
          await sleep(2000);
        }
      }
    };
    if (activeArea === "disagree") bubbleLoop();
    return () => {
      isCanceled = true;
    };
  }, [bubblePhrases, activeArea]);
  return (
    <section
      ref={voteSectionRef}
      className="mt-3 flex flex-col items-center gap-7 w-fit mx-auto"
    >
      <motion.div
        className={`heart cursor-pointer z-20 ${
          status !== "initial" && "hidden"
        }`}
        drag
        dragConstraints={voteSectionRef}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={{ scale: [1.06, 1, 1.08], rotate: [-45, -45, -45] }}
        transition={{
          duration: activeArea === "disagree" ? 0.1 : 0.6,
          repeat: Infinity,
          repeatType: "loop",
        }}
        // transition={heartAnimationMap[activeArea || "agree"]}
      ></motion.div>
      <div className="flex justify-center gap-14">
        <div
          ref={agreeAreaRef}
          className={`flex justify-center items-center gap-3 w-32 h-24 border-[1px] border-green-600 text-green-600 neon-shadow-green rounded-lg shadow-sm font-semibold transition-all ${
            status !== "initial" && "hidden"
          } ${activeArea === "agree" && "scale-150 bg-green-500 text-primary"}`}
        >
          <FaCheck size={20} />
          <span className="text-xl">可以</span>
        </div>
        <div
          ref={disagreeAreaRef}
          className={`relative flex justify-center items-center gap-3 w-32 h-24 border-[1px] border-red-600 neon-shadow-red rounded-lg shadow-sm font-semibold transition-all ${
            status !== "initial" && "hidden"
          } ${
            activeArea === "disagree" && status === "initial"
              ? "bg-red-500 text-primary shake-constant shake"
              : "text-red-500"
          }`}
        >
          <FaX size={20} />
          <span className="text-xl">不要</span>
          <div
            className={`absolute text-nowrap text-primary text-sm top-0 -translate-y-[55px] px-3 py-2 rounded-lg border-destructive bg-red-500 border ${
              activeArea !== "disagree" && "hidden"
            }`}
          >
            {btnBubblePhrase}
            <span className="triangle" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoteSection;
