import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-1 px-0 bg-dark">
          <div className="dashboard-sidebar d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* <Link to="/dashboard" className="dashboard-logo"> */}
            <span className="fs-5 fw-bolder">Menu</span>
            {/* </Link> */}
            <ul className="nav flex-column mb-sm-auto mb-0 mt-3">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link px-0 allign-middle">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 allign-middle "
                >
                  <i className="bi bi-people me-2"></i>
                  Manage Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 allign-middle"
                >
                  <i className="bi bi-columns me-2"></i>
                  Category
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 allign-middle "
                >
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/dashboard/logout"
                  className="nav-link px-0 allign-middle"
                >
                  <i className="bi bi-power me-2"></i>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0 ">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
