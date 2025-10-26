import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface props {
  onChangeDate?: (value: any) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  value?: any;
}

export function DatePicker({
  onChangeDate,
  disabled,
  placeholder,
  label,
  value,
}: props) {
  const [date, setDate] = React.useState<Date>(value || null);

  const handleSelected = (date: any) => {
    setDate(date);
    onChangeDate?.(date);
  };

  React.useEffect(() => {
    if (value === null) {
      setDate(null);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="grid gap-1 w-full">
          {label && <Label>{label}</Label>}
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "dd/MM/yyyy")
            ) : (
              <span>{placeholder || "Pilih Tanggal"}</span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelected}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
