"use client";

import { useState, useEffect } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import { FaRegClock, FaShoppingBag } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import StatsCard from "@/components/Cards/StatsCard";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://predemo.site/FramieBackend/api/admin/getAllAppointments?stylistId=67be02ceede6d286fa26ed91"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      if (data.success) {
        setAppointments(data.data);
      } else {
        throw new Error(data.msg || "Failed to fetch appointments");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "badge rounded-pill px-3 py-2 fw-medium";
    switch (status) {
      case "Completed":
        return `${baseClasses} text-white bg-success`;
      case "In-Progress":
        return `${baseClasses} text-dark bg-warning`;
      case "Pending":
        return `${baseClasses} text-white bg-secondary`;
      default:
        return `${baseClasses} bg-light text-dark`;
    }
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    const date = new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day)
    );
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const stats = {
    scheduled: appointments.length,
    pending: appointments.filter((apt) => apt.status === "Pending").length,
    totalCustomers: 0,
    newCustomers: 0,
    daysWorked: 0,
    leaveRequested: 0,
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger"
            onClick={fetchAppointments}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid pb-5"
      // style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Stats Cards */}
      <div className="dash_top_header">
        <div className="emp_top2">
          <Image
            src="/images/unknown_user.jpg"
            width={100}
            height={100}
            alt=""
          />
          <div>
            <h3>Name: Ann Merry</h3>
            <p>Employee ID: DB-001</p>
            <h5>Designation: Hair Stylist</h5>
          </div>
        </div>
      </div>
      <div className="employee_dashboard2">
        <div className="row g-4 mb-5">
          <StatsCard
            icon={<BsPersonCircle />}
            statsMainHeading={"Appts Scheduled"}
            footerLeftSideHeading={"Completed"}
            footerLeftSideCount={"35"}
            footerRightSideHeading={"Pending"}
            footerRightSideCount={"06"}
          />
          <StatsCard
            icon={<HiOutlineUsers />}
            statsMainHeading={"Customers"}
            footerLeftSideHeading={"Total Customers"}
            footerLeftSideCount={"0"}
            footerRightSideHeading={"New Customers"}
            footerRightSideCount={"0"}
          />
          <StatsCard
            icon={<FaShoppingBag />}
            statsMainHeading={"Days Worked"}
            footerLeftSideHeading={"Days Worked"}
            footerLeftSideCount={"0"}
            footerRightSideHeading={"Leave Requested"}
            footerRightSideCount={"0"}
          />
        </div>

        {/* Appointments Table */}
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "20px" }}
        >
          <div
            className="card-header bg-white border-0 py-4"
            style={{ borderRadius: "20px 20px 0 0" }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
              <div>
                <h4 className="mb-1 fw-bold text-dark">Appointments</h4>
                <p className="text-muted mb-0 small">
                  Manage and track all your appointments
                </p>
              </div>
              {/* <div className="d-flex flex-column flex-sm-row gap-2">
              <select
                className="form-select form-select-sm border-0 shadow-sm"
                style={{ minWidth: "120px", borderRadius: "12px" }}
              >
                <option>NEWEST</option>
                <option>OLDEST</option>
              </select>
              <select
                className="form-select form-select-sm border-0 shadow-sm"
                style={{ minWidth: "140px", borderRadius: "12px" }}
              >
                <option>THIS WEEK</option>
                <option>THIS MONTH</option>
              </select>
            </div> */}
            </div>
          </div>

          <div className="card-body ">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    {/* <th className="border-0 py-4 ps-4" style={{ width: "50px" }}>
                    <input type="checkbox" className="form-check-input" style={{ borderRadius: "6px" }} />
                  </th> */}
                    <th
                      className="border-0 py-4 text-muted fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="d-flex align-items-center">
                        Customer Name
                        <i
                          className="bi bi-chevron-down ms-2 text-muted"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </div>
                    </th>
                    <th
                      className="border-0 py-4 text-muted fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="d-flex align-items-center">
                        Service Date
                        <i
                          className="bi bi-chevron-down ms-2 text-muted"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </div>
                    </th>
                    <th
                      className="border-0 py-4 text-muted fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="d-flex align-items-center">
                        Service Type
                        <i
                          className="bi bi-chevron-down ms-2 text-muted"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </div>
                    </th>
                    <th
                      className="border-0 py-4 text-muted fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="d-flex align-items-center">
                        Customer ID
                        <i
                          className="bi bi-chevron-down ms-2 text-muted"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </div>
                    </th>
                    <th
                      className="border-0 py-4 text-muted fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      <div className="d-flex align-items-center">
                        Status
                        <i
                          className="bi bi-chevron-down ms-2 text-muted"
                          style={{ fontSize: "12px" }}
                        ></i>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointments.map((appointment, index) => (
                    <tr
                      key={appointment._id}
                      className="border-0"
                      style={{ borderBottom: "1px solid #f1f3f4" }}
                    >
                      {/* <td className="py-4 ps-4">
                      <input type="checkbox" className="form-check-input" style={{ borderRadius: "6px" }} />
                    </td> */}
                      <td className="py-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {appointment.clientName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div
                              className="fw-semibold text-dark"
                              style={{ fontSize: "15px" }}
                            >
                              {appointment.clientName}
                            </div>
                            <small className="text-muted">Customer</small>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div
                          className="fw-medium text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          {formatDate(appointment.date)}
                        </div>
                        <small className="text-muted">
                          {appointment.timeSlot}
                        </small>
                      </td>
                      <td className="py-4">
                        <div
                          className="fw-medium text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          Home Delivery
                        </div>
                        <small className="text-muted">Service</small>
                      </td>
                      <td className="py-4">
                        <div className="d-flex align-items-center">
                          <span
                            className="fw-medium text-dark me-2"
                            style={{ fontSize: "14px" }}
                          >
                            9348jj73
                          </span>
                          <button
                            className="btn btn-sm btn-outline-secondary border-0 p-1"
                            style={{ borderRadius: "6px" }}
                          >
                            <i
                              className="bi bi-copy"
                              style={{ fontSize: "12px" }}
                            ></i>
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={getStatusBadge(appointment.status)}
                          style={{ fontSize: "12px" }}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center p-4 border-top">
                <div className="text-muted small">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, appointments.length)} of{" "}
                  {appointments.length} appointments
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link border-0 rounded-pill me-1"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ padding: "8px 12px" }}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                        >
                          <button
                            className={`page-link border-0 rounded-pill mx-1 ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "text-dark"
                            }`}
                            onClick={() => handlePageChange(page)}
                            style={{ padding: "8px 12px", minWidth: "40px" }}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link border-0 rounded-pill ms-1"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ padding: "8px 12px" }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
