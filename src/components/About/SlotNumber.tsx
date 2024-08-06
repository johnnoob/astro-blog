// react
import React, { useState, useEffect } from "react";
// framer motion
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  numOfCorrect: number;
};

const SlotNumber = ({ numOfCorrect }: Props) => {
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (numOfCorrect !== 0) {
      setIsInitial(false);
    }
  }, [numOfCorrect]);
  return (
    <div className="text-[#ee27df] text-2xl flex flex-col justify-center items-center h-10 overflow-hidden">
      {!isInitial && (
        <AnimatePresence>
          <motion.span
            key={numOfCorrect * 100 - 200}
            initial={{ y: 0 }}
            animate={{ y: -30 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            {numOfCorrect - 1}
          </motion.span>
          <motion.span
            key={numOfCorrect}
            initial={{ y: 30 }}
            animate={{ y: -18 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            {numOfCorrect}
          </motion.span>
        </AnimatePresence>
      )}
      {isInitial && 0}
    </div>
  );
};

export default SlotNumber;
