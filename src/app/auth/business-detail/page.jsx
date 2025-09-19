"use client"
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { MultiSelect } from "react-multi-select-component";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BussinessDetail = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    const adminId = useSelector((state) => state.auth.user?._id || "");
    const token = useSelector(state => state.auth.token);

    const [formData, setFormData] = useState({
        businessName: "",
        city: "",
        address: "",
        selectedCategories: [],  // Store category IDs
        businessImage: null,
        locationName: "",
        latitude: "25.4473",
        longitude: "-80.4790",
        locationName: "",
    });

    const [workingDays, setWorkingDays] = useState(
        daysOfWeek.reduce((acc, day) => {
            acc[day] = { isActive: false, open: "09:00", close: "18:00" };
            return acc;
        }, {})
    );

    // ✅ Fetch all categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/superAdmin/getAllCategories`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setCategories(data.date || []);
                } else {
                    showErrorToast(data.msg || "Failed to load categories");
                }
            } catch (err) {
                showErrorToast("Error fetching categories");
            }
        };
        if (token) fetchCategories();
    }, [token]);

    // Prepare options for MultiSelect
    const categoryOptions = categories.map(cat => ({
        label: cat.categoryName,
        value: cat._id
    }));

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, businessImage: file });

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ Handle multiple category selection with MultiSelect
    const handleCategoryChange = (selectedOptions) => {
        // Extract just the values (category IDs) from the selected options
        const selectedCategoryIds = selectedOptions.map(option => option.value);
        setFormData(prev => ({
            ...prev,
            selectedCategories: selectedCategoryIds
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.selectedCategories.length === 0) {
            setError("Please select at least one category");
            return;
        }

        setLoading(true);
        setError("");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/admin/addBusinessProfile`;
        const formDataToSend = new FormData();
        formDataToSend.append("adminId", adminId);
        formDataToSend.append("businessName", formData.businessName);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("locationName", formData.locationName);
        formDataToSend.append("latitude", formData.latitude);
        formDataToSend.append("longitude", formData.longitude);

        // Filter workingDays to include only selected days
        const workingDaysArray = Object.entries(workingDays)
            .filter(([day, { isActive }]) => isActive)
            .map(([day, { open, close }]) => ({
                day,
                openingTime: open,
                closeingTime: close,
            }));

        formDataToSend.append("workingDays", JSON.stringify(workingDaysArray));

        // ✅ Send category IDs instead of names
        formDataToSend.append("categories", JSON.stringify(formData.selectedCategories));

        if (formData.businessImage) {
            formDataToSend.append("BusinessImage", formData.businessImage);
        }

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend,
            });

            const data = await response.json(); // ✅ FIX

            if (response.ok) {
                const { categories } = data.data;
                console.log("Categories from API:", categories);

                if (!categories || categories.length === 0) {
                    router.push("/dashboard");
                    localStorage.removeItem("services");
                } else {
                    localStorage.setItem("pendingServices", JSON.stringify(categories));

                    // ✅ Use the 1st category's name in query param
                    const firstCategoryName =
                        categories[0]?.categoryName?.en || categories[0]?.categoryName;

                    router.push(`add-services?service=${encodeURIComponent(firstCategoryName)}`);

                    localStorage.removeItem("services");
                }
            } else {
                setError(data.msg || "Something went wrong");
                showErrorToast(data.msg || "Error adding business!");
            }
        } catch (error) {
            setError("Error submitting business details");
            showErrorToast("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Convert selected category IDs back to MultiSelect format for display
    const selectedOptionsForDisplay = formData.selectedCategories.map(id => {
        const category = categories.find(cat => cat._id === id);
        return category ? { label: category.categoryName, value: category._id } : null;
    }).filter(Boolean);

    return (
        <div className="content w-100">
            <div className="auth_container bussiness">
                <div className="auth_head">
                    <h2>Business Details</h2>
                    <p>Enter your business info to customize your Fraime experience</p>
                </div>
                <div className='w-100'>
                    <form onSubmit={handleSubmit}>
                        {/* Upload logo */}
                        <div className="auth_upload_bussiness_logo">
                            <input type="file" accept="image/*" required onChange={handleFileChange} />
                            {formData.businessImage ? (
                                <img src={URL.createObjectURL(formData.businessImage)} alt="Preview" />
                            ) : (
                                <label>
                                    <div className="aubl_img_container">
                                        <span className="aic_icon">
                                            <Image src="/images/upload-icon.png" className='img-fluid' width={16} height={18} alt="Frame" />
                                        </span>
                                    </div>
                                    <h5>Upload business logo *</h5>
                                </label>
                            )}
                        </div>

                        {/* Business info */}
                        <div className="row pt-4 gy-4">
                            <div className="col-12">
                                <div className="bd_fields">
                                    <input
                                        type="text"
                                        name="businessName"
                                        placeholder='Business Name *'
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <select name="city" onChange={handleInputChange} required>
                                        <option value="">Select City *</option>
                                        <option value="Florida">Florida</option>
                                        <option value="New York">New York</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <input
                                        type="text"
                                        name="locationName"
                                        placeholder='Location Name *'
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea
                                        name="address"
                                        placeholder='Address *'
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            {/* ✅ MultiSelect Category Selection */}
                            <div className="col-12">
                                <div className="avail_serv position-relative" style={{ zIndex: "11" }}>
                                    <h4>Select Categories</h4>
                                    <MultiSelect
                                        options={categoryOptions}
                                        value={selectedOptionsForDisplay}
                                        onChange={handleCategoryChange}
                                        labelledBy="Select Categories"
                                        className="multi-select-custom"
                                    />

                                </div>
                            </div>
                        </div>

                        {/* Working Days */}
                        <div className="row timings mt-5">
                            <div className="col-6"><h4>Working Days</h4></div>
                            <div className="col-6"><h4>Hours of Operation</h4></div>
                        </div>

                        {daysOfWeek.map((day) => (
                            <div className="row align-items-center mb-3" key={day}>
                                <div className="col-3">
                                    <div className="auth_form_check auth_form_check2">
                                        <input
                                            type="checkbox"
                                            checked={workingDays[day]?.isActive}
                                            onChange={() => toggleWorkingDay(day)}
                                            id={`day-${day}`}
                                        />
                                        <label htmlFor={`day-${day}`}>{day.toUpperCase()}</label>
                                    </div>
                                </div>
                                <div className="col-9">
                                    {workingDays[day]?.isActive && (
                                        <MultiRangeSlider2
                                            baseClassName="multi-range-slider-black"
                                            min={0}
                                            max={23.99}
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
                                    )}
                                </div>
                            </div>
                        ))}

                        {error ? (
                            <p className='m-0 error text-danger mt-3'>Error: {error}</p>
                        ) : (
                            message && <p className='m-0 success text-success mt-3'>{message}</p>
                        )}

                        <div className='mt-4 text-start'>
                            <button
                                type="submit"
                                className="theme-btn2"
                                disabled={loading || formData.selectedCategories.length === 0}
                            >
                                {loading ? <Spinner /> : "Continue"}
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default BussinessDetail;