import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { TypographySmall } from "../typography/TypographySmall";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const TextField = ({
  name,
  className,
  id,
  label,
  type,
  leftIcon,
  rightIcon,
  ...props
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, field }) => {
        const hasValue = field.value && field.value.toString().length > 0;

        const handleClear = () => {
          field.onChange("");
        };

        return (
          <div className={className}>
            {label && (
              <Label
                className={`pb-1 ${
                  !!fieldState.error?.message && "text-destructive"
                }`}
                htmlFor={id}
              >
                {label}
              </Label>
            )}

            <div className="relative">
              {leftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {leftIcon}
                </div>
              )}

              <Input
                id={id}
                name={name}
                type={type}
                aria-invalid={!!fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                className={`
              ${leftIcon ? "pl-10" : ""}
              ${rightIcon || hasValue ? "pr-10" : ""}
            `}
                {...props}
              />
              {rightIcon ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {rightIcon}
                </div>
              ) : (
                hasValue && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors hover:cursor-pointer"
                    tabIndex={-1}
                  >
                    <X size={18} />
                  </button>
                )
              )}
            </div>

            {fieldState.error?.message && (
              <TypographySmall
                text={fieldState.error.message}
                className="text-destructive"
              />
            )}
          </div>
        );
      }}
    />
  );
};
export default TextField;
