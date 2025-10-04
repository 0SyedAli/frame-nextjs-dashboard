import React from "react";
import { FaChevronDown } from "react-icons/fa";
import "../Form.css";

export function FormInput({
  label,
  type = "text",
  options,
  error,
  className = "",
  ...props
}) {
  const inputClasses = `form-control rounded-2 form-input-custom ${
    error ? "is-invalid" : ""
  } ${className}`;

  // Handle focus and blur for select to change arrow color
  const handleSelectFocus = (e) => {
    e.target.classList.add("focused");
    const arrow = e.target.parentElement.querySelector(".select-arrow");
    if (arrow) {
      arrow.style.color = "#A83F98";
    }
  };

  const handleSelectBlur = (e) => {
    e.target.classList.remove("focused");
    const arrow = e.target.parentElement.querySelector(".select-arrow");
    if (arrow) {
      arrow.style.color = "#E3E3E3";
    }
  };

  return (
    <div className="mb-3 w-100">
      <label className="form-label text-muted small">{label}</label>

      {type === "select" ? (
        <div className="select-wrapper position-relative">
          <select
            className={inputClasses}
            onFocus={handleSelectFocus}
            onBlur={handleSelectBlur}
            {...props}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="select-arrow" />
        </div>
      ) : (
        <input type={type} className={inputClasses} {...props} />
      )}

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
