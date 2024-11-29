import { PATHS } from "@/constants/path";
import useQuery from "@/hooks/useQuery";
import { authService } from "@/services/authService";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddressAccount = () => {
  const { profile } = useSelector((state) => state.authReducer);

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    province,
    district,
    ward,
    street,
  } = profile || {};

  const { data: provinceData } = useQuery(
    () => authService.getProviceById(province),
    [province]
  );

  const { data: districtData } = useQuery(
    () => authService.getDataDistrictById(district),
    [district]
  );
  const { data: wardData } = useQuery(
    () => authService.getDataWardById(ward),
    [ward]
  );

  const address = !!province
    ? `${street}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`
    : "No address";
  return (
    <div
      className="tab-pane fade show active"
      id="tab-address"
      role="tabpanel"
      aria-labelledby="tab-address-link"
    >
      <p>
        The following addresses will be used on the checkout page by default.
      </p>
      <div className="row">
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Billing Address</h3>
              <p>
                <strong>Fullname:</strong> {firstName + lastName || ""} <br />
                <strong>Email:</strong> {email || ""} <br />
                <strong>Phone number:</strong> {phone || ""} <br />
                <br />
                <Link to={PATHS.PROFILE.INDEX}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-dashboard">
            <div className="card-body">
              <h3 className="card-title">Shipping Address</h3>
              <p>
                {address} <br />
                <br />
                <Link to={PATHS.PROFILE.INDEX}>
                  Edit <i className="icon-edit" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressAccount;
