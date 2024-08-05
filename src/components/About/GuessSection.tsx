// react
import React, { useState, useEffect } from "react";
// react components
import GuessArea from "./GuessArea";
// react icons
import { RiDrinksFill } from "react-icons/ri";
// framer motion
import { motion } from "framer-motion";
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

  useEffect(() => {
    if (numOfGuess === guessAreasData.length) {
      const correctRatio = numOfCorrect / numOfGuess;
      if (correctRatio === 1) {
        setResultDescription("妳真瞭解我～請妳喝杯飲料！");
      } else if (correctRatio >= 0.6) {
        setResultDescription("有些許神秘，等待妳發掘，不加個Line嗎？");
      } else {
        setResultDescription("神秘感Max，不加個Line嗎？");
      }
    }
  });

  return (
    <section className="w-full flex flex-col gap-4">
      <h1 className="flex items-center justify-center gap-2 font-semibold text-xl">
        <RiDrinksFill className="text-[#cfee28]" size={25} />
        <span>總共{guessAreasData.length}題，全猜對我請妳1杯飲料：</span>
      </h1>
      <div className="sticky w-full top-0 z-20 pt-1 pb-3 border-b-[1px] bg-background flex justify-center items-center gap-4">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-lg font-semibold tracking-wider">
            {guessAreasData.length}題答對
            <span className="text-[#ee27df] text-2xl">{numOfCorrect}</span>題
          </h2>
          <div className="flex items-center gap-2">
            {guessAreasData.map((area, index) => (
              <motion.div
                key={area.question}
                className={`rounded-full w-[30px] h-[30px] border-[1px] grid place-content-center ${
                  guessMap[index + 1] === "correct"
                    ? "text-primary bg-green-500"
                    : guessMap[index + 1] === "incorrect"
                    ? "text-primary bg-red-500"
                    : "text-muted"
                }`}
              >
                {index + 1}
              </motion.div>
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
        </div>
      </div>
      {guessAreasData.map((area, index) => (
        <GuessArea
          number={index + 1}
          key={area.question}
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
    </section>
  );
};

export default GuessSection;
