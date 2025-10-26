import { cn } from "@/lib/utils";
import { Calendar } from "primereact/calendar";

export function CalendarDateRangePicker({ className, date, setDate }) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Calendar
        inputClassName="py-1.5"
        value={date}
        onChange={(e) => {
          setDate(e.value);
        }}
        selectionMode="range"
        readOnlyInput
        dateFormat="dd-mm-yy"
      />
    </div>
  );
}
