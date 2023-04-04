import React from "react";
import { Link } from "react-router-dom";

export default function HeaderForReports() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary d-flex justify-content-around p-3">
      <div className="navbar-nav mr-auto">
        <Link to="/" className="text-light mainText ">
          Interviews Reports
        </Link>
      </div>
      <div className="d-flex gap-3">
        <Link to={"/reports"} className="btn btn-outline-light ">
          Reports
        </Link>
        <Link to={"/reports/create"} className="btn btn-outline-light">
          Create Report
        </Link>
      </div>
    </nav>
  );
}
