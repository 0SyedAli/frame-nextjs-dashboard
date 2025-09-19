"use client"
import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import Spinner from '@/components/Spinner';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';

const AddSubService = () => {
  const [services, setServices] = useState([]); // Initialize as an empty array
  const [employees, setEmployees] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  // const adminId = useSelector((state) => state.auth.user?._id || "");
  // const token = useSelector((state) => state?.auth?.token || "");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  // const [servicePoints, setServicePoints] = useState("");
  const [subServiceImages, setSubServiceImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [adminId, setadminId] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user && (!user?.id || !user?._id) && !storedToken) {
      router.push('/auth/signin')
    }
    else {
      setadminId(user?.id || user?._id)
      setToken(storedToken)
    }
  }, [])


  useEffect(() => {
    if (adminId) {
      // Fetch services and employees once adminId is available
      setLoading(true);
      const timer = setTimeout(() => {
        fetchServices();
        fetchEmployees();
      }, 1000);
      return () => clearTimeout(timer); // Clean up timeout on component unmount
    }
  }, [adminId]); // Runs when adminId changes

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServices?adminId=${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data.data || []); // Update services state
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllStylists?adminId=${adminId}`
      );
      setEmployees(response.data.data || []); // Update employees state
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handleServiceChange = (e) => {
    const selectedId = e.target.value;
    setServiceId(selectedId);

    const selectedService = services.find((s) => s._id === selectedId);
    if (selectedService?.categoryId?._id) {
      setCategoryId(selectedService.categoryId._id);
    }
  };
  const handleSubServiceSubmit = async (e) => {
    e.preventDefault();
    if (
      !serviceTitle ||
      !serviceDescription ||
      !servicePrice ||
      !serviceId ||
      !categoryId
    ) {
  alert("Please fill all fields.");
  return;
}

const formData = new FormData();
formData.append("adminId", adminId);
formData.append("serviceId", serviceId);
formData.append("categoryId", categoryId);
formData.append("title", serviceTitle);
formData.append("text", serviceDescription);
formData.append("price", servicePrice);
// formData.append("employeeId", employeeId);
// formData.append("servicePoints", servicePoints);

// Append all images
subServiceImages.forEach((file) => {
  formData.append("subServiceImages", file);
});
setLoading2(true);
try {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/addSubService`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response?.data?.success) {
    // Clear form fields
    setServiceTitle("");
    setServiceDescription("");
    setServicePrice("");
    // setServicePoints("");
    setSubServiceImages([]);
    setPreviewImages([]);
    setServiceId("");
    setEmployeeId("");
    showSuccessToast(response?.data?.msg); //
  }
} catch (error) {
  console.error("Subservice creation failed", error);
  showErrorToast(error.response?.data?.message || "Error adding Sub Service!");
} finally {
  setLoading2(false);
}
  };

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setSubServiceImages(files);

  // Generate preview URLs
  const previewUrls = files.map((file) => URL.createObjectURL(file));
  setPreviewImages(previewUrls);
};

if (loading) return <Spinner />;
return (
  <div className='add_service2_dash'>
    <form onSubmit={handleSubServiceSubmit}>
      <div className="row align-items-end">
        <div className="col-7">
          <div className="row">
            <div className="col-12">
              {/* <div className="auth_upload_bussiness_logo">
                  <input
                    type="file"
                    multiple
                    required
                    accept="image/*"
                  />
                  <label htmlFor="">
                    <div className="aubl_img_container">
                      <span className="aic_icon">
                        <Image
                          src="/images/upload-icon.png"
                          width={16}
                          height={18}
                          className="pb-icon"
                          alt="Frame"
                        />
                      </span>
                    </div>
                    <h5>Upload Subservices Pictures</h5>
                  </label>
                </div> */}
              <div className="auth_upload_bussiness_logo">

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewImages.length === 0 ? (
                  <label htmlFor="">
                    <div className="aubl_img_container">
                      <span className="aic_icon">
                        <Image
                          src="/images/upload-icon.png"
                          width={16}
                          height={18}
                          className="pb-icon"
                          alt="Frame"
                        />
                      </span>
                    </div>
                    <h5>Upload Subservices Pictures</h5>
                  </label>
                ) : (
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {previewImages.map((src, index) => (
                      <Image
                        key={index}
                        src={src}
                        width={100}
                        height={100}
                        alt={`Preview ${index + 1}`}
                        className="preview-thumbnail"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row as_form gy-4">
        <div className="col-12">
          <input
            type="text"
            placeholder="Service Title *"
            required
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
          />
        </div>
        <div className="col-12">
          <select
            value={serviceId}
            required
            onChange={handleServiceChange}
          >
            <option value="">Select Service Type *</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.Title}
              </option>
            ))}
          </select>
        </div>
        {employees && employees.length > 0 && (
          <div className="col-12">
            <select
              value={employeeId}
              required
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option>Select Employee *</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee?._id}>{employee?.employeeName}</option>
              ))}
            </select>
          </div>
        )}
        <div className="col-12">
          <textarea
            rows="5"
            placeholder='Description'
            onChange={(e) => setServiceDescription(e.target.value)}
          >{serviceDescription}</textarea>
        </div>
        {/* <div className="col-12">
            <input
              type="number"
              placeholder="Service Point"
              value={servicePoints}
              onChange={(e) => setServicePoints(e.target.value)}
            />
          </div> */}
        <div className="col-12">
          <div className="dollar_input">
            <span>$</span>
            <input
              type="number"
              value={servicePrice}
              required
              onChange={(e) => setServicePrice(e.target.value)}
            />
          </div>
        </div>
        <div className='col-12 pt-4 d-flex align-items-center justify-content-between'>
          <button type="submit" disabled={loading} className="theme-btn2">
            {loading2 ? <Spinner /> : "Sumbit"}
          </button>
          <Link href="/dashboard/services" className="btn theme-btn3" style={{ width: "240px" }}>Go back</Link>
        </div>
      </div>
    </form>
  </div>
);
};



const ProtectedAddSubServiceDashboard = () => (
  <AuthGuard>
    <AddSubService />
  </AuthGuard>
);

export default ProtectedAddSubServiceDashboard;