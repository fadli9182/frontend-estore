import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { ForwardedRef } from "react";

interface FormInputLabelProps {
  label: string;
  placeholder?: string;
  type?: string;
  types?: string;
  // Add any other props you want to support
}

const FormInputLabel = React.forwardRef<HTMLInputElement, FormInputLabelProps>(
  (
    { label, placeholder, type, types = "", ...rest },
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      <Label className="font-semibold">{label}</Label>
      {type === "textarea" ? (
        <Textarea placeholder={placeholder} {...rest} />
      ) : (
        <Input ref={ref} type={types} placeholder={placeholder} {...rest} />
      )}
    </div>
  )
);

export default FormInputLabel;
