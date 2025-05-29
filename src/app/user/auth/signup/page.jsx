"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import countriesData from "../../../../../data/allcountries.json";
import Spinner from "@/components/Spinner";
const Signup = () => {
    const router = useRouter();
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState(""); // Store selected country code
    const [isClient, setIsClient] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        password: "",
    });

    useEffect(() => {
        setIsClient(true); // Mark as client-side rendering
        const token = localStorage.getItem("userAccessToken")
        const user_data = localStorage.getItem("user_data")

        if (token && user_data) {
            router.replace("/user/dashboard"); // Redirect if logged in
        }

    }, [router]);

    const handleCountryChange = (e) => {
        setSelectedCountryCode(e.target.value); // Update selected country code
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phNumber") {
            const sanitizedValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
            setFormData((prev) => ({
                ...prev,
                [name]: sanitizedValue, // Store the plain phone number
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

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

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable the button on submit

        const formDataToSend = new FormData();
        Object.entries({
            ...formData,
            phNumber: `${selectedCountryCode}${formData.phNumber}`, // Combine country code and phone number
        }).forEach(([key, value]) => {
            if (value !== null) {
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
            );
            showSuccessToast(response?.data?.msg || "Signup Successfully!");
            setError(null);
            localStorage.setItem("user_data", JSON.stringify(response?.data?.data));
            router.push("otp");
        } catch (error) {
            setError(error?.response?.data?.error?.message || error?.response?.data?.msg || error?.msg);
            showErrorToast(error.response?.data?.msg || "Signup Failed!");
            setIsLoading(false); // Re-enable button on error
        } finally {
            setIsLoading(false);
        }
    };

    if (!isClient) return null;

    return (
        <div className="content align-self-center mw-600">
            <div className="auth_container mw-600">
                <div className="auth_head w-100">
                    <h2>Continue To Sign Up</h2>
                    <p>Get started in minutes and transform your business</p>
                </div>
                <form onSubmit={handleSignup}>
                    <div className="row gy-4">
                        <div className="col-6">
                            <input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} />
                        </div>

                        <div className="col-6">
                            <input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-3">
                            <select onChange={handleCountryChange}>
                                <option value="+1">+1 - US</option>
                            </select>
                        </div>
                        <div className="col-9">
                            <input
                                type="number"
                                name="phNumber"
                                placeholder="Phone number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <select name="city" onChange={handleChange} required>
                                <option disabled="">Select City</option>
                                <option value="United States">United States</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='text-center'>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" disabled={isLoading} className="theme-btn2 w-100">
                            {isLoading ? <Spinner /> : "Sign Up"}
                        </button>
                        {/* {error && <p className="error text-danger">{error}</p>} */}
                        <div className='register_link'>
                            <h5>Already have an account? <Link href="signin">Sign In</Link></h5>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;