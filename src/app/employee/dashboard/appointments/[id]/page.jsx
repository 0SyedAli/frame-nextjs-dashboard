"use client";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { GrShieldSecurity } from "react-icons/gr";

const AppointmentsDetails = () => {
  const [note, setNote] = useState("");

  const appointments = [
    {
      date: "Sep '23",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      date: "May '24",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    },
    {
      date: "Nov '24",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    },
    {
      date: "Nov '24",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    },
  ];

  return (
    <div className=" container pb-5">
      <div
        className="appointments-details-main card shadow-lg border-0 rounded-5 p-3"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <div className="card-body p-4">
          <div className="row g-4">
            {/* Left Column - Service Image and Details */}
            <div className="col-md-6 shadow-lg rounded-5 p-0">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop"
                  alt="Hair Service"
                  className="rounded-5 w-100"
                  style={{ objectFit: "cover", height: 250 }}
                />
              </div>

              <div className="p-3">
                <h4 className=" mb-3 appointment-card-label">Non-surgical</h4>
                <h4 className="mb-3 appointment-card-title">Hair Service 1</h4>
                <p className="text-muted small mb-3 appointment-card-para">
                  Curabitur blandit tempus porttitor. Nullam quis risus eget
                  urna mollis ornare vel eu leo. Sed posuere consectetur est at
                  lobortis.
                </p>
                <p className="text-muted small mb-3 appointment-card-bottom">
                  Emily Ross - Stylist
                </p>
              </div>
            </div>

            {/* Right Column - Provider Info and Actions */}
            <div className="col-md-6 ps-5">
              <div className="d-flex align-items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop"
                  alt="Emma Wilson"
                  className="rounded-0 me-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h5 className="mb-0 fw-bold appointment-right-name">
                    Emma Wilson
                  </h5>
                </div>
              </div>

              <p className="mb-4 mt-3 appointment-right-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="mb-2 d-flex align-items-center gap-1 appointment-right-service">
                <GrShieldSecurity />
                <span className="small">Hircut Service</span>
              </div>

              <div className="mb-3 d-flex align-items-center gap-1 appointment-right-service">
                <CiClock2 />
                <span className="small">
                  11:30 AM <span className="fw-bold ms-2">PAID</span>
                </span>
              </div>

              <div className="d-flex gap-3 mb-4">
                <button className="text-white flex-grow-1 rounded-3 appointment-right-btn">
                  MORE INFO
                </button>
                <div className="dropdown flex-grow-1">
                  <button
                    className="text-white dropdown-toggle w-100 rounded-3 appointment-right-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    STATUS UPDATE
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Confirmed
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Pending
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Cancelled
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                className="w-100 mb-4 rounded-3 appointment-right-btn-outline"
              >
                BACK TO CALENDAR
              </button>
            </div>
          </div>

          {/* Appointments Timeline */}
          <div className="mt-4 pt-4">
            <div className="d-flex gap-3 align-items-start justify-content-start flex-wrap">
              {appointments.map((apt, index) => (
                <div key={index} className="text-center">
                  <img
                    src={apt.image || "/placeholder.svg"}
                    alt={`Appointment ${apt.date}`}
                    className="rounded-4 mb-2"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="small text-muted">{apt.date}</div>
                </div>
              ))}
              <div className="text-center">
                <button
                  className="btn btn-outline-secondary rounded-4 d-flex align-items-center justify-content-center"
                  style={{ width: "150px", height: "150px" }}
                >
                  <AiOutlinePlusCircle size={40} />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-4">
            <h6 className="fw-bold mb-3">Notes</h6>
            <div className="position-relative">
              <textarea
                className="form-control rounded-4"
                rows={8}
                placeholder="write a note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ resize: "none", borderColor: "#777777" }}
              />
              <button
                className="btn btn-sm text-white position-absolute bottom-0 end-0 m-3"
                style={{ backgroundColor: "#A83F98" }}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDetails;
