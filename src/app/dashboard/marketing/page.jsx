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
    const [active2, setActive2] = useState('message');
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
    const [previewImage, setPreviewImage] = useState("/images/grey_upload_img.png");
    const [fileError, setFileError] = useState("");
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Validate file type (only images)
        if (!file.type.startsWith("image/")) {
            setFileError("Only image files are allowed.");
            return;
        }

        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            setFileError("File size should be less than 2MB.");
            return;
        }

        setFileError(""); // Clear error if validation passes

        // Preview the selected image
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);

        // setFormData((prev) => ({ ...prev, AdminImage: file }));
    };

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
                fetchSubServices();
                // fetchTotalServices();
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

    // const fetchTotalServices = async () => {
    //     try {
    //         const response = await axios.get(
    //             `${process.env.NEXT_PUBLIC_API_URL}/admin/totalServices?adminId=${adminId}`
    //         )
    //         setTotalServices(response?.data?.data || []);
    //     } catch (error) {
    //         console.error("Error fetching marketing data", error);
    //     }
    // }

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
                    <form className="gm_text" >
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

                {active === "marketing" && (
                    <div className="m_tabs_main">
                        <h3>Loyalty rewards</h3>
                        <p>Create ways for your customer to earn and redeem points.</p>
                        <div className="mtm_cards mtm_cards2">
                            <div className="mc_new">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1" />
                                    <label class="form-check-label" htmlFor="radioDefault1">
                                        By Visits
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="radioDefault" id="radioDefault2" />
                                    <label class="form-check-label" htmlFor="radioDefault2">
                                        By amount spend
                                    </label>
                                </div>
                            </div>
                            <div className="mc_new1">
                                <h4>Threshold</h4>
                                <div className="mcn1">
                                    <input type="number" />
                                    <h5>Visits</h5>
                                </div>
                            </div>
                            <div className="mc_new1">
                                <h4>Reward Value</h4>
                                <div className="mcn1">
                                    <input type="number" />
                                    <h5>%</h5>
                                </div>
                            </div>
                            <div className="mc_new2 d-flex flex-column align-items-center gap-3 justify-content-center text-center">
                                <h6>Customers will received x% off after x visits</h6>
                                <button className="theme-btn2">
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="mtm_performance">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Email Marketing Compaign</h3>
                                {/* <div className="d-flex align-items-center gap-2">
                                    <button className="btn royality_btn" onClick={openModal}>Add Points</button>
                                    <button className="btn royality_btn" onClick={openModal}>Edit Points</button>
                                    <button className="btn royality_btn" onClick={handlePointsDelete} disabled={loading4}>
                                        {loading4 ? <Spinner /> : "Delete Points"}
                                    </button>
                                </div> */}
                                <div className="m_tabs_menu">
                                    <button
                                        className={`btn ${active2 === 'message' ? 'active' : ''}`}
                                        onClick={() => setActive2('message')}
                                    >
                                        Message
                                    </button>
                                    <button
                                        className={`btn ${active2 === 'clients' ? 'active' : ''}`}
                                        onClick={() => setActive2('clients')}
                                    >
                                        Clients
                                    </button>
                                </div>
                            </div>
                            <form className="emc_form">
                                <input type="text" placeholder="Subject" />
                                <textarea name="" placeholder="Hi there! Write you message here!" rows="7"></textarea>
                                <div className="d-flex align-items-end justify-content-between">
                                    <div className="upload_user_image text-start">
                                        <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                                            <Image src={previewImage} width={118} height={118} alt="Profile Preview" />

                                            <p>Attach Image</p>
                                        </label>
                                        <input
                                            id="imageUpload"
                                            type="file"
                                            accept="image/*" // Restrict file selection to images only
                                            onChange={handleFileChange}
                                            style={{ display: "none" }} // Hide default file input UI
                                        />
                                    </div>
                                    <div className="emc_btn">
                                        <button className="theme-btn3">
                                            Send me a Text
                                        </button>
                                        <button className="theme-btn2">
                                            Send Now
                                        </button>
                                    </div>
                                </div>
                            </form>
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