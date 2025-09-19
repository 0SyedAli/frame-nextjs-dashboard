"use client"
import Spinner from "@/components/Spinner";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PaymentMethod = () => {
    const [loading, setLoading] = useState(false);
    const [customerAddress, setCustomerAddress] = useState("");
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userAccessToken = localStorage.getItem("userAccessToken");
        if (!userAccessToken) {
            router.push('/auth/user/signin')
        }
        else {
            setToken(userAccessToken)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            customerAddress, // Replace with dynamic userId
        };
        setLoading(true);
        try {

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/updateProfie`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            console.log("Address added successfully:", response.data);
            showSuccessToast(response?.data?.msg || "Address added successfully:");
            router.push('/user/dashboard/more/my-address')
        } catch (error) {
            console.error("Error adding Address:", error);
            showErrorToast(error.response?.data?.message || "Error adding Address!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="setting_dash w-100 h-100    ">
            <div className="sd_top py-0">
                <h3>Add New Addresses</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="sd_mid">
                    <h3>Where's your next appointment?</h3>
                    <p>Share your location, and we'll handle the rest!</p>
                </div>
                <div className="pm_detail ana">
                    <input
                        type="text"
                        placeholder="Enter address"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex align-items-end gap-2 ana_find_loc">
                    <h5><FaLocationDot /></h5>
                    <h4>Or Find my location</h4>
                </div>
                <div className="text-center ea_btn2">
                    <button type="submit" disabled={loading} className="theme-btn2">
                        {loading ? <Spinner /> : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;