"use client";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "@/components/Spinner";

const EditProfile = () => {
    const router = useRouter();
    const [active, setActive] = useState('accountSettings');
    const [loading, setLoading] = useState(false);
    const adminId = useSelector((state) => state.auth.user?.id || "");
    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        pHnumber: "",
        city: "",
        address: "",
        gender: "",
        email: "",
        about: "",
        AdminImage: null,
    });


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setFormData((prev) => ({
                ...prev,
                id: storedUser.id || "",
                email: storedUser.email || "",
                city: storedUser.city || "",
                address: storedUser.address || "",
                gender: storedUser.gender || "",
                pHnumber: storedUser.pHnumber || "",
                about: storedUser.about || "",
                firstName: storedUser.name?.split(" ")[0] || "",
                lastName: storedUser.name?.split(" ")[1] || "",
                profileImage: storedUser.profileImage || "",
                AdminImage: null,

            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Clean filename: replace spaces, ( and ) with underscores
            const cleanedFileName = file.name.replace(/\s|\(|\)/g, "_");
    
            // Create a new file object with the cleaned filename
            const sanitizedFile = new File([file], cleanedFileName, { type: file.type });
    
            // Set sanitized file in formData
            setFormData({ ...formData, AdminImage: sanitizedFile });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const token = localStorage.getItem("token");
            const formDataToSend = new FormData();
            formDataToSend.append("id", adminId);
            if (formData.firstName) formDataToSend.append("firstName", formData.firstName);
            if (formData.lastName) formDataToSend.append("lastName", formData.lastName);
            if (formData.pHnumber) formDataToSend.append("pHnumber", formData.pHnumber);
            if (formData.address) formDataToSend.append("address", formData.address);
            if (formData.gender) formDataToSend.append("gender", formData.gender);
            if (formData.email) formDataToSend.append("email", formData.email);
            if (formData.about) formDataToSend.append("about", formData.about);
            if (formData.AdminImage) {
                formDataToSend.append("AdminImage", formData.AdminImage);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/updateAdmin`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedUser = {
                ...JSON.parse(localStorage.getItem("user")),
                email: formData.email,
                city: formData.city,
                address: formData.address,
                gender: formData.gender,
                pHnumber: formData.pHnumber,
                about: formData.about,
                name: `${formData.firstName} ${formData.lastName}`,
                profileImage: formData.AdminImage ? formData.AdminImage.name : user.profileImage, // depends on backend return
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Profile updated successfully!");
            router.push("/dashboard");
        } catch (error) {
            console.error("Error updating profile:", error);
            setLoading(false)
        }
    };
    // const storedUser = JSON.parse(localStorage.getItem("user")); // add this before return if not already


    return (
        <div className="w-100">
            {/* Tabs */}
            <div className="m_tabs_menu">
                {["accountSettings", "transactions", "planSelection"].map(tab => (
                    <button
                        key={tab}
                        className={`theme-btn3 ${active === tab ? 'active' : ''}`}
                        onClick={() => setActive(tab)}
                    >
                        {tab === "accountSettings" && "Account Settings"}
                        {tab === "transactions" && "Transactions"}
                        {tab === "planSelection" && "Plan Selection"}
                    </button>
                ))}
            </div>

            {/* Account Settings */}
            {active === "accountSettings" && (
                <div className="m_tabs_main">
                    <form onSubmit={handleSubmit}>
                        <h3>Loyalty rewards</h3>
                        <div className="ast_main">
                            <div className="ast_item">
                                <Image
                                    src={
                                        formData.AdminImage
                                            ? URL.createObjectURL(formData.AdminImage)
                                            : formData.profileImage
                                                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${formData.profileImage}`
                                                : "/images/ast_img1.png"
                                    }
                                    width={64}
                                    height={60}
                                    alt="Profile"
                                />
                                <div className="ast_file">
                                    <input type="file" name="AdminImage" onChange={handleImageChange} />
                                    <h5>Change Picture</h5>
                                    <span><FaRegEdit /></span>
                                </div>
                            </div>
                            <div className="row pt-4 gx-3 gy-3">
                                <div className="col-4">
                                    <div className="am_field">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label>Gender</label>
                                        <input
                                            type="text"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="pHnumber"
                                            value={formData.pHnumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="am_field">
                                        <label>About</label>
                                        <textarea
                                            className="w-100"
                                            name="about"
                                            style={{ height: "100px" }}
                                            value={formData.about}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="am_btn">
                                        <button type="submit" disabled={loading} className="am_submit">
                                            {loading ? <Spinner /> : "Update"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Transactions */}
            {active === "transactions" && (
                <div className="m_tabs_main">
                    <div className="transaction-main">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="tm-item">
                                <div>
                                    <h5 className="mb-2">Received from James Wilson</h5>
                                    <h5 className="d-flex align-items-center gap-4">
                                        <span>July 17, 2024</span>
                                        <span>Order ID : #{456789 + index}</span>
                                    </h5>
                                </div>
                                <h4>+$400.00</h4>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Plan Selection */}
            {active === "planSelection" && (
                <div className="m_tabs_main pricing_container">
                    <div className="pricing_item mt-5">
                        <div className="row">
                            <div className="col-4">
                                <div className="pi_left">
                                    <h5>Basic</h5>
                                    <h2>$45.<span>00</span></h2>
                                    <p>billed every month</p>
                                    <p className="pi_cp">Current Package</p>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="pi_right">
                                    <p>Access these features when you get this pricing package for your business.</p>
                                    <ul>
                                        <li><FaCheck /> Sed ut perspiciatis unde omnis</li>
                                        <li><FaCheck /> Sed ut perspiciatis unde omnis unde omnis</li>
                                        <li><FaCheck /> Sed ut perspiciatis unde</li>
                                        <li><FaCheck /> Sed ut perspiciatis unde omnis</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;