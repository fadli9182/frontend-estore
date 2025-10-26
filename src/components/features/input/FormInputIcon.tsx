import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type FormInputIconProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const FormInputIcon = ({
  value,
  onChange,
  className,
  ...rest
}: FormInputIconProps) => {
  return (
    <div className="text-black">
      <div className="relative">
        <span className="absolute left-7 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-gray-400">
          <Search size={"14"} />
        </span>

        <Input
          {...rest}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search..."
          className={cn(
            "pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 w-[90%] min-w-[150px] h-auto text-foreground",
            className
          )}
        />
      </div>
    </div>
  );
};

export default FormInputIcon;

FormInputIcon.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
