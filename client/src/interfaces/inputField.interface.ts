import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface InputFieldProps<TFormValues extends FieldValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  registerOptions:
    | {
        required: string;
        pattern?: undefined;
      }
    | {
        required: string;
        pattern: {
          value: RegExp;
          message: string;
        };
      };
  errors: FieldErrors<TFormValues>;
}
