import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Ref, forwardRef } from "react";

const BaseInput = forwardRef(
  (
    {
      label,
      className,
      id,
      type,
      ...rest
    }: {
      label: string;
      className: string;
      id: string;
      type: string;
      rest: any;
    },
    ref
  ) => {
    return (
      <div className={cn("grid max-w-sm items-center gap-1.5", className)}>
        <Label htmlFor={id} className="font-bold">
          {label}
        </Label>
        {type === "textarea" ? (
          <Textarea ref={ref as Ref<HTMLTextAreaElement>} id={id} {...rest} />
        ) : (
          <Input
            ref={ref as Ref<HTMLInputElement>}
            type={type}
            id={id}
            {...rest}
          />
        )}
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
