"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessData } from "@/lib/slices/authslice";
import MultiRangeSlider2 from "@/components/MultiRangeSlider2";
import Image from "next/image";
import axios from "axios";

const services = [
    { id: 1, title: "Hair", value: "Hair Services", img: "/images/asi_img1.png", width: 75, height: 79 },
    { id: 2, title: "Nails", value: "Nail Services", img: "/images/asi_img2.png", width: 54, height: 70 },
    { id: 3, title: "Skin", value: "Skin Services", img: "/images/asi_img3.png", width: 71, height: 67 },
    { id: 4, title: "Other", value: "Other Services", img: "/images/asi_img4.png", width: 46, height: 46 },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BusinessDetail = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const storedBusiness = useSelector((state) => state.auth.business || {});
    const adminId = useSelector((state) => state.auth.user?._id || "");
    const token = useSelector((state) => state.auth.token || "");

    const [businessName, setBusinessName] = useState(storedBusiness.businessName || "");
    const [userName, setUserName] = useState(storedBusiness.userName || "");
    const [city, setCity] = useState(storedBusiness.city || "");
    const [address, setAddress] = useState(storedBusiness.address || "");
    const [availableServices, setAvailableServices] = useState(storedBusiness.availableServices || []);
    const [workingDays, setWorkingDays] = useState(storedBusiness.workingDays || {});
    const [businessImage, setBusinessImage] = useState(storedBusiness.businessImage || null);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("businessDetails"));
        const storedBusiness = JSON.parse(localStorage.getItem("businessData"));

        if (savedData) {
            setBusinessName(savedData.businessName || "");
            setUserName(savedData.userName || "");
            setCity(savedData.city || "");
            setAddress(savedData.address || "");
            setAvailableServices(savedData.availableServices || []);
            setWorkingDays(savedData.workingDays || {});
        }

        // Ensure businessImage is retrieved safely
        if (storedBusiness?.businessImagePreview) {
            setBusinessImage(storedBusiness.businessImagePreview);
        }
    }, []);

    const handleServiceClick = (serviceValue) => {
        const updatedServices = availableServices.includes(serviceValue)
            ? availableServices.filter((s) => s !== serviceValue)
            : [...availableServices, serviceValue];

        setAvailableServices(updatedServices);
        saveToLocalStorage({ availableServices: updatedServices });
    };

    const toggleWorkingDay = (day) => {
        const updatedDays = { ...workingDays };
        if (updatedDays[day]) {
            delete updatedDays[day];
        } else {
            updatedDays[day] = { open: "08:00", close: "20:00" };
        }
        setWorkingDays(updatedDays);
        saveToLocalStorage({ workingDays: updatedDays });
    };

    const updateWorkingHours = (day, newHours) => {
        if (workingDays[day]) {
            setWorkingDays((prev) => ({
                ...prev,
                [day]: newHours,
            }));
            saveToLocalStorage({
                workingDays: { ...workingDays, [day]: newHours },
            });
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setBusinessImage(previewUrl);

            // Update localStorage
            const updatedBusinessData = {
                ...JSON.parse(localStorage.getItem("businessData") || "{}"),
                businessImagePreview: previewUrl,
            };
            localStorage.setItem("businessData", JSON.stringify(updatedBusinessData));

            // Dispatch Redux action
            dispatch(setBusinessData({ businessImagePreview: previewUrl }));
        }
    };

    const saveToLocalStorage = (updatedFields) => {
        const currentData = JSON.parse(localStorage.getItem("businessDetails") || "{}");
        const businessData = {
            ...currentData,
            businessName,
            userName,
            city,
            address,
            availableServices,
            workingDays,
            businessImage,
            ...updatedFields,
        };
        localStorage.setItem("businessDetails", JSON.stringify(businessData));
        dispatch(setBusinessData(businessData));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("adminId", adminId);
        formData.append("businessName", businessName);
        formData.append("userName", userName);
        formData.append("city", city);
        formData.append("address", address);
        formData.append("availableServices", JSON.stringify(availableServices));
        formData.append("workingDays", JSON.stringify(workingDays));

        if (businessImage instanceof File) {  // Ensure it's a File, not a URL
            formData.append("businessImage", businessImage);
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/addBusinessProfile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            localStorage.removeItem("businessDetails");
            router.push("/nextPage");
        } catch (error) {
            console.error("Error submitting business details:", error);
        }
    };

    return (
        <div className="content w-100">
            <div className="auth_container bussiness">
                <div className="auth_head">
                    <h2>Business Details</h2>
                    <p>Enter your business info to customize your Fraime experience</p>
                </div>
                <div className='w-100'>
                    <form>
                        {/* <div className="auth_upload_bussiness_logo">
                            <input type="file" name="" id="" />
                            <label htmlFor="">
                                <div className="aubl_img_container">
                                    <img src="" alt="" />
                                    <span className="aic_icon">
                                        <Image
                                            src="/images/upload-icon.png"
                                            width={16}
                                            height={18}
                                            className="pb-icon"
                                            alt="Frame"
                                        />
                                    </span>
                                </div>
                                <h5>Upload business logo</h5>
                            </label>
                        </div> */}
                        {/* Business Logo Upload */}
                        <div className="auth_upload_bussiness_logo">
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setBusinessImage(file);
                                    saveToLocalStorage({ businessImage: file });
                                }}
                            />
                            <label>
                                <div className="aubl_img_container">
                                    <Image
                                        src={businessImage || "/default-image.png"}
                                        alt="Business Logo"
                                        width={100}
                                        height={100}
                                    />
                                    <span className="aic_icon">
                                        <Image src="/images/upload-icon.png" width={16} height={18} alt="Upload Icon" />
                                    </span>
                                </div>
                                <h5>Upload business logo</h5>
                            </label>
                        </div>
                        <div className="row pt-4 gy-4">
                            {/* Business Name */}
                            <div className="col-6">
                                <div className="bd_fields">
                                    <input
                                        type="text"
                                        placeholder="Business Name"
                                        value={businessName}
                                        onChange={(e) => {
                                            setBusinessName(e.target.value);
                                            saveToLocalStorage({ businessName: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="col-6">
                                <div className="bd_fields">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={userName}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                            saveToLocalStorage({ userName: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>

                            {/* City Selection */}
                            <div className="col-12">
                                <div className="bd_fields">
                                    <select
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            saveToLocalStorage({ city: e.target.value });
                                        }}
                                    >
                                        <option value="">Select City</option>
                                        <option value="city1">City 1</option>
                                        <option value="city2">City 2</option>
                                    </select>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            saveToLocalStorage({ address: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>



                        {/* Available Services */}
                        <div className="avail_serv pt-3">
                            <div className="pb-4">
                                <h4>Available Services</h4>
                            </div>
                            <div className="avail_serve_container">
                                {services.map((service) => (
                                    <div key={service.id}>
                                        <label className="as_item">
                                            <input
                                                type="checkbox"
                                                checked={availableServices.includes(service.value)}
                                                onChange={() => handleServiceClick(service.value)}
                                            />
                                            <Image src={service.img} width={service.width} height={service.height} alt={service.title} />
                                            <h5>{service.title}</h5>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Working Days & Hours of Operation */}
                        <div className="row timings mt-5">
                            <div className="col-6">
                                <h4>Working Days</h4>
                            </div>
                            <div className="col-6">
                                <h4>Hours of Operation</h4>
                            </div>
                        </div>

                        {daysOfWeek.map((day) => (
                            <div className="row align-items-center" key={day}>
                                {/* Checkbox for Working Day */}
                                <div className="col-3">
                                    <div className="auth_form_check auth_form_check2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={!!workingDays[day]}
                                            onChange={() => toggleWorkingDay(day)}
                                        />
                                        <label className="form-check-label">{day.toUpperCase()}</label>
                                    </div>
                                </div>

                                {/* MultiRangeSlider for Hours of Operation */}
                                <div className="col-9">
                                    {workingDays[day] && (
                                        <div className="multi_range">
                                            <MultiRangeSlider2
                                                minTime={workingDays[day].open}
                                                maxTime={workingDays[day].close}
                                                onChange={(newHours) => updateWorkingHours(day, newHours)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Submit Button */}
                        <div className="mt-5 text-start">
                            <button type="button" className="theme-btn2" onClick={handleSubmit}>Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BusinessDetail