// import React, { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { Tooltip } from "primereact/tooltip";

// function Input({
//   type,
//   name,
//   className,
//   respclass,
//   id,
//   placeholder,
//   lable,
//   value,
//   onKeyDown,
//   required,
//   display,
//   onChange,
//   disabled,
//   readOnly,
//   defaultValue,
//   onBlur,
//   inputRef,
//   removeFormGroupClass,
//   onInput,
//   max,
//   min,
//   key,
//   showTooltipCount,
//   maxLength,
//   tabIndex,
//   placeholderLabel
// }) {
//   const [t] = useTranslation();

//   return (
//     <>
//       <Tooltip
//         target={`#${id}`}
//         position="top"
//         content={
//           t(lable) +
//           ` ${showTooltipCount ? "Count : " + (value?.length ? value?.length : "0") : ""}`
//         }
//         event="focus"
//         className="ToolTipCustom"
//       />

//       <div className={`${respclass}  custominputbox`}>
//         {/* <div className={!isFromGroup ? "" : "form-group"}> */}
//         <div className={removeFormGroupClass ? "" : "form-group"}>
//           <input
//             type={type}
//             className={className}
//             id={id}
//             name={name}
//             placeholder={placeholder}
//             value={value}
//             onKeyDown={onKeyDown}
//             key={key}
//             onChange={onChange}
//             autoComplete="off"
//             step={type === "number" ? "0.01" : ""}
//             required={required}
//             ref={inputRef}
//             onBlur={onBlur}
            // max={max}
            // min={min}
//             style={{ textAlign: display ?? "left" }}
//             onInput={onInput}
//             disabled={disabled ? disabled : false}
//             // tabIndex={tabIndex ? tabIndex : "-1"}
//             readOnly={readOnly}
//             maxLength={maxLength}
//           />
//           {lable && (
//             <label htmlFor={id} className="lable truncate">
//               {lable}
//             </label>
//           )}
//           <span className='placeholderLabel'> {placeholderLabel} </span>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Input;

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
