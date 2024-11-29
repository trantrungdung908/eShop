import React from "react";
import { useForm } from "react-hook-form";
import FormItem from "@/components/Form";
import { REGEX } from "@/constants/regex";
import { message } from "antd";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({});

  const _onSubmit = async (data) => {
    console.log("data", data);
    if (!data) return;
    message.success("Gửi thành công");
    reset({
      name: "",
      phone: "",
      email: "",
      subject: "",
      note: "",
    });
  };
  return (
    <form onSubmit={handleSubmit(_onSubmit)} className="contact-form mb-3">
      <div className="row">
        <div className="col-sm-6">
          <FormItem
            required
            placeholder="Name *"
            error={errors?.name?.message || ""}
            {...register("name", {
              required: "Xin mời nhập tên",
            })}
          />
        </div>
        <div className="col-sm-6">
          <FormItem
            required
            placeholder="Email *"
            error={errors?.email?.message || ""}
            {...register("email", {
              required: "Xin mời nhập email",
              pattern: {
                value: REGEX.email,
                message: "Chưa đúng định dạng email",
              },
            })}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <FormItem
            placeholder="Phone"
            htmlFor={"phone"}
            error={errors?.phone?.message || ""}
            {...register("phone", {
              pattern: {
                value: REGEX.phone,
                message: "Chưa đúng định dạng số điện thoại",
              },
            })}
          />
        </div>
        <div className="col-sm-6">
          <FormItem
            required
            placeholder="Subject"
            error={errors?.subject?.message || ""}
            {...register("subject")}
          />
        </div>
      </div>

      <FormItem
        htmlFor={"note"}
        error={errors?.note?.message || ""}
        renderInput={(inputProps) => {
          return (
            <textarea
              className="form-control"
              cols={30}
              rows={4}
              placeholder="Message *"
              {...inputProps}
              {...register("note", {
                required: "Hãy điền tin nhắn",
              })}
            />
          );
        }}
      />
      <button className="btn btn-outline-primary-2 btn-minwidth-sm">
        <span>SUBMIT</span>
        <i className="icon-long-arrow-right" />
      </button>
    </form>
  );
};

export default ContactForm;
