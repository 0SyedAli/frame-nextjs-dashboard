"use client"
import Spinner from "@/components/Spinner";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const UserAccountSetting = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phNumber: "",
        city: "",
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user_data"));
        if (storedUser) {
            setFormData((prev) => ({
                ...prev,
                firstName: storedUser.firstName || "",
                lastName: storedUser.lastName || "",
                phNumber: storedUser.phNumber || "",
                city: storedUser.city || "",
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // console.log("Data sent to API:", formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("handleSubmit called");
        try {
            setLoading(true);
            const token = localStorage.getItem("userAccessToken");
            const formDataToSend = new FormData();

            const initialUser = JSON.parse(localStorage.getItem("user_data"));

            if (formData.firstName && formData.firstName !== initialUser?.firstName) {
                formDataToSend.append("firstName", formData.firstName);
            }
            if (formData.lastName && formData.lastName !== initialUser?.lastName) {
                formDataToSend.append("lastName", formData.lastName);
            }
            if (formData.phNumber && formData.phNumber !== initialUser?.phNumber) {
                formDataToSend.append("phNumber", formData.phNumber);
            }
            if (formData.city && formData.city !== initialUser?.city) {
                formDataToSend.append("city", formData.city);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/updateProfie`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.setItem("user_data", JSON.stringify(response?.data?.data));
            showSuccessToast("Profile updated successfully!");
            router.push("/user/dashboard");
        } catch (error) {
            showErrorToast(error.response?.data?.message || "Error updating profile!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="setting_dash w-100 h-100">
            <div className="sd_top">
                <h3>Account Settings</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <div className="pm_detail">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Lastname"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phNumber"
                        placeholder="Phone no"
                        value={formData.phNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <div className="pd_bottom">
                        <h4>Other Settings</h4>
                        <button type="button">Delete My Account</button>
                    </div>
                    <div className="pmd_btn">
                        <button className="theme-btn2" disabled={loading}>
                            {loading ? <Spinner /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAccountSetting;