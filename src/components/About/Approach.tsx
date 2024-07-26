// react
import { useState, useEffect } from "react";
// js confetti
import JSConfetti from "js-confetti";
// assets
import cartoonNormal from "../../images/cartoon-normal.png";
import cartoonShy from "../../images/cartoon-shy.png";
import cartoonCry from "../../images/cartoon-cry.png";
import qrCode from "../../images/qrcode-line.jpg";
// react icons
import { BsChatFill } from "react-icons/bs";
import { FaLine, FaCheck, FaX, FaArrowRotateRight } from "react-icons/fa6";
// shadCN
import { Button } from "../ui/button";

type Status = "initial" | "agree" | "disagree";

const jsConfetti = new JSConfetti();

const phrasesInitial = [
  "不是怪人QQ",
  "對事物頗具好奇心XD",
  "說話很real",
  "常常放空...",
];
const phrasesAgree = [
  "很高興認識妳～",
  "咖啡、茶還是酒？",
  "雖然我不喝酒...😂",
];
const phrasesDisagree = ["謝謝妳願意停下來😂", "祝妳有美好的一天！"];

const Approach = () => {
  const [status, setStatus] = useState<Status>("initial");
  const [phrases, setPhrases] = useState<string[]>(phrasesInitial);
  const [text, setText] = useState<string>("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
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

  useEffect(() => {
    const statusToPhrasesMap = {
      initial: phrasesInitial,
      agree: phrasesAgree,
      disagree: phrasesDisagree,
    };
    let isCancelled = false;
    const sleep = async (ms: number): Promise<void> => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
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
      <div className="relative mx-auto w-36 mb-5">
        <img
          src={cartoonNormal.src}
          alt="cartoon-portrait normal"
          className={`w-full h-full object-cover ${
            status !== "initial" && "hidden"
          }`}
        />
        <img
          src={cartoonShy.src}
          alt="cartoon-portrait happy"
          className={`w-full h-full object-cover ${
            status !== "agree" && "hidden"
          }`}
        />
        <img
          src={cartoonCry.src}
          alt="cartoon-portrait cry"
          className={`w-full h-full object-cover ${
            status !== "disagree" && "hidden"
          }`}
        />
        <div
          className={`absolute top-0 right-0 translate-x-full -translate-y-1/4 ${
            status !== "disagree" && "hidden"
          }`}
        >
          <BsChatFill size={150} />
          <div className="text-lg absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
            <p className="text-center">No worries~</p>
          </div>
        </div>
      </div>
      <div className={`w-fit flex flex-col items-center mx-auto gap-5`}>
        <h1 className="text-3xl font-semibold tracking-wider">
          哈囉，我叫<strong className="text-red-500">"蘿蔔🥕"</strong>
        </h1>
        <h2 className={`text-3xl font-semibold`}>
          <span id="typewriter">{text}</span>
          <span id="typewritter-cursor">|</span>
        </h2>
        <p
          className={`text-xl text-center ${status !== "initial" && "hidden"}`}
        >
          要不要改天約個咖啡 ☕ ？
        </p>
        <div className={`${status !== "agree" && "hidden"}`}>
          <div className="flex flex-col items-center gap-2 mt-2">
            <div className="flex gap-2 items-center justify-center">
              <FaLine className="text-green-400" size={30} />
              <span className="text-xl font-semibold">Line ID：johngenius</span>
            </div>
            <img src={qrCode.src} alt="line QR code" className="w-52" />
          </div>
        </div>
        <div className="flex gap-7">
          <Button
            className={`text-lg ${status !== "initial" && "hidden"}`}
            onClick={() => setStatus("agree")}
          >
            <FaCheck />
            <span className="ml-2">OK</span>
          </Button>
          <Button
            className={`text-lg ${
              status !== "initial" ? "hidden" : "shake-constant shake-little"
            }`}
            variant="destructive"
            onClick={() => setStatus("disagree")}
          >
            <FaX />
            <span className="ml-2">No</span>
          </Button>
          <Button
            className={`text-lg ${status !== "disagree" && "hidden"}`}
            onClick={() => setStatus("initial")}
          >
            <FaArrowRotateRight />
            <span className="ml-2">Reset</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Approach;
