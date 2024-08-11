// react
import React, { useState, useEffect, useRef } from "react";
// react components
import GuessArea from "./GuessArea";
import SlotNumber from "./SlotNumber";
import SlotMachineDrinkType from "./SlotMachineDrinkType";
import SlotMachineDetail from "./SlotMachineDetail";
import BtnOrbit from "./BtnOrbit";
// react icons
import { RiDrinksFill } from "react-icons/ri";
import { FaCaretRight, FaSpinner } from "react-icons/fa6";
// framer motion
import { motion } from "framer-motion";
// class
import { Drink } from "./SlotMachineDrinkType";
import { DrinkDetail } from "./SlotMachineDetail";
// shadCN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
// assets
import careerImg from "../../images/about/career.jpg";
import publicServantImg from "../../images/about/public-servant.png";
import outdoorImg from "../../images/about/outdoor.jpg";
import indoorImg from "../../images/about/indoor.png";
import sportImg from "../../images/about/sport.jpg";
import tableTennisImg from "../../images/about/tabble-tennis.png";
import zodiacSignsImg from "../../images/about/zodiac-sign.jpg";
import geminiImg from "../../images/about/gemini.png";
import ageImg from "../../images/about/age.jpg";
import middleAgeImg from "../../images/about/middle-age.png";

type GuessAreaData = {
  question: string;
  hint: string;
  options: string[];
  answer: string;
  color: string;
  questionImg: ImageMetadata;
  answerImg: ImageMetadata;
};

const guessAreasData: GuessAreaData[] = [
  {
    question: "我的職業是？",
    hint: "服務、誠信、公共利益",
    options: ["公務員", "老師", "工程師", "醫生"],
    answer: "公務員",
    color: "#cfee28",
    questionImg: careerImg,
    answerImg: publicServantImg,
  },
  {
    question: "我偏室內派還是偏戶外派？",
    hint: "膚色（送分題？ 😂 ）",
    options: ["偏室內派", "偏戶外派"],
    answer: "偏室內派",
    color: "#ee27df",
    questionImg: outdoorImg,
    answerImg: indoorImg,
  },
  {
    question: "我最愛的運動是？",
    hint: "身高、上一題的答案、氣質",
    options: ["桌球", "羽球", "排球", "籃球"],
    answer: "桌球",
    color: "#0abdc6",
    questionImg: sportImg,
    answerImg: tableTennisImg,
  },
  {
    question: "我的星座是？",
    hint: "好奇心重、聰明機智、3分鐘熱度",
    options: ["水瓶座", "雙子座", "天秤座", "天蠍座"],
    answer: "雙子座",
    color: "#3fff2d",
    questionImg: zodiacSignsImg,
    answerImg: geminiImg,
  },
  {
    question: "我的年齡？",
    hint: "皮膚、頭髮、眼神",
    options: ["21~25", "26~30", "31~35", "36~40"],
    answer: "31~35",
    color: "#ff0677",
    questionImg: ageImg,
    answerImg: middleAgeImg,
  },
];

const drinkTypeToString = {
  sm: "抽中小杯飲料",
  md: "抽中中杯飲料",
  lg: "抽中大杯飲料",
  bubble: "恭喜！抽中手搖飲",
  coffee: "恭喜！抽中星巴克咖啡",
};

export type GuessToIsCorrectMap = {
  [key: number]: "correct" | "incorrect" | "undone";
};
const guessToIsCorrectMap: GuessToIsCorrectMap = {};
guessAreasData.map((_, index) => {
  guessToIsCorrectMap[index + 1] = "undone";
});

const GuessSection = () => {
  const [guessMap, setGuessMap] =
    useState<GuessToIsCorrectMap>(guessToIsCorrectMap);
  const numOfCorrect = Object.values(guessMap).filter(
    (result) => result === "correct"
  ).length;
  const numOfGuess = Object.values(guessMap).filter(
    (result) => result !== "undone"
  ).length;
  const [resultDescription, setResultDescription] = useState<string>("");
  const [isSlotMachineOpen, setIsSlotMachineOpen] = useState<boolean>(false);
  const [isSlotMachineTypeActive, setIsSlotMachineTypeActive] =
    useState<boolean>(false);
  const [slotMachineTypeResult, setSlotMachineTypeResult] =
    useState<Drink | null>(null);
  const [isSlotMachineDetailActive, setIsSlotMachineDetailActive] =
    useState<boolean>(false);
  const [slotMachineDetailResult, setSlotMachineDetailResult] =
    useState<DrinkDetail | null>(null);
  const guessAreaRefs = useRef<HTMLDivElement[]>([]);

  const sleep = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    if (numOfGuess === guessAreasData.length) {
      const correctRatio = numOfCorrect / numOfGuess;
      if (correctRatio === 1) {
        setResultDescription("");
      } else if (correctRatio >= 0.6) {
        setResultDescription("有些許神秘，等待妳發掘，不加個Line嗎？");
      } else {
        setResultDescription("神秘感Max，不加個Line嗎？");
      }
    }
  });
  const scrollToElement = (ref: HTMLDivElement, offset = 0) => {
    if (ref) {
      const elementPosition = ref.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const slotMachineDetailActivate = async () => {
      await sleep(2000);
      setIsSlotMachineDetailActive(true);
    };
    if (slotMachineTypeResult !== null) {
      slotMachineDetailActivate();
    }
  }, [slotMachineTypeResult]);

  return (
    <section className="w-full">
      <div className="text-center">
        <h1 className="font-semibold text-2xl">猜猜看，全猜對請妳1杯飲料</h1>
      </div>
      <div className="sticky w-full top-0 z-20 pt-1 pb-3 mb-3 border-b-[1px] bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 items-center text-xl font-semibold">
            {guessAreasData.length}題猜對
            <SlotNumber numOfCorrect={numOfCorrect} />題
          </div>
          <div className="flex items-center gap-2">
            {guessAreasData.map((area, index) => (
              <motion.button
                key={area.question}
                onClick={() => {
                  scrollToElement(guessAreaRefs.current[index], 150);
                }}
                animate={{
                  backgroundColor:
                    guessMap[index + 1] === "correct"
                      ? "rgb(34,197,94)"
                      : guessMap[index + 1] === "incorrect"
                      ? "rgb(239,68,68)"
                      : "rgb(0,0,0)",
                }}
                transition={{ duration: 0.5 }}
                className={`rounded-full w-[30px] h-[30px] grid place-content-center ${
                  guessMap[index + 1] === "correct"
                    ? "text-primary"
                    : guessMap[index + 1] === "incorrect"
                    ? "text-primary"
                    : "border-[1px] text-muted-foreground border-muted-foreground"
                }`}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
          <motion.h1
            className="font-semibold text-lg"
            initial={false}
            animate={{ opacity: numOfGuess === guessAreasData.length ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {resultDescription}
          </motion.h1>
          <Dialog open={isSlotMachineOpen} onOpenChange={setIsSlotMachineOpen}>
            {slotMachineTypeResult === null &&
              numOfCorrect === guessAreasData.length && (
                <DialogTrigger asChild>
                  <motion.button
                    className="text-lg font-semibold flex items-center justify-center gap-1 px-3 py-1 rounded-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    onClick={() => setIsSlotMachineOpen(true)}
                  >
                    <RiDrinksFill />
                    <span>抽飲料</span>
                  </motion.button>
                </DialogTrigger>
              )}
            {slotMachineTypeResult !== null && (
              <button className="flex justify-center items-center gap-2">
                <motion.img
                  style={{ height: 60 }}
                  src={slotMachineTypeResult.img.src}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                />
                {slotMachineDetailResult !== null && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <FaCaretRight />
                    </motion.div>
                    <motion.img
                      style={{ height: 60 }}
                      src={slotMachineDetailResult.img.src}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    />
                  </>
                )}
              </button>
            )}
            <DialogContent className="flex flex-col items-center max-sm:max-w-[360px]">
              <DialogHeader className="text-center">
                <DialogTitle className="text-center text-xl">
                  抽飲料
                </DialogTitle>
                <DialogDescription className="text-base flex justify-center items-center gap-1">
                  {slotMachineDetailResult !== null ? (
                    "結果出爐～"
                  ) : isSlotMachineTypeActive ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>抽選中，請等待～</span>
                    </>
                  ) : (
                    "點擊下方按鈕開抽"
                  )}
                </DialogDescription>
              </DialogHeader>
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  marginTop: 20,
                }}
              >
                <SlotMachineDrinkType
                  isActive={isSlotMachineTypeActive}
                  setSlotMachineResult={setSlotMachineTypeResult}
                />
                {slotMachineTypeResult !== null && (
                  <>
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.3 }}
                    >
                      <FaCaretRight size={30} />
                    </motion.span>
                    <SlotMachineDetail
                      isActive={isSlotMachineDetailActive}
                      drinkType={slotMachineTypeResult.type}
                      setSlotMachineResult={setSlotMachineDetailResult}
                    />
                  </>
                )}
              </motion.div>
              <DialogFooter>
                <BtnOrbit
                  color="#fff"
                  className={`${isSlotMachineTypeActive ? "hidden" : ""}`}
                  onClick={() => setIsSlotMachineTypeActive(true)}
                >
                  開抽
                </BtnOrbit>
                {slotMachineTypeResult !== null && (
                  <motion.h2
                    className="text-xl font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {/* {drinkTypeToString[slotMachineResult.type]} */}
                  </motion.h2>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {guessAreasData.map((area, index) => (
          <GuessArea
            ref={(el) => el && guessAreaRefs.current.push(el)}
            key={area.question}
            number={index + 1}
            question={area.question}
            hint={area.hint}
            options={area.options}
            answer={area.answer}
            color={area.color}
            questionImg={area.questionImg}
            answerImg={area.answerImg}
            setGuessMap={setGuessMap}
          />
        ))}
      </div>
    </section>
  );
};

export default GuessSection;
