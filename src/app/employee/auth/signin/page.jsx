"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    const token = localStorage.getItem("AccessToken");
    const userData = localStorage.getItem("emp_data");

    if (token && userData) {
      router.replace("/employee/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/stylistLogin`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { success, msg, data, accessToken } = response.data;

      if (success && accessToken && data) {
        localStorage.setItem("AccessToken", accessToken);
        localStorage.setItem("emp_data", JSON.stringify(data));

        showSuccessToast(msg || "Login successful!");
        router.replace("/employee/dashboard");
      } else {
        throw new Error(msg || "Invalid response from server");
      }
    } catch (err) {
      const message =
        err.response?.data?.msg || err.message || "Login failed!";
      setError(message);
      showErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null; // prevent hydration mismatch

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container">
        <div className="auth_head">
          <h2>Getting Started</h2>
          <p>Elevate your salon with a seamless setup, styled for success.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-center">
            <button type="submit" disabled={loading} className="theme-btn2">
              {loading ? <Spinner /> : "Login"}
            </button>
            <div className="mt-4">
              {error && <p className="error text-danger">{error}</p>}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;