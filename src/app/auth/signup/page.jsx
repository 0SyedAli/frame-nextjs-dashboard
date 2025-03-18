"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setUser } from "../../../lib/slices/authslice";
const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("/images/emp_img1.png"); // Default image
  const [selectedCountry, setSelectedCountry] = useState("+92");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pHnumber: "",
    city: "",
    AdminImage: null,
  });

  const cities = ["City1", "City2", "City3"];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/signup`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data, accessToke } = response.data;

      const userData = {
        id: data.id,
        email: data.email,
        name: data.name,
        profileImage: data.profileImage,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", accessToke);
      dispatch(setUser({ user: userData, token: accessToke }));

      router.replace("/auth/pricing");
    } catch (error) {
      setError("Signup failed:", error.response?.data || error.message);
      setLoading(false)
    } finally {
      setLoading(false)
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
              <div className="file_error d-inline text-start">
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
            <div className="col-2">
              <select onChange={(e) => setSelectedCountry(e.target.value)}>
                <option value="+92">+92</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>{country.code}</option>
                ))}
              </select>
            </div>
            <div className="col-10">
              <input type="tel" name="pHnumber" placeholder="Phone number" onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <select name="city" onChange={handleChange} required>
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='text-center'>
            <button type="submit" disabled={loading} className="theme-btn2">
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="error text-danger">{error}</p>}
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
