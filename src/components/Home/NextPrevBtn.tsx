import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

type NextPrevBtnProp = {
  position: "left" | "right";
};

const NextPrevBtn = ({ position }: NextPrevBtnProp) => {
  const leftStyle = "-translate-x-2/3 rounded-r-lg left-0";
  const rightStyle = "translate-x-2/3 rounded-l-lg right-0";
  return (
    <button
      className={`absolute top-1/2 py-4 px-1 bg-primary text-muted text-lg opacity-90 group-hover:-translate-x-0 transition-all ${
        position === "left" ? leftStyle : rightStyle
      }`}
    >
      {position === "left" ? <FaAngleLeft /> : <FaAngleRight />}
    </button>
  );
};

export default NextPrevBtn;
