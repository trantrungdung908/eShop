import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/constants/path";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavAccount from "./components/NavAccount";

const DashBoardPage = () => {
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item isActive>My Account</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <NavAccount />
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardPage;
