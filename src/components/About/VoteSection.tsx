// react
import { useState, useEffect, useRef } from "react";
// motion framer
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
// react icons
import {
  FaHeart,
  FaCheck,
  FaX,
  FaArrowRotateRight,
  FaArrowDown,
} from "react-icons/fa6";
// react component
import VoteArea from "./VoteArea";
// types
import { type Status } from "./Approach";

const bubblePhrases = ["不要選我啦>.<", "沒看到我在發抖嗎？", "No~No~plz!!!"];
const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
type Props = {
  status: Status;
  activeArea: ActiveArea;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setActiveArea: React.Dispatch<React.SetStateAction<ActiveArea>>;
};
export type ActiveArea = "agree" | "disagree" | null;

const VoteSection = ({
  status,
  activeArea,
  setStatus,
  setActiveArea,
}: Props) => {
  const [btnBubblePhrase, setBtnBubblePhrase] = useState<string>("");
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const voteSectionRef = useRef<HTMLElement>(null);
  const disagreeAreaRef = useRef<HTMLDivElement>(null);
  const agreeAreaRef = useRef<HTMLDivElement>(null);

  const handleDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDrag(true);
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
      setActiveArea("disagree");
      return;
    }
    const agreeAreaRect = agreeAreaRef.current?.getBoundingClientRect();
    if (isPointInsideArea(agreeAreaRect, point)) {
      setActiveArea("agree");
      return;
    }
    setActiveArea(null);
  };
  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDrag(false);
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
      setStatus("disagree");
      return;
    }
    const agreeAreaRect = agreeAreaRef.current?.getBoundingClientRect();

    if (isPointInsideArea(agreeAreaRect, point)) {
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
          await sleep(1500);
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
      <div className="w-6 h-6 flex justify-center items-center animate-bounce">
        <FaArrowDown
          size={25}
          className={`${(isDrag || status !== "initial") && "hidden"}`}
        />
      </div>
      <motion.div
        className={`heart cursor-pointer z-20 ${
          status !== "initial" && "hidden"
        }`}
        drag
        dragConstraints={voteSectionRef}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={{ scale: [1, 1.15, 1], rotate: [-45, -45, -45] }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      ></motion.div>
      {/* <div className="flex justify-center gap-14">
        <VoteAreaRotate
          ref={agreeAreaRef}
          status={status}
          activeArea={activeArea}
          Icon={FaCheck}
          label="可以"
          color="#3fff2d"
        />
      </div> */}
      <div className="flex justify-center gap-14">
        <VoteArea
          ref={agreeAreaRef}
          status={status}
          activeArea={activeArea}
          Icon={FaCheck}
          label="可以"
          color="#3fff2d"
        />
        {/* <div
          ref={agreeAreaRef}
          className={`flex justify-center items-center gap-3 w-32 h-24 border-[1px] border-[#3fff2d] text-[#3fff2d] neon-shadow-green rounded-lg shadow-sm font-semibold transition-all ${
            status !== "initial" ? "hidden" : ""
          } ${
            activeArea === "agree" ? "scale-150 bg-[#3fff2d] text-primary" : ""
          }`}
        >
          <FaCheck size={20} />
          <span className="text-xl">可以</span>
        </div> */}
        <div
          ref={disagreeAreaRef}
          className={`relative flex justify-center items-center gap-3 w-32 h-24 border-[1px] border-[#ff0677] neon-shadow-red rounded-lg shadow-sm font-semibold transition-all ${
            status !== "initial" && "hidden"
          } ${
            activeArea === "disagree" && status === "initial"
              ? "bg-[#ff0677] text-primary shake-constant shake"
              : "text-[#ff0677]"
          }`}
        >
          <FaX size={20} />
          <span className="text-xl">不要</span>
          <div
            className={`absolute text-nowrap text-primary text-sm top-0 -translate-y-[55px] px-3 py-2 rounded-lg border-destructive bg-[#ff0677] border ${
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
