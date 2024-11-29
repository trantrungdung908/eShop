import FormItem from "@/components/Form";
import { REGEX } from "@/constants/regex";
import useAddress from "@/hooks/useAddress";
import { authService } from "@/services/authService";
import { handleGetInfo } from "@/store/reducers/authReducer";
import { formatDate } from "@/utils/format";
import { message, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const CustomSelect = styled(Select)`
  display: flex;
  height: 40px;
  margin-bottom: 13px;
`;

const FormAccount = () => {
  const { profile } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const formValueRef = useRef({
    firstName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    street: "",
  });

  const { firstName, phone, email, province, district, ward, street } =
    profile || {};

  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
  } = useAddress();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({});

  const isInfoChange =
    JSON.stringify(formValueRef?.current) !== JSON.stringify(getValues());

  useEffect(() => {
    if (!profile) return;
    reset({
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
      birthday: profile?.birthday
        ? formatDate(profile?.birthday, "YYYY/MM/DD").replaceAll("/", "-")
        : "",
    });

    formValueRef.current = getValues();

    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  const _onSubmit = async (data) => {
    const payload = {
      ...data,
      lastName: profile?.lastName,
    };

    try {
      const res = await authService.updateProfile(payload);
      if (res) {
        message.success("Cập nhật thành công");
        dispatch(handleGetInfo());
      }
    } catch (error) {
      message.error(error?.response?.data?.message || "Lỗi !!!");
    }
  };

  const _onProvinceChange = (changeId) => {
    handleProvinceChange?.(changeId);
    reset({
      ...getValues(),
      province: changeId,
      district: undefined,
      ward: undefined,
    });
  };

  const _onDistrictChange = (changeId) => {
    handleDistrictChange?.(changeId);
    reset({
      ...getValues(),
      district: changeId,
      ward: undefined,
    });
  };

  const _onWardChange = (changeId) => {
    handleWardChange?.(changeId);
    reset({
      ...getValues(),
      ward: changeId,
    });
  };

  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form onSubmit={handleSubmit(_onSubmit)} className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <FormItem
              label={"Full Name"}
              required
              htmlFor={"fullname"}
              error={errors?.firstName?.message || ""}
              {...register("firstName", {
                required: "Xin mời nhập tên",
              })}
            />
          </div>
          <div className="col-sm-6">
            <FormItem
              disabled
              label={"Email address"}
              required
              {...register("email")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <FormItem
              label={"Phone number"}
              required
              htmlFor={"phone"}
              error={errors?.phone?.message || ""}
              {...register("phone", {
                required: "Xin mời nhập số điện thoại",
                pattern: {
                  value: REGEX.phone,
                  message: "Chưa đúng định dạng số điện thoại",
                },
              })}
            />
          </div>
          <div className="col-sm-6">
            <FormItem
              label={"Ngày sinh"}
              required
              type="date"
              htmlFor={"date"}
              error={errors?.birthday?.message || ""}
              {...register("birthday", {
                required: "Hãy chọn ngày sinh",
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              rules={{
                required: "Hãy chọn tỉnh/thành của bạn",
              }}
              control={control}
              render={({ formState: { errors } }) => (
                <>
                  <CustomSelect
                    autoComplete="dontshow"
                    showSearch
                    value={provinceId}
                    placeholder="Please select Province/City"
                    optionFilterProp="children"
                    onChange={_onProvinceChange}
                    options={provinces}
                    filterOption={(input, option) => {
                      return removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()));
                    }}
                  />
                  <p className="form-error" style={{ minHeight: 23 }}>
                    {errors?.province?.message}
                  </p>
                </>
              )}
            />
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              rules={{
                required: "Hãy chọn quận của bạn",
              }}
              control={control}
              render={({ formState: { errors } }) => (
                <>
                  <CustomSelect
                    autoComplete="dontshow"
                    showSearch
                    value={districtId}
                    placeholder="Please select District/Town"
                    optionFilterProp="children"
                    onChange={_onDistrictChange}
                    options={districts}
                    filterOption={(input, option) => {
                      return removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()));
                    }}
                  />
                  <p className="form-error" style={{ minHeight: 23 }}>
                    {errors?.district?.message}
                  </p>
                </>
              )}
            />
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              rules={{
                required: "Hãy chọn phường của bạn",
              }}
              control={control}
              render={({ formState: { errors } }) => (
                <>
                  <CustomSelect
                    autoComplete="dontshow"
                    showSearch
                    value={wardId}
                    placeholder="Please select Ward"
                    optionFilterProp="children"
                    onChange={_onWardChange}
                    options={wards}
                    filterOption={(input, option) => {
                      return removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()));
                    }}
                  />
                  <p className="form-error" style={{ minHeight: 23 }}>
                    {errors?.ward?.message}
                  </p>
                </>
              )}
            />
          </div>
        </div>
        <FormItem
          label={"Street address"}
          required
          htmlFor={"street"}
          error={errors?.street?.message || ""}
          {...register("street", {
            required: "Hãy nhập địa chỉ",
          })}
        />

        <button className="btn btn-outline-primary-2" style={{ marginTop: 10 }}>
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default FormAccount;
