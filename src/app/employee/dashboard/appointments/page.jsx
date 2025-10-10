"use client";
import React, { useEffect } from "react";
import MyCalender from "@/components/MyCalender";
import MyModal from "@/components/MyModal";
import { useState } from "react";
import { RxCaretSort, RxCross2 } from "react-icons/rx";
import axios from "axios";
import AuthGuard from "@/components/AuthGuard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const [stylistId, setStylistId] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("emp_data"));

    if (user) {
      setStylistId(user?.id || user?._id);
    }
  }, [pathname]);

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

  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllAppointments?stylistId=${stylistId}`
      );
      setLoading(true);
      setAppointments(response.data.data || []); // Update employees state
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (stylistId) {
        await fetchAllAppointments();
      }
    })();
  }, [pathname, stylistId]);

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
          </div>
          <div className="col-9">
            <MyCalender />
          </div>
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
