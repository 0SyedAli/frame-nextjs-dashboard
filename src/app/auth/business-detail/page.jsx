"use client"
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import { showErrorToast, showSuccessToast } from '@/lib/toast';

const services = [
    { id: 1, title: "Hair", value: "Hair Services", img: "/images/asi_img1.png", width: 75, height: 79 },
    { id: 2, title: "Nails", value: "Nail Services", img: "/images/asi_img2.png", width: 54, height: 70 },
    { id: 3, title: "Skin", value: "Skin Services", img: "/images/asi_img3.png", width: 71, height: 67 },
    { id: 4, title: "Others", value: "Others Services", img: "/images/asi_img4.png", width: 46, height: 46 },
];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BussinessDetail = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const adminId = useSelector((state) => state.auth.user?._id || "");

    const token = useSelector(state => state.auth.token);
    const [formData, setFormData] = useState({
        businessName: "",
        city: "",
        address: "",
        availableServices: [],
        businessImage: null,
    });
    const [workingDays, setWorkingDays] = useState(
        daysOfWeek.reduce((acc, day) => {
            acc[day] = { isActive: false, open: "09:00", close: "18:00" };
            return acc;
        }, {})
    );

    useEffect(() => { }, [])
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, businessImage: e.target.files[0] });
    };

    const handleServiceClick = (serviceValue) => {
        setFormData(prevState => {
            const isSelected = prevState.availableServices.includes(serviceValue);
            const newServices = isSelected
                ? prevState.availableServices.filter(s => s !== serviceValue)
                : [...prevState.availableServices, serviceValue];
            return { ...prevState, availableServices: newServices };
        });
    };

    const toggleWorkingDay = (day) => {
        setWorkingDays((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                isActive: !prev[day].isActive,
            },
        }));
    };

    const updateWorkingHours = (day, newHours) => {
        setWorkingDays((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                ...newHours,
            },
        }));
    };
    const timeToNumber = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours + minutes / 60;
    };

    const numberToTime = (num) => {
        const hours = Math.floor(num);
        const minutes = Math.round((num - hours) * 60);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/addBusinessProfile`;

        const formDataToSend = new FormData();
        formDataToSend.append("adminId", adminId);
        formDataToSend.append("businessName", formData.businessName);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("address", formData.address);

        // Filter workingDays to include only selected days
        const workingDaysArray = Object.entries(workingDays)
            .filter(([day, { isActive }]) => isActive) // Include only active days
            .map(([day, { open, close }]) => ({
                day,
                openingTime: open,
                closeingTime: close, // Ensure correct spelling for backend
            }));

        formDataToSend.append("workingDays", JSON.stringify(workingDaysArray));
        formDataToSend.append("availableServices", JSON.stringify(formData.availableServices));

        if (formData.businessImage) {
            formDataToSend.append("BusinessImage", formData.businessImage);
        }

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend,
            });

            const data = await response.json();
            if (response.ok) {
                showSuccessToast(response?.data?.message || "Business Profile Created!"); //
                setMessage(data.message || "Form Submitted Successfull");
                localStorage.setItem('bussinessDetail', JSON.stringify(data));
                setError("")

                const { availableServices } = data.data;

                if (!availableServices || availableServices.length === 0) {
                    router.push("/dashboard");  // Redirect to the dashboard if no services
                    localStorage.removeItem("services");
                } else if (availableServices.length === 1) {
                    localStorage.setItem("pendingServices", JSON.stringify(availableServices));
                    router.push(`add-services?service=${availableServices[0]}`);
                    localStorage.removeItem("services");
                } else {
                    // Store services in localStorage for sequential redirection
                    localStorage.setItem("pendingServices", JSON.stringify(availableServices));
                    router.push(`add-services?service=${availableServices[0]}`);
                    localStorage.removeItem("services");
                }
            } else {
                setError(data.message || "Something went wrong");
                showErrorToast(error.response?.data?.message || "Error adding employee!");
            }
        } catch (error) {
            setError("Error submitting business details:", error);
        } finally {
            setLoading(false);
            setError("")
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
                    <form onSubmit={handleSubmit}>
                        <div className="auth_upload_bussiness_logo">
                            <input type="file" accept="image/*" required onChange={handleFileChange} />
                            {
                                formData.businessImage ? (
                                    formData.businessImage && <img src={URL.createObjectURL(formData.businessImage)} alt="Preview" />
                                ) : (

                                    <label>
                                        <div className="aubl_img_container">
                                            <span className="aic_icon">
                                                <Image src="/images/upload-icon.png" width={16} height={18} className="pb-icon" alt="Frame" />
                                            </span>
                                        </div>
                                        <h5>Upload business logo *</h5>
                                    </label>
                                )
                            }
                        </div>
                        <div className="row pt-4 gy-4">
                            <div className="col-12">
                                <div className="bd_fields">
                                    <input type="text" name="businessName" placeholder='Business Name *' onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div className="col-12"><div className="bd_fields">
                                <select name="city" onChange={handleInputChange} required>
                                    <option value="">Select City *</option>
                                    <option value="Florida">Florida</option>
                                    <option value="New York">New York</option>
                                </select>
                            </div></div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea name="address" placeholder='Address *' onChange={handleInputChange} required></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="avail_serv pt-3">
                            <h4>Available Services</h4>
                            <div className='avail_serve_container'>
                                {services.map((service) => (
                                    <label key={service.id} className="as_item">
                                        <input type="checkbox" checked={formData.availableServices.includes(service.value)} onChange={() => handleServiceClick(service.value)} />
                                        <div className="shadow_active"></div>
                                        <Image src={service.img} width={service.width} height={service.height} alt={service.title} />
                                        <h5>{service.title}</h5>
                                    </label>
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
                                            checked={workingDays[day]?.isActive}
                                            onChange={() => toggleWorkingDay(day)}
                                        />
                                        <label className="form-check-label">{day.toUpperCase()}</label>
                                    </div>
                                </div>

                                {/* MultiRangeSlider for Hours of Operation */}
                                <div className="col-9">
                                    {workingDays[day]?.isActive && (
                                        <div className="day-config">
                                            <MultiRangeSlider2
                                                baseClassName="multi-range-slider-black"
                                                min={0}
                                                max={23.99} // 23:59 in decimal form
                                                step={0.0167}
                                                minValue={timeToNumber(workingDays[day].open)}
                                                maxValue={timeToNumber(workingDays[day].close)}
                                                onSubmit={(e) =>
                                                    updateWorkingHours(day, {
                                                        open: e.openingTime,
                                                        close: e.closingTime,
                                                    })
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {error ? (
                            error && <p className='m-0 error text-danger'>Error: {error}</p>
                        ) : (
                            message && <p className='m-0 success text-success'>{message}</p>
                        )}
                        < div className='mt-4 text-start'>
                            <button type="submit" className="theme-btn2" disabled={loading}>{loading ? <Spinner /> : "Continue"}</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default BussinessDetail;