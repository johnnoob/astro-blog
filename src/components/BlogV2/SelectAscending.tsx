// shadCN
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// react
import { useState } from "react";

type Props = {
  isDateAscending: boolean;
  setIsDateAscending: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectAscending = ({ isDateAscending, setIsDateAscending }: Props) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const handleClickOverlay = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
  };
  return (
    <div className="relative">
      <Select
        defaultValue={isDateAscending ? "ascending" : "descending"}
        onValueChange={(value) => setIsDateAscending(value === "ascending")}
        onOpenChange={(isOpen) => setIsSelectOpen(isOpen)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Themes" />
        </SelectTrigger>
        <SelectContent position="popper" avoidCollisions={true}>
          <SelectItem value="ascending">由舊到新</SelectItem>
          <SelectItem value="descending">由新到舊</SelectItem>
        </SelectContent>
      </Select>

      {isSelectOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0)", // 可根据需要调整透明度
          }}
          onClick={handleClickOverlay}
        />
      )}
    </div>
  );
};

export default SelectAscending;
