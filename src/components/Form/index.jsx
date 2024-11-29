import { forwardRef } from "react";

const FormItem = (
  { htmlFor, label, required, error, renderInput, ...restProps },
  ref
) =>
  // ref

  {
    return (
      <div className="form-group">
        {label && (
          <label className="label" htmlFor={htmlFor}>
            {label} {required && <span>*</span>}
          </label>
        )}
        {renderInput ? (
          renderInput({ label, error, ...restProps })
        ) : (
          <input
            id={htmlFor}
            ref={ref}
            type="text"
            className={`form-control ${error ? "input-error" : ""} `}
            {...restProps}
          />
        )}
        {error && <p className="form-error">{error}</p>}
      </div>

      // <div className="form-group">
      //   <label htmlFor="register-email">Your email address *</label>
      //   <input
      //     type="email"
      //     className="form-control input-error"
      //     id="register-email"
      //     name="register-email"
      //     required
      //   />
      //   <p className="form-error">Please fill in this field</p>
      // </div>
    );
  };

export default forwardRef(FormItem);
