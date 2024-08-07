// react
import { useState, forwardRef } from "react";
// react components
import CardFlip from "./CardFlip";
import BtnOrbit from "./BtnOrbit";
// react icons
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
// shadCN
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// framer motion
import { motion } from "framer-motion";
// types
import type { GuessToIsCorrectMap } from "./GuessSection";

type Props = {
  number: number;
  question: string;
  hint: string;
  options: string[];
  answer: string;
  color: string;
  setGuessMap: React.Dispatch<React.SetStateAction<GuessToIsCorrectMap>>;
  questionImg: ImageMetadata;
  answerImg: ImageMetadata;
};

const GuessArea = forwardRef<HTMLDivElement, Props>(
  (
    {
      number,
      question,
      hint,
      options,
      answer,
      color,
      setGuessMap,
      questionImg,
      answerImg,
    },
    ref
  ) => {
    const titleVariants = {
      hidden: {
        opacity: 0,
        y: -20,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    };
    const [guess, setGuess] = useState<string>(options[0]);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [animateOrder, setAnimateOrder] = useState<number>(0);
    return (
      <Card ref={ref} className="max-w-[500px] w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-lg">
            {number}. {question}
          </CardTitle>
          <CardDescription className="text-base">提示：{hint}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-5">
          <CardFlip
            isFlipped={isSubmit}
            setAnimateOrder={setAnimateOrder}
            animateOrder={animateOrder}
            questionImg={questionImg}
            answerImg={answerImg}
            color={color}
          />
          <motion.div
            className="flex items-center gap-2"
            variants={titleVariants}
            initial={false}
            animate={animateOrder === 1 ? "visible" : "hidden"}
            onAnimationComplete={() => {
              if (guess === answer) {
                setGuessMap((prev) => ({ ...prev, [number]: "correct" }));
              } else {
                setGuessMap((prev) => ({ ...prev, [number]: "incorrect" }));
              }
            }}
            transition={{ duration: 0.5 }}
          >
            {guess !== "" &&
              (guess === answer ? (
                <FaRegCircleCheck className="text-green-400" size={20} />
              ) : (
                <FaRegCircleXmark className="text-red-500" size={20} />
              ))}
            <span>答案：{answer}</span>
          </motion.div>
          <RadioGroup
            className="grid-flow-col"
            onValueChange={(e) => setGuess(e)}
            defaultValue={options[0]}
            disabled={isSubmit}
          >
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter
          className={`pt-0 flex justify-center ${isSubmit ? "hidden" : ""}`}
        >
          <BtnOrbit
            color={color}
            onClick={() => {
              setIsSubmit(true);
            }}
          >
            點擊確認
          </BtnOrbit>
        </CardFooter>
      </Card>
    );
  }
);

export default GuessArea;
