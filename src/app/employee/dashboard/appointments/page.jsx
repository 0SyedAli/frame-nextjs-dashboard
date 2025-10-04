"use client";
import React, { useEffect } from "react";
import MyCalender from "@/components/MyCalender";
import MyModal from "@/components/MyModal";
import { useState } from "react";
import { RxCaretSort, RxCross2 } from "react-icons/rx";
import axios from "axios";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LeaveRequestModal from "@/components/Modals/LeaveModal";

const AppointmentCheckBox = ({ color, text }) => {
  return (
    <div className="d-flex align-items-center gap-4 appointments-calender-box-main">
      <div
        className="appointments-calender-box"
        style={{ backgroundColor: color || "#fff" }}
      />
      <p className="mb-0">{text}</p>
    </div>
  );
};

const Appointment = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitLeave = (leaveData) => {
    console.log("Leave submitted:", leaveData);
    // Here you can make API calls to submit the leave request
    // Example:
    // axios.post('/api/leave-requests', leaveData)
    //   .then(response => {
    //     console.log('Leave request submitted successfully');
    //   })
    //   .catch(error => {
    //     console.error('Error submitting leave request:', error);
    //   });
  };
  return (
    <>
      <div style={{ margin: "20px", width: "100%" }} className="pt-5">
        <div className="cal_container row align-items-start">
          <button
            className="btn add_appointment"
            onClick={() => setShowModal(true)}
          >
            LEAVE REQUEST
          </button>
          <div className="col-3">
            <div className="time_slot">
              <h3>Time Slot</h3>
              <div className="d-flex flex-column gap-3 mt-4">
                <AppointmentCheckBox color={"#F5B7CA"} text={"Booked"} />
                <AppointmentCheckBox text={"Available"} />
                <AppointmentCheckBox color={"#A83F98"} text={"Waitlist"} />
              </div>
            </div>
            {/* <div className="stylist">
              <h3>Stylists</h3>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="Booked"
                />
                <label className="form-check-label" htmlFor="Booked">
                  Sara Jackal
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="Available"
                />
                <label className="form-check-label" htmlFor="Available">
                  June Smith
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="Available"
                />
                <label className="form-check-label" htmlFor="Available">
                  Mark William
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="Available"
                />
                <label className="form-check-label" htmlFor="Available">
                  Abby Jin
                </label>
              </div>
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="Available"
                />
                <label className="form-check-label" htmlFor="Available">
                  Jack Banner
                </label>
              </div>
            </div> */}
          </div>
          <div className="col-9">
            <MyCalender />
          </div>
          {/* <div className="col-12">
                        <div className="dr_head">
                            <h5>Appointments</h5>
                            <Link href="/" className="dr_btn">View All</Link>
                        </div>
                        <div className="dr_table">
                            <div className="pt-2 dash_list page">
                                <div className="table-responsive">
                                    <table className="table caption-top">
                                        <thead>
                                            <tr className="borderless">
                                                <th scope="col">Customer ID <span><RxCaretSort /></span></th>
                                                <th scope="col">Name <span><RxCaretSort /></span></th>
                                                <th scope="col">Date & Time <span><RxCaretSort /></span></th>
                                                <th scope="col">Treatment <span><RxCaretSort /></span></th>
                                                <th scope="col">Status <span><RxCaretSort /></span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((order, index) => {
                                                const serviceTitles = order?.services?.map((serviceId) => {
                                                        const service = subservices.find((s) => s._id === serviceId);
                                                        return service ? service?.title : "Unknown Service";
                                                    })
                                                    .join(", "); 

                                                return (
                                                    <tr key={index}>
                                                        <td scope="row">{order?._id}</td>
                                                        <td className="user_td">{order?.clientName}</td>
                                                        <td>{`${order?.date} ${order?.timeSlot}`}</td>
                                                        <td>{serviceTitles}</td> 
                                                        <td className={`status_td ${order?.status.toLowerCase()}`}>
                                                            <span>{order?.status}</span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
      {/* Leave Request Modal */}
      <LeaveRequestModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSubmitLeave}
        title="Request for leave"
        buttonText="Submit Request"
      />
    </>
  );
};

export default Appointment;
