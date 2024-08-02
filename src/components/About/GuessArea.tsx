// react
import { useState } from "react";
// react components
import CardFlip from "./CardFlip";
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
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
// framer motion
import { motion } from "framer-motion";

type Props = {
  number: number;
  question: string;
  hint: string;
  options: string[];
  answer: string;
  color: string;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  questionImg: ImageMetadata;
  answerImg: ImageMetadata;
};

const GuessArea = ({
  number,
  question,
  hint,
  options,
  answer,
  color,
  setScore,
  questionImg,
  answerImg,
}: Props) => {
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
  const [guess, setGuess] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [animateOrder, setAnimateOrder] = useState<number>(0);
  return (
    <Card
      style={{
        boxShadow: `0 0 10px ${color}, 0 0 40px ${color}`,
      }}
      className="max-w-[500px] w-full"
    >
      <CardHeader className="text-center">
        <CardTitle>
          {number}. {question}
        </CardTitle>
        <CardDescription>提示：{hint}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <CardFlip
          isFlipped={isSubmit}
          setAnimateOrder={setAnimateOrder}
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
              setScore((prev) => prev + 1);
            }
          }}
          transition={{ duration: 1.5 }}
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
          disabled={isSubmit}
        >
          {options.map((option) => (
            <div key={option} className="flex items-center gap-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <Separator />
      <CardFooter
        className={`py-3 flex justify-center ${isSubmit ? "hidden" : ""}`}
      >
        <Button onClick={() => setIsSubmit(true)}>選定！</Button>
      </CardFooter>
    </Card>
  );
};

export default GuessArea;