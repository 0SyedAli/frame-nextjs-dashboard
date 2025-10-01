"use client";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { setUser } from "../../../lib/slices/authslice";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const OTP = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false); // Loading state for Resend OTP
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState(""); // Message for Resend OTP

  // useEffect(() => {
  //   const userData = JSON.parse(localStorage.getItem("user"));
  //   if (!userData) {
  //     // Redirect to signup if userData doesn't exist
  //     router.push('/user/auth/signup');
  //   } else if (userData?.customerAddress) {
  //     router.push('/user/dashboard');
  //   } else {
  //     // Set user details if userData exists
  //     setUserEmail(userData?.email || "");
  //     setUserId(userData?.id || userData?._id || "");
  //   }
  // }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!userData) {
      // Redirect to signup if userData doesn't exist
      router.push('/auth/signup');
    } else {
      // Set user details if userData exists
      setUserEmail(userData || "");
      setToken(token || "");
    }
  }, []);

  const handleChange = (code) => {
    // Ensure only numeric input
    if (/^\d*$/.test(code)) {
      setCode(code);
    }
  };
  const verifyOTP = async () => {

    setIsLoading(true);
    setError("");
    setResendMessage("");

    const requestData = {
      email: userEmail,
      OTP: code,
      signupToken: token,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/verifyOTP`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, msg, data, accessToke } = response?.data;
      // Check if response status is successful
      if (success) {
        // Handle successful response
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        localStorage.setItem("token", accessToke);
        dispatch(setUser({ user: data, token: accessToke }));
        showSuccessToast(msg || "OTP has been verified successfully!");
        router.push("/auth/pricing");
      } else {
        // Handle unexpected success responses with non-2xx status codes
        throw new Error(msg || "An unexpected error occurred.");
      }
    } catch (error) {
      // Handle error
      const errorMessage =
        error.response?.data?.msg || "An error occurred. Please try again later.";
      showErrorToast(errorMessage);
      setError(errorMessage);

      // Log the error for debugging purposes
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      verifyOTP();
    } else {
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  // const resendOTP = async () => {
  //   setIsResending(true);
  //   setResendMessage("");
  //   setError("");

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/user/OTP`,
  //       { userId: userId },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Handle successful resend
  //     setResendMessage("A new OTP has been sent to your email.");
  //     showSuccessToast("A new OTP has been sent to your email.!")
  //     console.log("OTP Resent Successfully", response.data);
  //   } catch (err) {
  //     // Handle resend error
  //     showErrorToast(err.response?.data?.msg || "Failed to resend OTP. Please try again.")
  //     setError(err.response?.data?.msg || "Failed to resend OTP. Please try again.");
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container otp_container">
        <div className="auth_head">
          <h2 className="px-5">Verification Code</h2>
          <p>We have sent the verification code to your email address</p>
        </div>
        <form className="auth_otp" onSubmit={handleSubmit}>
          <OtpInput
            value={code}
            onChange={handleChange}
            numInputs={6}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            renderInput={(props) => (
              <input
                {...props}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault(); // Block non-numeric keys
                  }
                }}
              />
            )}
            inputStyle={{
              border: "1px solid #7843AA",
              borderRadius: "8px",
              width: "64px",
              height: "64px",
              fontSize: "25px",
              color: "#000000bd",
              fontWeight: "400",
              caretColor: "#ccc",
            }}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
          />
          <div className="text-center w-100 mt-3">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="theme-btn2 w-100" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
        <div className="resend_code text-center mt-3">
          {resendMessage && <p style={{ color: "green", marginBottom: "30px", fontSize: '18px' }}>{resendMessage}</p>}
          <p>Didn't receive the code?</p>
          <h5
            onClick={() => {
              router.push("/auth/signup")
            }}
            style={{
              color: "#7843AA",
              cursor: "pointer"
            }}
          >
            Pls sign up again
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OTP;
