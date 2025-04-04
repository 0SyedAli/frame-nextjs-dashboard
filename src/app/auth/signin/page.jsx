"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, clearAuthState } from "../../../lib/slices/authslice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spinner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false); // Prevent hydration issues

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, token, user } = useSelector((state) => state.auth);
  useEffect(() => { 
    console.log("signin Rendered");
    
  }, [])
  useEffect(() => {
    setIsClient(true); // Mark as client-side rendering

    if (token) {
      router.replace("/dashboard"); // Redirect if logged in
    }

    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch, user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin({ email, password })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        router.replace("/dashboard"); // Redirect on successful login
      }
    });
  };

  if (!isClient) return null; // Prevent mismatched server & client rendering

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
              {user && <p className="success  text-success">Welcome, {user.name}!</p>}
              {error && <p className="error text-danger">{error}</p>}
            </div>
            <div className="register_link">
              <h5>
                Don't have an account?
                <Link href="signup"> Signup</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;