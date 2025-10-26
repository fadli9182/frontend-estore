import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FormInputLabel from "./FormInputLabel";

const FormInput = ({ name, placeholder, label, type, types, ...rest }) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <FormInputLabel
              label={label}
              type={type}
              types={types}
              {...field}
              placeholder={placeholder}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
