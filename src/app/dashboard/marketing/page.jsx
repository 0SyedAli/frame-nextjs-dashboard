"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import MyModal from "@/components/MyModal";
import axios from "axios";
import { useSelector } from "react-redux";
import AuthGuard from "@/components/AuthGuard";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const Marketing = () => {
    const [active, setActive] = useState('marketing'); // Default active button
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    const [isSubModalOpen2, setIsSubModalOpen2] = useState(false);
    const [isSubModalOpen3, setIsSubModalOpen3] = useState(false);
    const [allReviews, setAllReviews] = useState(false);
    const [royalityData, setRoyalityData] = useState(false);
    const [totalServices, setTotalServices] = useState([]);
    const [subServices, setSubServices] = useState([]);
    const [subServiceId, setSubServiceId] = useState(false);
    const [bussinessPoints, setBussinessPoints] = useState(null);
    const [servicePoints, setServicePoints] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [adminId, setadminId] = useState();
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const router = useRouter();
    const openSubModal = (id) => {
        setIsSubModalOpen(true)
    }
    const closeSubModal = () => {
        setIsSubModalOpen(false)
    }
    const openSubModal2 = (id) => {
        setIsSubModalOpen2(true)
    }
    const closeSubModal2 = () => {
        setIsSubModalOpen2(false)
    }
    const openSubModal3 = (id) => {
        setIsSubModalOpen3(true)
    }
    const closeSubModal3 = () => {
        setIsSubModalOpen3(false)
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user && (!user?.id || !user?._id)) {
            router.push('/auth/signin')
        }
        else {
            setadminId(user?.id || user?._id)
        }
    }, [])

    useEffect(() => {
        if (adminId) {
            // Fetch services once adminId is available
            const timer = setTimeout(() => {
                fetchReviews();
                fetchMart();
                fetchSubServices();
                fetchTotalServices();
            }, 1000);
            return () => clearTimeout(timer); // Clean up timeout on component unmount
        }
    }, [adminId]); // Runs when adminId changes


    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/user/getAllReviews?adminId=${adminId}`
            );
            setAllReviews(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching services", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }

    const fetchMart = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/royalityDashboard?adminId=${adminId}`
            )
            setRoyalityData(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching marketing data", error);
        }
    }
    const fetchTotalServices = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/totalServices?adminId=${adminId}`
            )
            setTotalServices(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching marketing data", error);
        }
    }

    const fetchSubServices = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getSubServicesByAdmin?adminId=${adminId}`
            )
            setSubServices(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching sub services data", error);
        }
    }

    const handleBussinessPointSubmit = async (e) => {
        e.preventDefault();
        if (
            !bussinessPoints
        ) {
            alert("Please add points.");
            return;
        }


        setLoading2(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addBusinessPoints?adminId=${adminId}&points=${bussinessPoints}`
            );

            if (response?.data?.success) {
                // Clear form fields
                showSuccessToast(response?.data?.msg); //
                setIsModalOpen(false);
                setIsSubModalOpen(false);
            }
        } catch (error) {
            console.error("Subservice creation failed", error);
            showErrorToast(error.response?.data?.message || "Error adding Sub Service!");
        } finally {
            setLoading2(false);
        }
    };
    const handleServicePointSubmit = async (e) => {
        e.preventDefault();
        if (
            !servicePoints
        ) {
            alert("Please add points.");
            return;
        }

        setLoading3(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addSubservicePoints?subserviceId=${subServiceId}&points=${servicePoints}`
            );

            if (response?.data?.success) {
                // Clear form fields
                showSuccessToast(response?.data?.msg); //
                setIsModalOpen(false);
                setIsSubModalOpen2(false);
            }
        } catch (error) {
            console.error("Subservice creation failed", error);
            showErrorToast(error.response?.data?.message || "Error adding Sub Service!");
        } finally {
            setLoading3(false);
        }
    };
    const handlePointsDelete = async (e) => {
        e.preventDefault();
        setLoading4(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/deleteRoyality?adminId=${adminId}`
            );

            if (response?.data?.success) {
                // Clear form fields
                showSuccessToast(response?.data?.msg); //
            }
        } catch (error) {
            console.error("Subservice creation failed", error);
            showErrorToast(error.response?.data?.message || "Error adding Sub Service!");
        } finally {
            setLoading4(false);
        }
    };
    if (loading) {
        return <Spinner />
    }
    return (
        <>
            <MyModal isOpen={isModalOpen} onClose={closeModal} myModalContent="royality_modal">
                <div className="galary_modal2">
                    {/* <Image
                        src="/images/mg_1.png"
                        width={170}
                        height={240}
                        alt="Frame"
                        onClick={openModal}
                    />
                    <div className="gm_text">
                        <h5>Non-surgical</h5>
                        <h4>Skin Treatment - Title</h4>
                        <p>A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                        <h6>Emily Ross, David Carter</h6>
                        <button className="theme-btn6">Share</button>
                    </div> */}
                    <button onClick={closeModal} className="gm2-close-btn">
                        <RxCross2 />
                    </button>
                    <div className="gm_text">
                        <h4>Select any one:</h4>
                        <div className="d-flex align-items-center gap-3">
                            <button className="theme-btn7" onClick={openSubModal}>Add Compaign</button>
                            <button className="theme-btn7" onClick={openSubModal2}>All Campaings</button>
                            <button className="theme-btn7" onClick={openSubModal3}>Edit Compaign</button>
                        </div>
                    </div>
                </div>
            </MyModal>
            <MyModal isOpen={isSubModalOpen} onClose={closeSubModal} myModalContent="royality_modal">
                <div className="galary_modal2">
                    <button onClick={closeSubModal} className="gm2-close-btn">
                        <RxCross2 />
                    </button>
                    <form className="gm_text"
                    //  onSubmit={handleBussinessPointSubmit}
                    >
                        <h4>Add Compaign:</h4>
                        <div>
                            <label htmlFor="">Start Date:</label>
                            <input
                                type="date"
                                required
                            // value={bussinessPoints}
                            // onChange={(e) => setBussinessPoints(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">End Date:</label>
                            <input
                                type="date"
                                required
                            // value={bussinessPoints}
                            // onChange={(e) => setBussinessPoints(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Points</label>
                            <input
                                type="number"
                                placeholder="10"
                                required
                            // value={bussinessPoints}
                            // onChange={(e) => setBussinessPoints(e.target.value)}
                            />
                        </div>
                        <button className="btn royality_btn  px-5" disabled={loading2} >
                            {loading2 ? <Spinner /> : "Add"}
                        </button>
                    </form>
                </div>
            </MyModal>
            <MyModal isOpen={isSubModalOpen2} onClose={closeSubModal2} myModalContent="royality_modal">
                <div className="galary_modal2">
                    <button onClick={closeSubModal2} className="gm2-close-btn">
                        <RxCross2 />
                    </button>
                    <form className="gm_text" onSubmit={handleServicePointSubmit}>
                        <h4>All Compaigns:</h4>
                        <p style={{ fontSize: '18px', paddingTop: '10px' }}>No compaign found</p>
                    </form>
                </div>
            </MyModal>
            <MyModal isOpen={isSubModalOpen3} onClose={closeSubModal3} myModalContent="royality_modal">
                <div className="galary_modal2">
                    <button onClick={closeSubModal3} className="gm2-close-btn">
                        <RxCross2 />
                    </button>
                    <form className="gm_text"
                    //  onSubmit={handleBussinessPointSubmit}
                    >
                        <h4>Edit Compaign:</h4>
                        <div>
                            <label htmlFor="">Start Date:</label>
                            <input
                                type="date"
                                required
                            // value={bussinessPoints}
                            // onChange={(e) => setBussinessPoints(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">End Date:</label>
                            <input
                                type="date"
                                required
                            // value={bussinessPoints}
                            // onChange={(e) => setBussinessPoints(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Points</label>
                            <input
                                type="number"
                                placeholder="10"
                                required
                            // value={bussinessPoints}
                            // onChange={(e) => setBussinessPoints(e.target.value)}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <button className="btn royality_btn  px-5" disabled={loading2} >
                                {loading2 ? <Spinner /> : "Edit"}
                            </button>
                            <button className="btn royality_btn royality_btn2">
                                Pause Compaign
                            </button>
                        </div>
                    </form>
                </div>
            </MyModal>
            <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="m_tabs_menu">
                        <button
                            className={`btn ${active === 'marketing' ? 'active' : ''}`}
                            onClick={() => setActive('marketing')}
                        >
                            Marketing
                        </button>
                        <button
                            className={`btn ${active === 'allReviews' ? 'active' : ''}`}
                            onClick={() => setActive('allReviews')}
                        >
                            All Reviews
                        </button>
                        {/* <button
                            className={`btn ${active === 'gallery' ? 'active' : ''}`}
                            onClick={() => setActive('gallery')}
                        >
                            Gallery
                        </button> */}
                    </div>
                    <div className="search_input">
                        {/* <input type="search" placeholder="Search review" id="" /> */}
                    </div>
                </div>

                {active === "marketing" && royalityData && (
                    <div className="m_tabs_main">
                        <h3>Loyalty rewards</h3>
                        <p>Create ways for your customer to earn and redeem points.</p>
                        <div className="mtm_cards">
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/multi_user.png"
                                        width={39}
                                        height={21}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>{royalityData.loyalCustomer}</h4>
                                    <p>Loyalty Customers</p>
                                </div>
                            </div>
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/pp.png"
                                        width={31}
                                        height={31}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>4,421</h4>
                                    <p>Points Earned</p>
                                </div>
                            </div>
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/pp.png"
                                        width={31}
                                        height={31}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>4,421</h4>
                                    <p>Points redeemed</p>
                                </div>
                            </div>
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/calender.png"
                                        width={29}
                                        height={30}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>{royalityData.totalAppointments}</h4>
                                    <p>Total appointments</p>
                                </div>
                            </div>
                        </div>
                        <div className="mtm_performance">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Loyalty program performance</h3>
                                {/* <div className="d-flex align-items-center gap-2">
                                    <button className="btn royality_btn" onClick={openModal}>Add Points</button>
                                    <button className="btn royality_btn" onClick={openModal}>Edit Points</button>
                                    <button className="btn royality_btn" onClick={handlePointsDelete} disabled={loading4}>
                                        {loading4 ? <Spinner /> : "Delete Points"}
                                    </button>
                                </div> */}
                            </div>
                            <div className="mp_cards">
                                <div className="mp_card_item active">
                                    <h3>587</h3>
                                    <h6>Activity performance</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>587</h3>
                                    <h6>Engaged Customers</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>{royalityData.recuringCustomers}</h3>
                                    <h6>Recurring Customers</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>{royalityData.appointmentCompleted}</h3>
                                    <h6>Appointments completed</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>587</h3>
                                    <h6>Loyalty purchases</h6>
                                </div>
                            </div>
                            <div className="mp_table row">
                                <div className=" col-4 ">
                                    <div className="h-100 d-flex align-items-end justify-content-center ">
                                        <div className="mpt_chart">
                                            <Image src="/images/chart32.svg" width={300} height={400} alt="chart2" />
                                        </div>

                                    </div>
                                </div>
                                <div className="mpt_table col-8">
                                    <div className=" table-container">
                                        <table className="table caption-top">
                                            <thead>
                                                <tr>
                                                    <th>Services</th>
                                                    <th>Total Services</th>
                                                    <th>Loyal Customer</th>
                                                    <th>Earned Points</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {totalServices.map((service, index) => (
                                                    <tr key={index} onClick={openModal}>
                                                        <td>{service.subServiceName || "N/A"}</td> {/* Service name */}
                                                        <td>{service.appointments || 0}</td>      {/* Number of appointments */}
                                                        <td>{service.appointments || 0}</td> {/* Placeholder for additional data */}
                                                        <td>{service.appointments || 0}</td>  {/* Placeholder for additional data */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {active === "allReviews" && (
                    <div className="m_tabs_main">
                        <div className="mtm_all_reviews">
                            {loading ? (
                                <p>Loading reviews...</p>
                            ) : allReviews.length === 0 ? (
                                <p>No reviews available.</p>
                            ) : (
                                allReviews.map((review, index) => (
                                    <div key={index} className="mar_item">
                                        <input type="checkbox" id={`review_${index}`} />
                                        <label className="mar_label" htmlFor={`review_${index}`}>
                                            <span className="mar_profile "></span>
                                            <div className="mar_content">
                                                <div className="d-flex align-items-center gap-3 pb-2">
                                                    <h4>  {review?.reviewBy?.firstName
                                                        ? review?.reviewBy?.lastName
                                                            ? review.reviewBy.firstName + " " + review.reviewBy.lastName
                                                            : review.reviewBy.firstName
                                                        : "Anonymous"}</h4>
                                                    <h5 className="mid_line">|</h5>
                                                    <h6>{formatDate(review?.createdAt || "N/A")}</h6>
                                                </div>
                                                <p>{review?.review || "No review text provided."}</p>
                                            </div>
                                            <div className="px-3">
                                                <h6 className="pb-1">{review?.onService?.subServiceId?.Title || "No Service"}</h6>
                                                <p>{review?.onService?.title || "No Service"}</p>
                                            </div>
                                            <div className="mar_stars d-flex align-items-center gap-1 ps-4 pe-2">
                                                {[...Array(review?.stars || 0)].map((_, starIndex) => (
                                                    <span key={starIndex}>
                                                        <FaStar />
                                                    </span>
                                                ))}
                                            </div>
                                        </label>
                                    </div>
                                ))
                            )}
                            {/* <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div> */}
                        </div>
                    </div>
                )}
                {active === "gallery" && (
                    <div className="m_tabs_main pb-0">
                        <div className="mtm_gallary">
                            <h3>Hair Services Gallery</h3>
                            <div className="mg_items">
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                            </div>
                            <h3>Nails Services Gallery</h3>
                            <div className="mg_items">
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                            </div>
                            <h3>Skin Services Gallery</h3>
                            <div className="mg_items pb-0">
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
};

const ProtectedMarketingDashboard = () => (
    <AuthGuard>
        <Marketing />
    </AuthGuard>
);

export default ProtectedMarketingDashboard;