

import React from "react";
import "./Input.css";
import { useStateContext } from "../contexts/ContextProvider";
const Input = ({ label, name,required,type,maxLength,disabled,required_field,onChange }) => {
  const { currentColor } = useStateContext();
  return (
    <div className="flex flex-col space-y-1">
      <div class="material-textfield">
        <input
          className={`input_text w-full text-[10px] ${required_field ? "required_field" : ""}`}
          // style={{
          //   outline: "none",
          //   border: `1px solid ${currentColor}`,
          // }}
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
        <label
          style={{
            color: currentColor,
            transition: "color 0.9s, transform 0.9s",
          }}
          className="input_label text-[10px]"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
