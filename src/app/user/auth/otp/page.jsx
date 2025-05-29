"use client";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const OTP = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false); // Loading state for Resend OTP
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState(""); // Message for Resend OTP

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (!userData) {
      // Redirect to signin if userData doesn't exist
      router.push('/user/auth/signin');
    } else if (userData?.customerAddress) {
      router.push('/user/dashboard');
    } else {
      // Set user details if userData exists
      setUserEmail(userData?.email || "");
      setUserId(userData?.id || userData?._id || "");
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
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/verifyOTP`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if response status is successful
      if (response?.status === 200 || response?.status === 201) {
        // Handle successful response
        localStorage.setItem("user_data", JSON.stringify(response?.data?.data));
        localStorage.setItem("userAccessToken", response?.data?.accessToken);
        showSuccessToast(response?.data?.msg || "OTP has been verified successfully!");
        router.push("appointment");
      } else {
        // Handle unexpected success responses with non-2xx status codes
        throw new Error(response?.data?.msg || "An unexpected error occurred.");
      }
    } catch (error) {
      // Handle error
      const errorMessage = error.response?.data?.msg || "An error occurred. Please try again later.";
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

  const resendOTP = async () => {
    setIsResending(true);
    setResendMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/OTP`,
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful resend
      setResendMessage("A new OTP has been sent to your email.");
      showSuccessToast("A new OTP has been sent to your email.!")
      console.log("OTP Resent Successfully", response.data);
    } catch (err) {
      // Handle resend error
      showErrorToast(err.response?.data?.msg || "Failed to resend OTP. Please try again.")
      setError(err.response?.data?.msg || "Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

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
            onClick={resendOTP}
            style={{
              color: isResending ? "#aaa" : "#7843AA",
              cursor: isResending ? "not-allowed" : "pointer",
            }}
          >
            {isResending ? "Resending..." : "Resend Code"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OTP;
