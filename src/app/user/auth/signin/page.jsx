"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";

// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { setUser } from "../../../lib/slices/authslice";
// import { showErrorToast, showSuccessToast } from "@/lib/toast";
// import Spinner from "@/components/Spinner";
const Signin = () => {
    // const dispatch = useDispatch();
    // const router = useRouter();
    // const [fileError, setFileError] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    // const [previewImage, setPreviewImage] = useState("/images/emp_img1.png"); // Default image
    // const [formData, setFormData] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     phNumber: "",
    //     city: "",
    //     AdminImage: null,
    // });

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
            <div className="auth_container">
                <div className="auth_head">
                    <h2>Continue To Login</h2>
                    <p>Please Enter Your Details</p>
                </div>
                <form >
                    <input
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <div className="text-center">
                        <button type="submit" className="theme-btn2 w-100">
                            {/* {loading ? <Spinner /> : "Login"} */}
                            Login
                        </button>
                        {/* <div className="mt-4">
                            {user && <p className="success  text-success">Welcome, {user.name}!</p>}
              {error && <p className="error text-danger">{error}</p>}
                        </div> */}
                        <div className="register_link pb-2">
                            <h5>
                                Login with
                                {/* <Link href="signup"> Signup</Link> */}
                            </h5>
                        </div>
                        <div className="login_with_btns">
                            <button className="lwb_btn">
                                <span><FcGoogle /></span>
                                Sign in with Google
                            </button>
                            <button className="lwb_btn">
                                <span><FaApple /></span>
                                Sign in with Apple
                            </button>
                            <button className="lwb_btn">
                                <span><FaFacebook /></span>
                                Sign in with Facebook
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
