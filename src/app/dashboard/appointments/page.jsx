"use client"
import React, { useEffect } from 'react';
import MyCalender from '@/components/MyCalender';
import MyModal from '@/components/MyModal';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import axios from 'axios';
import AuthGuard from '@/components/AuthGuard';
import { showErrorToast } from '@/lib/toast';

const Appointment = () => {
    const [activeSlot, setActiveSlot] = useState("");
    const [services, setServices] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]); // Initialize as an empty array
    const [serviceId, setServiceId] = useState(null); // Initialize as an empty array
    const [employeeId, setEmployeeId] = useState(null); // Initialize as an empty array
    const adminId = useSelector((state) => state.auth.user?._id || "");

    const [clientName, setClientName] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");

    const handleSlotClick = (slot) => {
        setActiveSlot(slot);
        setTimeSlot(slot);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            userId: "67e1a32982124b9a6a749882", // Replace with dynamic userId
            adminId: adminId, // Replace with dynamic adminId
            clientName,
            date,
            services: [serviceId], // Adjust for multiple selections if needed
            stylist: employeeId,
            timeSlot,
            price,
            notes,
            createdByModel: "Admin",
            createdBy: adminId, // Replace with dynamic createdBy
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addAppointment`, requestBody);
            console.log("Appointment added successfully:", response.data);
            closeModal(); // Close modal after successful submission
        } catch (error) {
            console.error("Error adding appointment:", error);
        }
    };




    // const handleSlotClick = (slot) => {
    //     setActiveSlot(slot);
    // };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (adminId) {
            // Fetch services and employees once adminId is available
            console.log("aa");

            setLoading(true);
            const timer = setTimeout(() => {
                fetchServices();
                fetchEmployees();
            }, 1000);
            return () => clearTimeout(timer); // Clean up timeout on component unmount
        }
    }, [adminId]); // Runs when adminId changes

    const fetchServices = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServicesByAdminId?adminId=${adminId}`
            );
            setServices(response.data.data || []); // Update services state
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllEmployees?adminId=${adminId}`
            );
            setEmployees(response.data.data || []); // Update employees state
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <MyModal isOpen={isModalOpen} onClose={closeModal} myModalContent="add_appointment_modal">
                <div className="apm_container">
                    <div className="apm_head">
                        <h3>Add an Appointment</h3>
                        <button onClick={closeModal}>
                            <RxCross2 />
                        </button>
                    </div>
                    <form className="amp_body" onSubmit={handleSubmit}>
                        <div className="amp_field">
                            <label>Client Name</label>
                            <input
                                type="text"
                                placeholder="Enter client name"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="amp_field">
                            <label>Select Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="amp_field">
                            <label>Select Services</label>
                            <select
                                value={serviceId}
                                required
                                onChange={(e) => setServiceId(e.target.value)}
                            >
                                <option value="">Select Service Type</option>
                                {services.map((service, index) => (
                                    <option key={index} value={service._id}>
                                        {service.Title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="amp_field">
                            <label>Select Stylist</label>
                            <select
                                value={employeeId}
                                required
                                onChange={(e) => setEmployeeId(e.target.value)}
                            >
                                <option value="">Select Stylish</option>
                                {employees.map((employee, index) => (
                                    <option key={index} value={employee._id}>
                                        {employee.employeeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="amp_field mb-1">
                            <label>Select from available time slots</label>
                            <div className="af_time_slot">
                                {[
                                    "9:00 AM",
                                    "10:00 AM",
                                    "12:00 PM",
                                    "3:00 PM",
                                    "3:30 PM",
                                    "4:00 PM",
                                    "4:30 PM",
                                    "5:00 PM",
                                ].map((slot) => (
                                    <div
                                        key={slot}
                                        className={`ats ${activeSlot === slot ? "active" : ""}`}
                                        onClick={() => handleSlotClick(slot)}
                                    >
                                        {slot}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="amp_field">
                            <label>Notes</label>
                            <textarea
                                placeholder="Additional notes"
                                rows="6"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="amp_field">
                            <label>Estimated Price</label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="amp_field">
                            <button type="submit">ADD APPOINTMENT</button>
                        </div>
                    </form>
                </div>
            </MyModal>
            <div style={{ margin: '20px', width: "100%" }}>
                <div className="cal_container row align-items-center">
                    <button className="btn add_appointment" onClick={openModal}>ADD APPOINTMENT</button>
                    <div className='col-3'>
                        <div className="time_slot">
                            <h3>Time Slot</h3>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox" value="" id="Booked" />
                                <label class="form-check-label" htmlFor="Booked">
                                    Booked
                                </label>
                            </div>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox" value="" id="Available" />
                                <label class="form-check-label" htmlFor="Available">
                                    Available
                                </label>
                            </div>
                        </div>
                        <div className="stylist">
                            <h3>Stylists</h3>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox" value="" id="Booked" />
                                <label class="form-check-label" htmlFor="Booked">
                                    Sara Jackal
                                </label>
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input" type="checkbox" value="" id="Available" />
                                <label class="form-check-label" htmlFor="Available">
                                    June Smith
                                </label>
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input" type="checkbox" value="" id="Available" />
                                <label class="form-check-label" htmlFor="Available">
                                    Mark William
                                </label>
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input" type="checkbox" value="" id="Available" />
                                <label class="form-check-label" htmlFor="Available">
                                    Abby Jin
                                </label>
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input" type="checkbox" value="" id="Available" />
                                <label class="form-check-label" htmlFor="Available">
                                    Jack Banner
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <MyCalender />
                    </div>
                </div>
            </div>
        </>

    );
};

const ProtectedAppointmentDashboard = () => (
    <AuthGuard>
        <Appointment />
    </AuthGuard>
);

export default ProtectedAppointmentDashboard;
