import FormItem from "@/components/Form";
import { authService } from "@/services/authService";
import { message } from "antd";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ChangePass = () => {
  const { profile } = useSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const currentPass = useRef({});
  const newPass = useRef({});

  currentPass.current = watch("currentPass", "");
  newPass.current = watch("newPass", "");
  const _onSubmit = async (data) => {
    if (!data || !profile) return;
    const { currentPass, newPass } = data || {};

    const payload = {
      ...profile,
      password: currentPass,
      newPassword: newPass,
    };
    if (payload) {
      try {
        const res = await authService.updateProfile(payload);
        if (res) {
          message.success("Cập nhật mật khẩu thành công");
          reset({
            currentPass: "",
            newPass: "",
            confirmPass: "",
          });
        }
      } catch (error) {
        message.error(error?.response?.data.message);
      }
    }
  };

  return (
    <div>
      <FormItem
        type="password"
        label={"Current password (leave blank to leave unchanged)"}
        required
        htmlFor={"currentPass"}
        error={errors?.currentPass?.message || ""}
        {...register("currentPass", {
          required: "Nhập mật khẩu",
        })}
      />

      <FormItem
        type="password"
        label={"New password (leave blank to leave unchanged)"}
        required
        htmlFor={"newPass"}
        error={errors?.newPass?.message || ""}
        {...register("newPass", {
          required: "Nhập mật khẩu mới",
          validate: (value) => {
            return (
              value !== currentPass.current ||
              "Mật khẩu mới không được trùng với mật khẩu cũ "
            );
          },
        })}
      />

      <FormItem
        label={"Confirm new password"}
        required
        type="password"
        htmlFor={"confirmPass"}
        error={errors?.confirmPass?.message || ""}
        {...register("confirmPass", {
          required: "Xác nhận mật khẩu",
          validate: (value) => {
            return value === newPass.current || "Mật khẩu không khớp";
          },

          // pattern: {
          //   value: getValues("newPass") === getValues("confirmPass"),
          //   message: "Mật khẩu không khớp",
          // },
        })}
      />

      {/* <label>Confirm new password</label>
      <input type="password" className="form-control mb-2" /> */}
      <button
        type="submit"
        onClick={handleSubmit(_onSubmit)}
        className="btn btn-outline-primary-2"
      >
        <span>SAVE CHANGES</span>
        <i className="icon-long-arrow-right" />
      </button>
    </div>
  );
};

export default ChangePass;
