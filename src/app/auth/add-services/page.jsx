"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { setServiceData } from "../../../lib/slices/authslice";
import Link from "next/link";

const AddService = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // Get category from URL params
    const category = searchParams.get("service"); // hair, nail, skin, others

    // Retrieve specific service from Redux
    const services = useSelector((state) => state?.auth?.services || {});
    const service = services[category] || {};

    const adminId = useSelector((state) => state?.auth?.user?.id || "");
    const token = useSelector((state) => state?.auth?.token || "");

    // State Variables
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [subMessage, setSubMessage] = useState(null);
    const [serviceSuccess, setServiceSuccess] = useState(null);
    const [subServiceSuccess, setSubServiceSuccess] = useState(false);
    const [title, setTitle] = useState(service?.title || category || "");
    const [serviceId, setServiceId] = useState(service?.serviceId || null);
    const [serviceText, setServiceText] = useState(service?.text || "");
    const [serviceImage, setServiceImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(service?.image || null);
    const [isServiceCreated, setIsServiceCreated] = useState(!!service?.serviceId);

    // Subservice States
    const [serviceTitle, setServiceTitle] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [subServiceImages, setSubServiceImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        const storedId = localStorage.getItem(`${category}_serviceId`);
        if (storedId) setServiceId(storedId);
        if (category) setTitle(category);
    }, [category]);

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        if (!serviceText || !serviceImage) {
            alert("Please fill all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("adminId", adminId);
        formData.append("Title", title);
        formData.append("ServiceImage", serviceImage);
        formData.append("text", serviceText);
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addService`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage(response?.data?.msg);
            setServiceSuccess(response?.data?.success);

            if (response.data?.data?._id) {
                const newServiceId = response.data.data._id;
                const uploadedImage = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${response.data.data.bannerImage}`;

                // Update state
                setServiceId(newServiceId);
                setPreviewImage(uploadedImage);
                setIsServiceCreated(true);
                // Save to Redux with category key
                dispatch(setServiceData({
                    category,
                    serviceId: newServiceId,
                    title,
                    text: serviceText,
                    image: uploadedImage,
                }));
            }
        } catch (error) {
            console.error("Service creation failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubServiceSubmit = async (e) => {
        e.preventDefault();
        if (!serviceTitle || !serviceDescription || !servicePrice || subServiceImages.length === 0) {
            alert("Please fill all subservice fields.");
            return;
        }

        const formData = new FormData();
        formData.append("adminId", adminId);
        formData.append("serviceId", serviceId);
        formData.append("title", serviceTitle);
        formData.append("text", serviceDescription);
        formData.append("price", servicePrice);

        // Append all images
        subServiceImages.forEach((file) => {
            formData.append("subServiceImages", file);
        });
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addSubService`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data?.success) {
                setSubMessage("Subservice added successfully!");
                // Clear form fields
                setServiceTitle("");
                setServiceDescription("");
                setServicePrice("");
                setSubServiceImages([]);
                setPreviewImages([]);
                setSubServiceSuccess(true)

            }
        } catch (error) {
            console.error("Subservice creation failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSubServiceImages(files);

        // Generate preview URLs
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previewUrls);
    };

    return (
        <div className="content w-100">
            <div className="auth_container bussiness hair_services">
                <div className="auth_head">
                    {title && <h2>{title}</h2>}
                    {title && <p>Please provide details of the {title} services you are offering.</p>}
                </div>

                {/* Service Form */}
                <form onSubmit={handleServiceSubmit}>
                    <div className="auth_upload_hair_cover">
                        <input
                            type="file"
                            accept="image/*"
                            disabled={isServiceCreated} // Disable file input after service creation
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setServiceImage(file);
                                    setPreviewImage(URL.createObjectURL(file)); // Set preview URL
                                }
                            }}
                        />
                        <label>
                            <div className="auhc_img_container">
                                <span className="aic_icon">
                                    <Image src="/images/upload-icon.png" width={16} height={18} alt="Upload" />
                                </span>
                                {title && <h5>Upload header image for {title} services</h5>}
                                <h5>800px x 400px</h5>
                            </div>

                            {/* Show uploaded image or preview */}
                            {previewImage && (
                                <Image
                                    src={previewImage || "/images/default-placeholder.png"} // Default image if previewImage is null
                                    className="aic_cover_img"
                                    width={300}
                                    height={100}
                                    alt="Selected Preview"
                                />
                            )}
                        </label>
                    </div>

                    <div className="bd_fields">
                        <textarea
                            rows="5"
                            defaultValue={serviceText}
                            onChange={(e) => setServiceText(e.target.value)}
                            placeholder="Service Introduction text (100 words)"
                            readOnly={isServiceCreated} // Make textarea read-only after service creation
                        />
                    </div>

                    {!isServiceCreated && (
                        <button type="submit" disabled={loading} className="btn theme-btn2">
                            {loading ? "Logging in..." : "Create"}
                        </button>
                    )}
                </form>
                {message && <p className="success text-success">{message}</p>}

                {/* Subservice Form */}
                {(isServiceCreated || serviceSuccess === true) && (
                    <form onSubmit={handleSubServiceSubmit}>
                        <h4 className='bd_h4'>Add Service</h4>
                        <div className="row gy-4">
                            <div className="col-12">
                                <div className="auth_upload_bussiness_logo">

                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {previewImages.length === 0 ? (
                                        <label htmlFor="">
                                            <div className="aubl_img_container">
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
                                    ) : (
                                        <div className="d-flex align-items-center gap-2 flex-wrap">
                                            {previewImages.map((src, index) => (
                                                <img key={index} src={src} alt={`Preview ${index}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <input
                                        type="text"
                                        placeholder="Subservice Title"
                                        value={serviceTitle}
                                        onChange={(e) => setServiceTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea
                                        rows="4"
                                        placeholder="Subservice Description"
                                        defaultChecked={serviceDescription}
                                        onChange={(e) => setServiceDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <h4 className='sp_h4'>Service Price</h4>
                                    </div>
                                    <div className="col-4">
                                        <div className="bd_fields sp_input">
                                            <input
                                                type="number"
                                                value={servicePrice}
                                                onChange={(e) => setServicePrice(e.target.value)}
                                            />
                                            <span>$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-5 justify-content-between">
                            <button type="submit" disabled={loading} className="btn theme-btn3">
                                {loading ? "Logging in..." : "Add Subservice"}
                            </button>
                            {subServiceSuccess &&
                                <Link href="/auth/business-detail" className="btn theme-btn2">Go back</Link>
                            }
                        </div>
                    </form>
                )}
                {subMessage && <p className="success text-success">{subMessage}</p>}
            </div>
        </div>
    );
};

export default AddService;
