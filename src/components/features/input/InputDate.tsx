import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

const InputDate = ({ value, handleSelectDate, label, disabled = false }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[full] justify-start text-left font-normal text-primary mt-1",
            !value && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "dd/MM/yyyy")
          ) : (
            <span>{label ? label : "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex m-1">
          <div className="flex-1"></div>
          <PopoverClose>
            <X size={24} className="text-primary/60 hover:text-destructive" />
          </PopoverClose>
        </div>

        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default InputDate;
