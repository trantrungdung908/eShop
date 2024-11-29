import { REGEX } from "@/constants/regex";
import { handleLogin } from "@/store/reducers/authReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormItem from "../Form";
import LoadingComponent from "../LoadingComponent";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const _onSubmit = (e) => {
    e.preventDefault();

    const objectError = {};

    if (!loginValue.email) {
      objectError.email = "Vui lòng nhập email";
    } else if (!REGEX.email.test(loginValue.email.trim())) {
      objectError.email = "Vui lòng nhập đúng định dạng email";
    }
    if (!loginValue.password) {
      objectError.password = "Vui lòng nhập mật khẩu";
    } else if (!loginValue.password.length > 6) {
      objectError.password = "Mật khẩu phải có 6 kí tự trở lên";
    }

    setError(objectError);

    if (Object.keys(objectError).length > 0) {
      console.log("ERROR", objectError);
    } else {
      // handleLogin(loginValue, () => {
      //   setLoading(false);
      // });
      dispatch(handleLogin(loginValue));
    }
  };

  const register = (loginField) => {
    return {
      name: loginField,
      error: error[loginField],
      value: loginValue[loginField],
      onChange: (e) =>
        setLoginValue({
          ...loginValue,
          [loginField]: e.target.value,
        }),
    };
  };

  return (
    <>
      {loading.login && <LoadingComponent />}
      <form onSubmit={_onSubmit}>
        <FormItem
          {...register("email")}
          htmlFor={"login-email"}
          label={"Your email address"}
          required
        />
        {/* End .form-group */}
        <FormItem
          {...register("password")}
          htmlFor={"login-password"}
          label={"Password"}
          type="password"
          required
        />
        {/* End .form-group */}
        <div className="form-footer">
          <button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </button>
          {/* <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="signin-remember"
          />
          <label className="custom-control-label" htmlFor="signin-remember">
            Remember Me
          </label>
        </div> */}
          {/* End .custom-checkbox */}
          {/* <a href="#" className="forgot-link">
          Forgot Your Password?
        </a> */}
        </div>
        {/* End .form-footer */}
      </form>
    </>
  );
};

export default LoginForm;
