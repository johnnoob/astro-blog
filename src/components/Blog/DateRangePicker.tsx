// react
import * as React from "react";
// date-fns
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
// react icons
import { FaRegCalendar } from "react-icons/fa6";
// type
import { type DateRange } from "react-day-picker";
// shadCN components
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// nono store
import { filterStore } from "@/store/filterStore";

export default function DateRangePicker({
  className,
  date,
}: React.HTMLAttributes<HTMLDivElement> & { date: DateRange }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <FaRegCalendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "y/MM/dd")} - {format(date.to, "y/MM/dd")}
                </>
              ) : (
                format(date.from, "y/MM/dd")
              )
            ) : (
              <span>選取期間</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={zhTW}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(dateRange) => {
              filterStore.setKey("dateRange", {
                from: dateRange?.from,
                to: dateRange?.to,
              });
              console.log(dateRange?.from, dateRange?.to);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
