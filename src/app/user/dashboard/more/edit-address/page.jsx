"use client"
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

const PaymentMethod = () => {
    const [loading, setLoading] = useState(false);
    const [customerAddress, setCustomerAddress] = useState("");
    const [street, setStreet] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [token, setToken] = useState(null);
    const [addressType, setAddressType] = useState("");
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
            customerAddress,
            street,
            postcode,
            city,
            addressType,
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

            showSuccessToast(response?.data?.msg || "Address added successfully:");
            router.push('/user/dashboard/more/my-address')

        } catch (error) {
            showErrorToast(error.response?.data?.message || "Error adding Address!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="setting_dash w-100 h-100">
            <form onSubmit={handleSubmit} className="ea_form h-100 d-flex flex-column justify-content-between">
                <div>
                    <div className="sd_top py-0">
                        <h3>Edit Address</h3>
                        <span><FaRegQuestionCircle /></span>
                    </div>
                    <h4>Address Details</h4>
                    <div className="pm_detail ana ea">
                        <input
                            type="text"
                            placeholder="Street"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Street"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Street"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <h4>Address Type</h4>
                    <div className="pm_ana_radio">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="addressType"
                                id="homeDefault2"
                                value="Home"
                                onChange={(e) => setAddressType(e.target.value)} // Update state
                            />
                            <label className="form-check-label" htmlFor="homeDefault2">
                                Home
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="addressType"
                                id="customAddress2"
                                value="Custom Address"
                                onChange={(e) => setAddressType(e.target.value)} // Update state
                            />
                            <label className="form-check-label" htmlFor="customAddress2">
                                Custom Address
                            </label>
                        </div>
                    </div>
                </div>
                {/* <h4>Additional Information</h4>
                <div className="ai_detail">
                    <select name="city" >
                        <option value="">Do you have any stairs? Please Select</option>
                        <option value="">one</option>
                        <option value="">two</option>
                        <option value="">three</option>
                    </select>
                    <div>
                        <div class="form-check form-switch pt-4">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
                            <label class="form-check-label" htmlFor="switchCheckChecked">I have cat(s)</label>
                        </div>
                        <div class="form-check form-switch pt-4">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
                            <label class="form-check-label" htmlFor="switchCheckChecked">I have dog(s)</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <textarea rows="4" placeholder="Parking Information and any other directions?"></textarea>
                    </div>
                </div> */}
                <div className="text-center ea_btn mt-0 mb-5">
                    {/* <button type="submit" className="theme-btn2 ea_rem_btn">
                        Remove Address
                    </button> */}
                    <button type="submit" className="theme-btn2">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;