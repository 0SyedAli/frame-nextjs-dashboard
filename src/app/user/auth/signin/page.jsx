"use client";
import React, { useEffect, useState } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Spinner from "@/components/Spinner";
import { object, string } from "yup";
import axios from "axios";
import Link from "next/link";
import GoogleSignIn from "@/components/GoogleSignIn";
const signinValidation = object().shape({
    email: string().email("Invalid email format").required("Email is required"),
    password: string()
        // .min(8, "Password must be at least 8 characters")
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#.$!%*?&])/,
        //     "Password must contain uppercase, lowercase, digit and special character"
        // )
        .required("Password is required"),
});

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [isClient, setIsClient] = useState(false); // Prevent hydration issues

    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Mark as client-side rendering
        const token = localStorage.getItem("userAccessToken")
        const user_data = localStorage.getItem("user_data")

        if (token && user_data) {
            router.replace("/user/dashboard"); // Redirect if logged in
        }

    }, [router]);

    const handleSignin = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable the button on submit

        const requestData = {
            email: email,
            password: password,
        };

        try {
            // Validate request data
            await signinValidation.validate(requestData);

            // Make API request
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
                requestData,
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
            router.push("otp")
        } catch (error) {
            // Handle validation or request errors
            setError(error?.response?.data?.msg || error?.msg);
            showErrorToast(error.response?.data?.msg || "Signup Failed!");
            setIsLoading(false); // Re-enable button on error
        } finally {
            setIsLoading(false);
        }
    };
    if (!isClient) return null; // Prevent mismatched server & client rendering

    return (
        <div className="content align-self-center mw-600">
            <div className="auth_container">
                <div className="auth_head">
                    <h2 >Continue To Login</h2>
                    <p>Please Enter Your Details</p>
                </div>
                <form onSubmit={handleSignin} >
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete=""
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-center w-100">
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit" disabled={isLoading} className="theme-btn2 w-100">
                            {isLoading ? <Spinner /> : "Login"}
                        </button>

                    </div>
                </form>
                <div className="w-100 text-center">
                    <div className="register_link pt-0 pb-2">
                        <h5>
                            Login with
                            {/* <Link href="signup"> Signup</Link> */}
                        </h5>
                    </div>
                    <div className="login_with_btns">
                        {/* <button className="lwb_btn">
                                <span><FcGoogle /></span>
                                Sign in with Google
                            </button> */}
                        <GoogleSignIn />
                        <button className="lwb_btn">
                            <span><FaApple /></span>
                            Sign in with Apple
                        </button>
                        <button className="lwb_btn">
                            <span><FaFacebook /></span>
                            Sign in with Facebook
                        </button>
                    </div>
                    <div className='register_link'>
                        <h5>Don't have an account? <Link href="signup">Sign Up</Link></h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
