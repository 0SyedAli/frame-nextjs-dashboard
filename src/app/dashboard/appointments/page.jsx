"use client"
import React, { useEffect } from 'react';
import MyCalender from '@/components/MyCalender';
import MyModal from '@/components/MyModal';
import { useState } from 'react';
import { RxCaretSort, RxCross2 } from "react-icons/rx";
import axios from 'axios';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Appointment = () => {
    const [activeSlot, setActiveSlot] = useState("");
    const [services, setServices] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [employees, setEmployees] = useState([]); // Initialize as an empty array
    const [appointments, setAppointments] = useState([]); // Initialize as an empty array
    const [subservices, setSubservices] = useState([]); // Initialize as an empty array
    const [serviceId, setServiceId] = useState(null); // Initialize as an empty array
    const [employeeId, setEmployeeId] = useState(null); // Initialize as an empty array
    const [adminId, setadminId] = useState(null);
    const [token, setToken] = useState(null);
    const [clientName, setClientName] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || (!user.id && !user._id)) {
            router.push("/auth/signin");
        } else {
            setadminId(user.id || user._id);
            setToken(token);
        }
    }, [router]);

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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (adminId) {
            setLoading(true);
            const timer = setTimeout(() => {
                fetchServices();
                fetchEmployees();
                fetchAllAppointments();
                fetchAllSubServices();
            }, 1000);
            return () => clearTimeout(timer); // Clean up timeout on component unmount
        }
    }, [adminId]); // Runs when adminId changes

    const fetchServices = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServices?adminId=${adminId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
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
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllStylists?adminId=${adminId}`
            );
            setEmployees(response.data.data || []); // Update employees state
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const fetchAllAppointments = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllAppointments?adminId=${adminId}`
            );
            setLoading2(true)
            setAppointments(response.data.data || []); // Update employees state
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading2(false); // Stop loading
        }
    };
    const fetchAllSubServices = async () => {
        try {
            const response = await axios.get(
               `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllSubServices?adminId=${adminId}`,
            );
            setSubservices(response.data.data || []); // Update employees state
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    if (loading2) {
        return <div>Loading...</div>; // Loading state
    }
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
                                        {employee.stylistName}
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
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" value="" id="Booked" />
                                <label className="form-check-label" htmlFor="Booked">
                                    Booked
                                </label>
                            </div>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" value="" id="Available" />
                                <label className="form-check-label" htmlFor="Available">
                                    Available
                                </label>
                            </div>
                        </div>
                        <div className="stylist">
                            <h3>Stylists</h3>
                            <div className="form-check mt-3">
                                <input className="form-check-input" type="checkbox" value="" id="Booked" />
                                <label className="form-check-label" htmlFor="Booked">
                                    Sara Jackal
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="Available" />
                                <label className="form-check-label" htmlFor="Available">
                                    June Smith
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="Available" />
                                <label className="form-check-label" htmlFor="Available">
                                    Mark William
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="Available" />
                                <label className="form-check-label" htmlFor="Available">
                                    Abby Jin
                                </label>
                            </div>
                            <div className="form-check mt-2">
                                <input className="form-check-input" type="checkbox" value="" id="Available" />
                                <label className="form-check-label" htmlFor="Available">
                                    Jack Banner
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-9'>
                        <MyCalender />
                    </div>
                    <div className="col-12">
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
                                                // Map service IDs to their titles
                                                const serviceTitles = order?.services?.map((serviceId) => {
                                                        const service = subservices.find((s) => s._id === serviceId);
                                                        return service ? service?.title : "Unknown Service";
                                                    })
                                                    .join(", "); // Join multiple service titles with a comma

                                                return (
                                                    <tr key={index}>
                                                        <td scope="row">{order?._id}</td>
                                                        <td className="user_td">{order?.clientName}</td>
                                                        <td>{`${order?.date} ${order?.timeSlot}`}</td>
                                                        <td>{serviceTitles}</td> {/* Display service titles here */}
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
                        {/* <div className="text-end pt-3">
                            <button className="btn det_ins">DETAILED INSIGHTS</button>
                        </div> */}
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
