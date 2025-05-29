"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import countriesData from "../../../../../data/allcountries.json";
import Spinner from "@/components/Spinner";
const ConfirmAddress = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        street: "",
        postcode: "",
        city: "",
        addressType: "",
        customerAddress: "",
    });

    useEffect(() => {
        const processCountries = () => {
            const countryList = countriesData
                .filter((country) => country.name && country.idd)
                .map((country) => ({
                    name: country.name.common,
                    code: parseInt(
                        `${country.idd.root || ""}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`.replace("+", "").trim()
                    ),
                }))
                .filter((c) => !isNaN(c.code)); // Ensure code is a valid number

            // Sort numerically by country code
            countryList.sort((a, b) => a.code - b.code);

            setCountries(countryList);
        };

        processCountries();
    }, [countriesData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const ConfirmAddress = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable the button on submit

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value.trim() !== "") { // Ensure the value is not empty or whitespace
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/updateProfie`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("userAccessToken")}`,
                    },
                }
            );
            localStorage.setItem("user_data", JSON.stringify(response?.data?.data));
            showSuccessToast(response?.data?.msg || "Signup Successfully!");
            setError(null);
            router.push("still-working");
        } catch (error) {
            setError(error?.response?.data?.msg || error?.msg);
            showErrorToast(error.response?.data?.msg || "Signup Failed!");
            setIsLoading(false); // Re-enable button on error
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="content w-100 p-0 align-items-start">
            <div className="auth_container bussiness confirm_address gap-4">
                <div className="auth_head">
                    <h2>Confirm Address</h2>
                </div>
                <div className='w-100 '>
                    <div className="ca_map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1529.5774774280023!2d-105.01570220665658!3d39.937923473807935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c757667ffdd3b%3A0x5991ac88edb59137!2s13238%20Alcott%20Cir%2C%20Broomfield%2C%20CO%2080020%2C%20USA!5e0!3m2!1sen!2s!4v1746483101139!5m2!1sen!2s" allowFullScreen="false" width="600" height="220" style={{ border: "1px", width: "100%" }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <form onSubmit={ConfirmAddress} className="next_confirm mt-4">
                        <h3>Address Details</h3>
                        {/* <input type="text" placeholder="Street & Flat No (House / Flat / Room Number)" /> */}
                        <input type="text" placeholder="Street" name="street" onChange={handleChange} />
                        <input type="text" placeholder="Postcode" name="postcode" onChange={handleChange} />
                        <select name="city" required onChange={handleChange}>
                            <option disabled="">Select City</option>
                            <option value="United States">United States</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <h3>Address Type</h3>
                        <input type="text" placeholder="Home" name="addressType" onChange={handleChange} />
                        <input type="text" placeholder="Custom Address" name="customerAddress" onChange={handleChange} />
                        <div className='text-center mt-3'>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                            <button type="submit" disabled={isLoading} className="theme-btn2 w-100">
                                {isLoading ? <Spinner /> : "Sumbit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default ConfirmAddress;

