import { REGEX } from "@/constants/regex";
import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import FormItem from "../Form";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { handleRegister } from "@/store/reducers/authReducer";

const RegisterForm = () => {
  // const { handleCloseModal, handleRegister } = useAuthContext();
  const dispatch = useDispatch();
  const [registerValue, setRegisterValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});

  const _onSubmit = (e) => {
    e.preventDefault();

    const objectError = {};

    if (!registerValue.email) {
      objectError.email = "Vui lòng nhập email";
    } else if (!REGEX.email.test(registerValue.email.trim())) {
      objectError.email = "Vui lòng nhập đúng định dạng email";
    }
    if (!registerValue.password) {
      objectError.password = "Vui lòng nhập mật khẩu";
    } else if (!registerValue.password.length > 6) {
      objectError.password = "Mật khẩu phải có 6 kí tự trở lên";
    }

    setError(objectError);

    if (Object.keys(objectError).length > 0) {
      console.log("ERROR", objectError);
    } else {
      setLoading(true);
      dispatch(handleRegister(registerValue));
    }
  };

  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: registerValue[registerField],
      onChange: (e) =>
        setRegisterValue({
          ...registerValue,
          [registerField]: e.target.value,
        }),
    };
  };
  return (
    <form onSubmit={_onSubmit}>
      <FormItem
        {...register("email")}
        htmlFor={"register-email"}
        label={"Your email address"}
        required
      />
      {/* End .form-group */}
      <FormItem
        {...register("password")}
        htmlFor={"register-password"}
        label={"Password"}
        type="password"
        required
      />

      {/* End .form-group */}
      <div className="form-footer">
        <Button>
          <span>SIGN UP</span>
          <i className="icon-long-arrow-right" />
        </Button>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="register-policy"
            required
          />
          <label className="custom-control-label" htmlFor="register-policy">
            I agree to the
            <a href="privacy-policy.html">privacy policy</a> *
          </label>
        </div>
        {/* End .custom-checkbox */}
      </div>
      {/* End .form-footer */}
    </form>
  );
};

export default RegisterForm;
