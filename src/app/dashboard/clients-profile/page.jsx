"use client";
import MyModal from "@/components/MyModal";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GrThreeDEffects } from "react-icons/gr";
import { RiSecurePaymentFill } from "react-icons/ri";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";

const ClientsProfile = () => {
    // const adminId = useSelector((state) => state.auth.user?._id || "");
    // const token = useSelector((state) => state.auth.token || "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clientProfiles, setClientProfiles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [services, setSubServices] = useState([]);
    const [appointDetail, setAppointDetail] = useState([]);
    const [userId, setUserId] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [adminId, setadminId] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter()

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user && (!user?.id || !user?._id) && !storedToken) {
            router.push('/auth/signin')
        }
        else {
            setadminId(user?.id || user?._id)
            setToken(storedToken)
        }
    }, [])

    const addStylist = async () => {
        if (!selectedEmployee) {
            alert("Please select an employee.");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addStylist?userId=${userId}&employeeId=${selectedEmployee}`
            );
            if (response.data.success) {
                alert("Stylist added successfully!");
                router.push('/dashboard/clients-profile')
            } else {
                alert("Failed to add stylist: " + response.data.message);
            }
        } catch (error) {
            console.error("Error adding stylist:", error);
        } finally {
            setSelectedEmployee(null); // Reset the selection
            setIsSubModalOpen(false)
        }
    };


    // Add note API call
    const addNote = async () => {
        if (!noteText.trim()) {
            alert("Please write a note before adding."); // Prevent empty submissions
            return;
        }

        const noteData = {
            userId,
            notes: [
                {
                    text: noteText,
                    date: new Date().toLocaleDateString("en-GB"), // Format: DD-MM-YYYY
                },
            ],
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addNotes`,
                noteData
            );
            if (response.data.sucess) {
                alert("Note added successfully!");
                //  // Clear the textarea after successful submission
            } else {
                alert("Failed to add note: " + response.data.message);
            }
        } catch (error) {
            console.error("Error adding note:", error);
            alert("An error occurred while adding the note.");
        } finally {
            setNoteText("");
            setIsModalOpen(false)
        }
    };


    const openModal = (id) => {
        setUserId(id);
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
        // setAppointDetail([]); // Clear appointment details
        // setSubServices([]); // Clear data when modal is closed
    }

    const openSubModal = (id) => {
        setIsSubModalOpen(true)
    }
    const closeSubModal = () => {
        setIsSubModalOpen(false)
    }

    useEffect(() => {
        if (!adminId || !token) {
            console.error("Missing adminId or token.");
            return;
        }
        fetchData();
    }, [adminId, token]);

    const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchClientProfiles(), fetchServices()]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClientProfiles = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/allClientProfiles?adminId=${adminId}`
            );
            if (response.data.success) {
                setClientProfiles(response.data.data || []);
            } else {
                console.error("Failed to fetch client profiles:", response.data.msg);
            }
        } catch (error) {
            console.error("Error fetching client profiles:", error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getSubServicesByAdminId`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSubServices(response.data.data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const fetchClientDetail = async () => {
        if (!userId) return;

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/clientProfile?userId=${userId}&adminId=${adminId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAppointDetail(response.data.data || []); // Ensure it's an array

        } catch (error) {
            console.error("Error fetching client details:", error);
        }
    };

    const fetchEmployees = async () => {
        if (!userId) return;
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllStylists?adminId=${adminId}`
            );

            if (response.data.success) {
                const employees = response.data.data;
                setEmployees(employees)
            } else {
                console.error("Failed to fetch employees:", response.data.msg);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    useEffect(() => {
        fetchClientDetail();
        fetchEmployees()
    }, [userId]);
    // Fetch Client Details

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!adminId || !token) {
        return <p>Loading user information...</p>;
    }
    if (!clientProfiles.length) {
        return <p>No client profiles available.</p>;
    }

    return (
        <>
            <MyModal isOpen={isModalOpen} onClose={closeModal} myModalContent="appointment_detail">
                <div className="appointment_detail2">
                    <div className="">
                        <button className="btn myModal-close" type="button" onClick={closeModal}>
                            X
                        </button>
                        {appointDetail?.previousAppointments?.length > 0 ? (
                            <>
                                <div className="row w-100 services_dash">
                                    <div className="col-6 sd_card">
                                        <div className="sd_item cp">
                                            <div className="sd_item_img">
                                                <Image
                                                    src={
                                                        appointDetail.previousAppointments[0].services[0]?.subServiceImage?.length
                                                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${appointDetail.previousAppointments[0].services[0].subServiceImage[0]}`
                                                            : ""
                                                    }
                                                    width={144}
                                                    height={144}
                                                    className="emp_img"
                                                    alt={appointDetail.previousAppointments[0].services[0]?.title || "Service Image"}
                                                />
                                            </div>
                                            <div className="sd_item_content cp">
                                                <h4>{appointDetail.previousAppointments[0].services[0]?.title || "Service Title"}</h4>
                                                <p className="mb-3">
                                                    {appointDetail.previousAppointments[0].services[0]?.text || "Description not available"}
                                                </p>
                                                <p>Price: ${appointDetail.previousAppointments[0].services[0]?.price || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 user_card">
                                        <h3>{appointDetail?.userId?.firstName + " " + appointDetail?.userId?.lastName || "User Name"}</h3>
                                        <p>{appointDetail?.userId?.firstName + " " + appointDetail?.userId?.email || "User Email"}</p>
                                        <div className="uc_fields my-3">
                                            <h4 className="d-flex align-items-center gap-2">
                                                <span><GrThreeDEffects /></span>
                                                {appointDetail.previousAppointments[0].services[0]?.title || "Service Title"}
                                            </h4>
                                        </div>
                                        <div className="billed_box">
                                            <div className="d-flex justify-content-between">
                                                <h4>Billed</h4>
                                                <h3>$75</h3>
                                                <h5>PAID</h5>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <h4 className="d-flex align-items-center gap-2 pc">
                                                    <span><RiSecurePaymentFill /></span>
                                                    Cash payment
                                                </h4>
                                                <button className="btn add_note_btn">view Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row w-100 mt-5">
                                    <div className="col-3">
                                        <div className="stylist_item">
                                            <Image
                                                src="/images/emp_img1.png"
                                                width={133}
                                                height={133}
                                                alt="s"
                                            />
                                            <h4>Sep ‘23</h4>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="stylist_item">
                                            <Image
                                                src="/images/emp_img1.png"
                                                width={133}
                                                height={133}
                                                alt="s"
                                            />
                                            <h4>Sep ‘23</h4>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="stylist_item">
                                            <Image
                                                src="/images/emp_img1.png"
                                                width={133}
                                                height={133}
                                                alt="s"
                                            />
                                            <h4>Sep ‘23</h4>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="ed_item cp ">
                                            <div className="ed_item_border" onClick={openSubModal} >
                                                <span>
                                                    <CiCirclePlus />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="notes_field w-100">
                                    <h4>Notes</h4>
                                    <textarea
                                        rows="3"
                                        placeholder="Write a note"
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)} // Update state on input change
                                    ></textarea>
                                    <div className="text-end mt-2">
                                        <button
                                            className="btn add_note_btn"
                                            onClick={addNote}
                                            disabled={!noteText.trim()} // Disable button if note is empty
                                        >
                                            Add Note
                                        </button>
                                    </div>
                                </div>
                                <div className="notes_content mt-4">
                                    {appointDetail?.notes.map((note) => (
                                        <div className="nc_item" key={note?._id}>
                                            <h5 >
                                                {note?.date}
                                            </h5>
                                            <p> {note?.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="w-100 text-center">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </MyModal>
            <MyModal isOpen={isSubModalOpen} onClose={closeSubModal} myModalContent="employee_list_modal">
                <div className="elm_container">
                    <div className="">
                        <button className="btn myModal-close" type="button" onClick={closeSubModal}>
                            X
                        </button>
                        <ul>
                            {employees.map((emp) => (
                                <li key={emp?._id || "ID"}>
                                    <input
                                        type="radio"
                                        id={emp?._id}
                                        name="employee"
                                        value={emp?._id}
                                        checked={selectedEmployee === emp?._id}
                                        onChange={() => setSelectedEmployee(emp?._id)}
                                    />
                                    <label className="elm_card_item" htmlFor={emp?._id}>
                                        <span>
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${emp?.employeeImage}`}
                                                width={100}
                                                height={100}
                                                alt={emp?.employeeName || "Employee"}
                                                priority={true}
                                            />
                                        </span>
                                        {emp?.employeeName || "Emp Name"}
                                    </label>
                                </li>
                            ))}
                            <li className="add_stylist_btn mt-2">
                                <button
                                    className="btn add_note_btn"
                                    onClick={addStylist}
                                    disabled={!selectedEmployee}
                                >
                                    Add Stylist
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </MyModal>

            <div className="w-100">
                <div className="m_tabs_main py-0">
                    <div className="client_profile">
                        <div className="cp_list">
                            {clientProfiles.map((client, index) => {
                                const visitCount = client.previousAppointments?.length || 0;
                                const lastAppointmentDate =
                                    visitCount > 0
                                        ? client.previousAppointments[visitCount - 1].date
                                        : "N/A";

                                const upcomingAppointment = (() => {
                                    const filteredAppointments = client.previousAppointments?.filter(
                                        (appointment) => ["Accepted", "Pending"].includes(appointment.status)
                                    );

                                    if (!filteredAppointments || filteredAppointments.length === 0) {
                                        return null; // No upcoming appointments
                                    }

                                    // Sort appointments by date
                                    filteredAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

                                    // Prioritize "accepted" over "pending" if dates are the same
                                    return filteredAppointments.reduce((prioritized, current) => {
                                        if (
                                            !prioritized ||
                                            (new Date(current.date) < new Date(prioritized.date)) ||
                                            (new Date(current.date).getTime() === new Date(prioritized.date).getTime() &&
                                                current.status === "Accepted")
                                        ) {
                                            return current;
                                        }
                                        return prioritized;
                                    }, null);
                                })();

                                const upcomingAppointmentDate = upcomingAppointment ? upcomingAppointment.date : "N/A";

                                return (
                                    <div key={index} className="cpl_item" onClick={() => openModal(client?.userId._id)}>
                                        <div className="d-flex align-items-center gap-3">
                                            <Image
                                                src="/images/ast_img1.png"
                                                width={64}
                                                height={60}
                                                alt="Client Avatar"
                                            />
                                            <div className="ci_title">
                                                <h5>
                                                    {client.userId?.firstName} {client.userId?.lastName}
                                                </h5>
                                                <h6>{client.userId?.email}</h6>
                                            </div>
                                        </div>
                                        <div className="ser_text">
                                            <h6>Service</h6>
                                            <h5>
                                                {(() => {
                                                    const matchedService = Array.isArray(services)
                                                        ? services.find(
                                                            (service) => service._id === client?.previousAppointments?.[0]?.services?.[0]
                                                        )
                                                        : null;
                                                    return matchedService ? matchedService.title : "N/A";
                                                })()}
                                            </h5>
                                        </div>
                                        <div className="cp_text">
                                            <h6>Total Visits</h6>
                                            <h5>{visitCount}</h5>
                                        </div>
                                        <div className="cp_text">
                                            <h6>Last Appointment</h6>
                                            <h5>{lastAppointmentDate}</h5>
                                        </div>
                                        <div className="cp_text">
                                            <h6>Upcoming Appointment</h6>
                                            <h5>{upcomingAppointmentDate}</h5>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ProtectedClientsProfileDashboard = () => (
    <AuthGuard>
        <ClientsProfile />
    </AuthGuard>
);

export default ProtectedClientsProfileDashboard;