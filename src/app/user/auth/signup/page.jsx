"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { setUser } from "../../../lib/slices/authslice";
// import { showErrorToast, showSuccessToast } from "@/lib/toast";
// import Spinner from "@/components/Spinner";
const Signup = () => {
    // const dispatch = useDispatch();
    // const router = useRouter();
    const [countries, setCountries] = useState([]);
    const [countriesName, setCountriesName] = useState([]);
    // const [fileError, setFileError] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    // const [previewImage, setPreviewImage] = useState("/images/emp_img1.png"); // Default image
    const [selectedCountry, setSelectedCountry] = useState("+92");
    // const [formData, setFormData] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     phNumber: "",
    //     city: "",
    //     AdminImage: null,
    // });

    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const countryList = data.map((country) => ({
                    name: country.name.common,
                    code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
                }));

                // Remove duplicates
                const uniqueCountries = Array.from(new Map(countryList.map(c => [c.code, c])).values());
                const uniqueCountriesName = Array.from(new Map(countryList.map(c => [c.code, c])).values());

                setCountries(uniqueCountries);
            })
            .catch((error) => console.error("Error fetching country data:", error));
    }, []);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     if (!file) return;

    //     // Validate file type (only images)
    //     if (!file.type.startsWith("image/")) {
    //         setFileError("Only image files are allowed.");
    //         return;
    //     }

    //     // Validate file size (2MB limit)
    //     if (file.size > 2 * 1024 * 1024) {
    //         setFileError("File size should be less than 2MB.");
    //         return;
    //     }

    //     setFileError(""); // Clear error if validation passes

    //     // Preview the selected image
    //     const imageUrl = URL.createObjectURL(file);
    //     setPreviewImage(imageUrl);

    //     setFormData((prev) => ({ ...prev, AdminImage: file }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!formData.AdminImage) {
    //         setFileError("Please select a profile image before submitting.");
    //         return;
    //     }

    //     const formDataToSend = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => {
    //         if (value !== null) {
    //             formDataToSend.append(key, value);
    //         }
    //     });

    //     try {
    //         setLoading(true)
    //         const response = await axios.post(
    //             `${process.env.NEXT_PUBLIC_API_URL}/admin/signup`,
    //             formDataToSend,
    //             {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             }
    //         );

    //         const { data, accessToke } = response.data;

    //         const userData = {
    //             id: data.id,
    //             email: data.email,
    //             name: data.name,
    //             profileImage: data.profileImage,
    //         };
    //         showSuccessToast("Signup Successfully!"); //
    //         localStorage.setItem('user', JSON.stringify(response?.data?.data));
    //         localStorage.setItem("token", accessToke);
    //         dispatch(setUser({ user: data, token: accessToke }));

    //         router.replace("/auth/pricing");
    //     } catch (error) {
    //         setError("Signup failed:", error.response?.data || error.message);
    //         setLoading(false)
    //         showErrorToast(error.response?.data?.message || "Signup Failed!");
    //     } finally {
    //         setLoading(false)
    //     }
    // };

    return (
        <div className="content align-self-center mw-600">
            <div className="auth_container mw-600">
                <div className="auth_head w-100">
                    <h2>Continue To Sign Up</h2>
                    <p>Get started in minutes and transform your business</p>
                </div>
                <form >
                    <div className="row">
                        <div className="col-6">
                            <input type="text" name="firstName" placeholder="First Name" required />
                        </div>
                        <div className="col-6">
                            <input type="text" name="lastName" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <select onChange={(e) => setSelectedCountry(e.target.value)}>
                                <option value="+92">+92</option>
                                {countries.map((country) => (
                                    <option key={`${country.name}-${country.code}`} value={country.code}>
                                        {country.code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-10">
                            <input type="tel" name="phNumber" placeholder="Phone number" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <select name="city" required>
                                <option value="">Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="theme-btn2">
                            {/* {loading ? <Spinner /> : "Sign Up"} */}
                            Sign Up
                        </button>
                        {/* {error && <p className="error text-danger">{error}</p>} */}
                        <div className='register_link'>
                            <h5>Already have an account? <Link href="signin">Signin</Link></h5>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
