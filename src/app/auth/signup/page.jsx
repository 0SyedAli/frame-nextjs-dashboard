"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setUser } from "../../../lib/slices/authslice";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Spinner from "@/components/Spinner";
import countriesData from "../../../../data/allcountries.json";
const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("/images/unknown_user.jpg"); // Default image
  const [selectedCountryCode, setSelectedCountryCode] = useState(""); // Store selected country code
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phNumber: "",
    city: "",
    AdminImage: null,
  });
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type (only images)
    if (!file.type.startsWith("image/")) {
      setFileError("Only image files are allowed.");
      return;
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB.");
      return;
    }

    setFileError(""); // Clear error if validation passes

    // Preview the selected image
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    setFormData((prev) => ({ ...prev, AdminImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.AdminImage) {
      setFileError("Please select a profile image before submitting.");
      return;
    }

    // Prepend selected country code to phone number before sending data
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
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/signup`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data, signupToken } = response?.data;

      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        profileImage: data.profileImage,
      };
      showSuccessToast("Signup Successful!");
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      localStorage.setItem("token", signupToken);
      dispatch(setUser({ user: data, token: signupToken }));

      router.replace("/auth/otp");
    } catch (error) {
      setError("Sign Up failed:", error.response?.data || error.message);
      setLoading(false);
      showErrorToast(error.response?.data?.message || "Signup Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container mw-600">
        <div className="auth_head w-100">
          <h2>Sign Up</h2>
          <p>Get started in minutes and transform your business</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 d-flex align-items-end mb-4 gap-3">
              <div className="upload_user_image text-start">
                <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                  <Image src={previewImage} width={118} height={118} alt="Profile Preview" />
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*" // Restrict file selection to images only
                  onChange={handleFileChange}
                  style={{ display: "none" }} // Hide default file input UI
                />
              </div>
              <div className="file_error d-inline text-start pb-2">
                {fileError ? (
                  <p className="text-danger m-0 h6">{fileError}</p>
                ) : (
                  <p className="m-0 h6">Upload Picture</p>
                )}
              </div>
            </div>
            <div className="col-6">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            </div>
            <div className="col-6">
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="col-6">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              {/* <select onChange={handleCountryChange}>
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    (+{country.code}) - {country.name}
                  </option>
                ))}
              </select> */}
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
          </div>
          <div className="row">
            <div className="col-12">
              {/* <select name="city" onChange={handleChange} required>
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select> */}
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
            <button type="submit" disabled={loading} className="theme-btn2">
              {loading ? <Spinner /> : "Sign Up"}
            </button>
            {error && <p className="error text-danger">{error}</p>}
            <div className='register_link'>
              <h5>Already have an account? <Link href="signin">Sign in</Link></h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;