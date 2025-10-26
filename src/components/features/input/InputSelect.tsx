import { Label } from "@/components/ui/label";
import { customStylesInputWithoutRounded } from "@/utils/utils";
import React from "react";
import Select from "react-select";

interface InputSelectProps {
  label: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (e: any) => void;
  defaultValue?: { value: string; label: string };
  isDisabled?: boolean;
  value?: { value: string; label: string };
  isClearable?: boolean;
}

const InputSelect = React.forwardRef<HTMLSelectElement, InputSelectProps>(
  ({ label, placeholder, options, onChange, defaultValue, ...rest }, ref) => (
    <div className="z-50">
      <Label ref={ref} className="font-semibold">
        {label}
      </Label>
      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        value={rest.value}
        styles={customStylesInputWithoutRounded}
        defaultValue={defaultValue}
        isDisabled={rest.isDisabled}
        isClearable={rest.isClearable}
        {...rest}
      />
    </div>
  )
);

export default InputSelect;
