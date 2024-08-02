// react
import { useState, useEffect, useRef } from "react";
// js confetti
import JSConfetti from "js-confetti";
// assets
import cartoonNormal from "../../images/cartoon-normal.png";
import cartoonShy from "../../images/cartoon-shy.png";
import cartoonCry from "../../images/cartoon-cry.png";
import qrCode from "../../images/qrcode-line.jpg";
// react components
import VoteSection from "./VoteSection";
import NeonTitle from "./NeonTitle";
import GuessSection from "./GuessSection";
// react icons
import { BsChatFill } from "react-icons/bs";
import {
  FaCircleQuestion,
  FaArrowRotateRight,
  FaHeart,
  FaAnglesDown,
} from "react-icons/fa6";
import { AiOutlineDrag } from "react-icons/ai";
// shadCN
import { Button } from "../ui/button";
// frame motion
import { motion, type PanInfo } from "framer-motion";

export type Status = "initial" | "agree" | "disagree";

const jsConfetti = new JSConfetti();

const phrasesInitial = ["我很real", "我不白目(應該吧?)", "我常常放空..."];
const phrasesAgree = [
  "很開心遇見妳～",
  "咖啡、茶還是酒？",
  "雖然我不喝酒...😂",
];
const phrasesDisagree = [
  "No worries~😂",
  "謝謝妳願意停下來",
  "祝妳有美好的一天！",
];

type ActiveArea = "agree" | "disagree" | null;

const Approach = () => {
  const [status, setStatus] = useState<Status>("initial");
  const [phrases, setPhrases] = useState<string[]>(phrasesInitial);
  const [text, setText] = useState<string>("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [activeArea, setActiveArea] = useState<ActiveArea>(null);
  const [isGuessOpen, setIsGuessOpen] = useState<boolean>(false);

  useEffect(() => {
    switch (status) {
      case "agree":
        setPhrases(phrasesAgree);
        jsConfetti.addConfetti({
          confettiRadius: 6,
          confettiNumber: 800,
        });
        break;
      case "disagree":
        setPhrases(phrasesDisagree);
        jsConfetti.addConfetti({ emojis: ["⚡️"] });
        break;
      default:
        break;
    }
  }, [status]);

  const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    const statusToPhrasesMap = {
      initial: phrasesInitial,
      agree: phrasesAgree,
      disagree: phrasesDisagree,
    };
    let isCancelled = false;
    const sleepTime = 1000;
    const typeLoop = async (phrases: string[]) => {
      let currentPhrase = phrases[currentPhraseIndex];
      for (let i = 0; i < currentPhrase.length; i++) {
        if (isCancelled) return;
        setText(currentPhrase.substring(0, i + 1));
        await sleep(150);
      }
      await sleep(sleepTime);
      for (let i = currentPhrase.length; i > 0; i--) {
        if (isCancelled) return;
        setText(currentPhrase.substring(0, i - 1));
        await sleep(70);
      }
      if (isCancelled) return;
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    };
    typeLoop(statusToPhrasesMap[status]);
    return () => {
      isCancelled = true;
    };
  }, [currentPhraseIndex, status]);

  return (
    <>
      <div className="relative mx-auto w-36 h-52 mb-5">
        <img
          src={cartoonNormal.src}
          alt="cartoon-portrait normal"
          className={`w-full h-full object-cover ${
            !(activeArea === null) && "hidden"
          }`}
        />
        <img
          src={cartoonShy.src}
          alt="cartoon-portrait happy"
          className={`w-full h-full object-cover ${
            !(status === "agree" || activeArea === "agree") && "hidden"
          }`}
        />
        <img
          src={cartoonCry.src}
          alt="cartoon-portrait cry"
          className={`w-full h-full object-cover ${
            !(status === "disagree" || activeArea === "disagree") && "hidden"
          }`}
        />
        <div
          className={`absolute top-0 right-0 translate-x-full -translate-y-1/4 ${
            status !== "disagree" && "hidden"
          }`}
        >
          <BsChatFill size={150} />
          <div className="text-lg absolute top-1/2 left-1/2 text-muted -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            <p className="text-center">No worries~</p>
          </div>
        </div>
      </div>
      <div className={`w-fit flex flex-col items-center mx-auto gap-5`}>
        <NeonTitle />
        <h2 className={`text-3xl font-semibold`}>
          <span id="typewriter">{text}</span>
          <span id="typewritter-cursor">|</span>
        </h2>
        <p
          className={`text-xl text-center ${status !== "initial" && "hidden"}`}
        >
          <span>想與妳改天約個咖啡，OK嗎？</span>
        </p>
        <div className={`${status !== "initial" && "hidden"}`}>
          --- 拖曳愛心到選擇區域 ---
        </div>
        <div className={`${status !== "agree" && "hidden"}`}>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div className="flex gap-2 items-center justify-center">
              {/* <FaLine className="text-green-400" size={30} /> */}
              <span className="text-xl font-semibold">Line ID：johngenius</span>
            </div>
            <img src={qrCode.src} alt="line QR code" className="w-52" />
          </div>
        </div>
        <VoteSection
          status={status}
          activeArea={activeArea}
          setStatus={setStatus}
          setActiveArea={setActiveArea}
        />
        <h3 className={`mt-8 ${status !== "initial" && "hidden"}`}>
          很難決定嗎？不如“猜猜看”我的資訊再決定！
        </h3>
        <motion.button
          className={`px-2 py-2 rounded-lg flex flex-col gap-4 items-center ${
            status !== "initial" && "hidden"
          }`}
          onClick={() => setIsGuessOpen(!isGuessOpen)}
        >
          <span>--- 點擊{isGuessOpen ? "關閉" : "玩"}猜猜看 ---</span>
          <FaAnglesDown className="animate-bounce" />
        </motion.button>
        {isGuessOpen && status === "initial" && <GuessSection />}
        <Button
          className={`text-lg ${status === "initial" && "hidden"}`}
          onClick={() => {
            setStatus("initial");
            setActiveArea(null);
          }}
        >
          <FaArrowRotateRight />
          <span className="ml-2">重新選擇</span>
        </Button>
      </div>
    </>
  );
};

export default Approach;
