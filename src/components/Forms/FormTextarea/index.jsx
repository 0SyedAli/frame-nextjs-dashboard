import React from "react";
import "../Form.css";

export function FormTextarea({ label, error, className = "", ...props }) {
  const textareaClasses = `form-control rounded-2 form-input-custom form-textarea-custom ${
    error ? "is-invalid" : ""
  } ${className}`;

  return (
    <div className="mb-3 w-100">
      <label className="form-label text-muted small">{label}</label>
      <textarea 
        className={textareaClasses} 
        rows={4} 
        {...props} 
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
