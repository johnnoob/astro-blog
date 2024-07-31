// react
import { forwardRef } from "react";
// types
import type { ActiveArea } from "./VoteSection";
import type { Status } from "./Approach";
import type { IconType } from "react-icons/lib";

const VoteArea = forwardRef<
  HTMLDivElement,
  {
    status: Status;
    activeArea: ActiveArea;
    Icon: IconType;
    label: string;
    color: string;
  }
>(({ activeArea, status, Icon, label, color }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        boxShadow: `0 0 10px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
      }}
      className={`flex justify-center items-center gap-3 w-32 h-24 border-[1px] border-[${color}] text-[${color}] neon-shadow-green rounded-lg shadow-sm font-semibold transition-all ${
        status !== "initial" ? "hidden" : ""
      } ${activeArea === "agree" && `scale-150 bg-[${color}] text-primary`}`}
    >
      <Icon size={20} />
      <span className="text-xl">{label}</span>
    </div>
  );
});

export default VoteArea;
