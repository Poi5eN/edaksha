import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
const Input = ({
  label,
  name,
  required,
  type,
  maxLength,
  disabled,
  required_field,
  onChange,
}) => {
  const { currentColor } = useStateContext();
  return (
    <div class="relative w-full max-w-xl pt-2 px-1">
      <input
        className={`peer transition-all px-5 py-1 w-full text-lg text-gray-600 bg-white  border border-gray-800 outline-none select-all  ${
          required_field ? "border-b-2 border-b-red-600" : ""
        }`}
        onFocus={(e) => (e.target.style.borderColor = currentColor)}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        placeholder=" "
        type={type}
        name={name}
        required={required}
        onChange={onChange}
        max={10}
        min={3}
        maxLength={maxLength}
        disabled={disabled ? disabled : false}
      />
      <label className="z-2 text-gray-500 pointer-events-none absolute left-5 inset-y-0 h-fit flex items-center select-none transition-all text-sm peer-focus:text-sm peer-placeholder-shown:text-md px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-white peer-focus:bg-white peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
        {label}
      </label>
    </div>
  );
};

export default Input;
