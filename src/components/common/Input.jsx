import React from "react";

// change classname and styling for Input component - implment daisy ui
const Input = ({
  value,
  handleChange,
  id,
  handleBlur,
  className,
  handleFocus,
  helpText,
  required,
  type,
  name,
  placeholder,
  min,
  max,
  hasIcon,
  icon,
  inputMode,
  autoComplete,
  readOnly,
  size,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={id} className="label">
        <span className="label-text"> {name} </span>
      </label>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        id={id}
        name={id}
        value={value}
        inputMode={inputMode}
        required={required}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        autoComplete={autoComplete}
        min={min}
        max={max}
        readOnly={readOnly}
        size={size}
      />
    </div>
  );
};

export default Input;
