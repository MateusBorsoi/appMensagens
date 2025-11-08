import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

interface Props extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  id?: string;
  name: string;
  label?: string;
}

const CheckBox = ({ id, name, label, ...props }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex items-center gap-3">
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
            {label && <Label htmlFor={id}>{label}</Label>}
          </div>
        );
      }}
    />
  );
};

export default CheckBox;
