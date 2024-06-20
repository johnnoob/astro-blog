// react
import * as React from "react";
// date-fns
import { format, subDays, subQuarters, subYears } from "date-fns";
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

type DefaultDateRangeOption = {
  label: "過去7天" | "過去14天" | "過去30天" | "過去3個月" | "過去1年";
  value:
    | "last7Days"
    | "last14Days"
    | "last30Days"
    | "last3Months"
    | "last1Year";
  dateRange: {
    from: Date;
    to: Date;
  };
};

function isSameDay(date1?: Date, date2?: Date): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const defaultDateRangeOptions: DefaultDateRangeOption[] = [
  {
    label: "過去7天",
    value: "last7Days",
    dateRange: {
      from: subDays(new Date(), 7),
      to: new Date(),
    },
  },
  {
    label: "過去14天",
    value: "last14Days",
    dateRange: {
      from: subDays(new Date(), 14),
      to: new Date(),
    },
  },
  {
    label: "過去30天",
    value: "last30Days",
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
  },
  {
    label: "過去3個月",
    value: "last3Months",
    dateRange: {
      from: subQuarters(new Date(), 1),
      to: new Date(),
    },
  },
  {
    label: "過去1年",
    value: "last1Year",
    dateRange: {
      from: subYears(new Date(), 1),
      to: new Date(),
    },
  },
];

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
