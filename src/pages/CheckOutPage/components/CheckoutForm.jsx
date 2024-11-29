import FormItem from "@/components/Form";
import { PAYMENT_METHOD } from "@/constants/general";
import { PATHS } from "@/constants/path";
import { REGEX } from "@/constants/regex";
import useAddress from "@/hooks/useAddress";
import { removeAccents } from "@/utils/format";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.form`
  .form-group {
    margin: 0;
  }
`;

const CustomSelect = styled(Select)`
  display: flex;
  height: 40px;
  margin-bottom: 13px;
`;

const CheckoutForm = ({ handleCheckout }) => {
  const { profile } = useSelector((state) => state.authReducer);
  const { cartInfo } = useSelector((state) => state.cartReducer);
  const { firstName, phone, email, province, district, ward, street } =
    profile || {};

  const {
    product,
    subTotal,
    shipping,
    total,
    quantity,
    variant,
    totalProduct,
  } = cartInfo || {};

  const renderProductInfo =
    product?.map((item, index) => ({
      ...item,
      quantity: quantity?.[index],
      variant: variant?.[index],
      totalProduct: totalProduct?.[index],
    })) || [];

  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(
    PAYMENT_METHOD.cash
  );

  const isCash = currentPaymentMethod === PAYMENT_METHOD.cash;
  const isCard = currentPaymentMethod === PAYMENT_METHOD.card;

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
  } = useForm({
    defaultValues: {
      firstName,
      phone,
      email,
      province,
      district,
      ward,
      street,
    },
  });

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
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

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

  const _onSubmit = async (data) => {
    if (!data || !shipping?.typeShip || !currentPaymentMethod) return;
    handleCheckout?.({
      formInfo: {
        ...data,
        province: provinces?.find((item) => item.value === provinceId),
        district: districts?.find((item) => item.value === districtId),
        ward: wards?.find((item) => item.value === wardId),
        paymentMethod: currentPaymentMethod,
      },
      cartInfo,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(_onSubmit)} className="checkout-form">
      <div className="row">
        <div className="col-lg-9">
          <h2 className="checkout-title">Billing Details</h2>
          <div className="row">
            <div className="col-sm-4">
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
            <div className="col-sm-4">
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
            <div className="col-sm-4">
              <FormItem
                disabled
                label={"Email address"}
                required
                {...register("email")}
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

          <FormItem
            label={"Order notes (optional)"}
            htmlFor={"ordernote"}
            renderInput={(inputProps) => {
              return (
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  defaultValue={""}
                  {...inputProps}
                  {...register("note")}
                />
              );
            }}
          />
        </div>
        <aside className="col-lg-3">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>
            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {renderProductInfo?.map((product, index) => {
                  const { name, quantity, price, totalProduct, id } =
                    product || {};
                  return (
                    <tr key={id + index}>
                      <td>
                        <a href="#">{name}</a>
                        <p>
                          {quantity}x ${price}
                        </p>
                      </td>
                      <td>${totalProduct}</td>
                    </tr>
                  );
                })}

                <tr className="summary-subtotal">
                  <td>Subtotal:</td>
                  <td>${subTotal}</td>
                </tr>
                {shipping ? (
                  <tr>
                    <td>Shipping:</td>
                    <td>
                      {shipping?.typeShip} - ${shipping?.price}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>Shipping:</td>
                    <td>
                      <Link to={PATHS.CART}>Select Shipping</Link>
                    </td>
                  </tr>
                )}
                <tr className="summary-total">
                  <td>Total:</td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
            <div className="accordion-summary" id="accordion-payment">
              <div className="card">
                <div
                  className="card-header"
                  id="heading-1"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.card)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a
                      role="button"
                      className={`${!isCard ? "collapsed" : ""}  `}
                    >
                      Direct bank transfer
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-1"
                  className={`collapse ${isCard ? "show " : ""}`}
                  aria-labelledby="heading-1"
                  data-parent="#accordion-payment"
                >
                  <div className="card-body">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  className="card-header"
                  id="heading-3"
                  onClick={() => setCurrentPaymentMethod(PAYMENT_METHOD.cash)}
                  style={{ cursor: "pointer" }}
                >
                  <h2 className="card-title">
                    <a
                      className={`${!isCash ? "collapsed" : ""}  `}
                      role="button"
                    >
                      {" "}
                      Cash on delivery
                    </a>
                  </h2>
                </div>
                <div
                  id="collapse-3"
                  className={`collapse ${isCash ? "show " : ""}`}
                  aria-labelledby="heading-3"
                  data-parent="#accordion-payment"
                >
                  <div className="card-body">
                    Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit. Donec odio. Quisque volutpat
                    mattis eros.
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary-2 btn-order btn-block"
            >
              <span className="btn-text">Place Order</span>
              <span className="btn-hover-text">Proceed to Checkout</span>
            </button>
          </div>
        </aside>
      </div>
    </FormContainer>
  );
};

export default CheckoutForm;
