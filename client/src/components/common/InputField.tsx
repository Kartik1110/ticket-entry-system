import { FieldValues } from "react-hook-form";
import { InputFieldProps } from "../../interfaces";

function InputField<T extends FieldValues>({
  label,
  name,
  register,
  registerOptions,
  errors,
}: InputFieldProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-sm text-gray-400">
        {label}:
      </label>
      <input
        type={name}
        id={name}
        className="w-full py-2 px-3 mt-1 bg-gray-700 text-white rounded-md active:bg-inherit focus:outline-none focus:border-blue-500"
        {...register(name, registerOptions)}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{(errors[name] as { message: string })?.message}</p>
      )}
    </div>
  );
}

export default InputField;
