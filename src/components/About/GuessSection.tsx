// react
import React, { useState } from "react";
// react components
import GuessArea from "./GuessArea";
// react icons
import { RiDrinksFill } from "react-icons/ri";
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
    color: "#add8e6",
    questionImg: sportImg,
    answerImg: tableTennisImg,
  },
  {
    question: "我的星座是？",
    hint: "好奇心重、聰明機智、3分鐘熱度",
    options: ["水瓶座", "雙子座", "天秤座", "天蠍座"],
    answer: "雙子座",
    color: "#add8e6",
    questionImg: zodiacSignsImg,
    answerImg: geminiImg,
  },
  {
    question: "我的年齡？",
    hint: "皮膚、頭髮、眼神",
    options: ["21~25", "26~30", "31~35", "36~40"],
    answer: "31~35",
    color: "#add8e6",
    questionImg: ageImg,
    answerImg: middleAgeImg,
  },
];

const GuessSection = () => {
  const [score, setScore] = useState<number>(0);
  return (
    <section className="w-full flex flex-col gap-10">
      <h1 className="flex items-center justify-center gap-2 font-semibold text-xl">
        <RiDrinksFill className="text-[#cfee28]" size={25} />
        <span>總共{guessAreasData.length}題，全猜對我請妳1杯飲料：</span>
      </h1>
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
          setScore={setScore}
        />
      ))}
      <div className="text-center text-xl font-semibold">
        <h3 className="tracking-wider">
          {guessAreasData.length}題中答對
          <span className="text-[#ee27df] text-3xl">{score}</span>題
        </h3>
        {score === guessAreasData.length && (
          <h1 className="mt-2">恭喜！妳真瞭解我，還不加個Line嗎？</h1>
        )}
      </div>
    </section>
  );
};

export default GuessSection;
