"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import MyModal from "@/components/MyModal";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import axios from "axios";
import MultiRangeSlider3 from "@/components/MultiRangeSlider3";
import Spinner from "@/components/Spinner";
import AuthGuard from "@/components/AuthGuard";
const Employees = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [adminId, setAdminId] = useState(null); // State to store adminId
  const [loading, setLoading] = useState(true); // Loading state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isLoading2, setIsLoading2] = useState(false); // Loading state
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [token, setToken] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [about, setAbout] = useState("");
  const [EmployeeImage, setEmployeeImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const [workingDays, setWorkingDays] = useState([
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ].map(day => ({ day, isActive: false, startTime: "09:00", endTime: "18:00" })));
  const [availableServices, setAvailableServices] = useState(services);
  const [refreshKey, setRefreshKey] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  const [employees, setEmployees] = useState([]); // Init
  const [groupedEmployees, setGroupedEmployees] = useState({});
  const validateFields = () => {
    const errors = {};

    // Check each field for emptiness
    if (!employeeName.trim()) errors.employeeName = "Employee name is required.";
    if (!email.trim()) errors.email = "Employee Email is required.";
    if (!password.trim()) errors.password = "Employee Password is required.";
    if (!about.trim()) errors.about = "About is required.";
    // if (availableServices.length === 0) errors.availableServices = "Please select at least one service.";
    if (workingDays.filter(day => day.isActive).length === 0) errors.workingDays = "Please activate at least one working day.";
    if (!EmployeeImage) errors.EmployeeImage = "Employee image is required.";

    return errors;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Parse user from localStorage
    const storedToken = localStorage.getItem("token");
    if (user && (user.id || user._id) && !storedToken) {
      setAdminId(user.id || user._id); // Set adminId if available
      setToken(storedToken)
    } else {
      console.error("User not found or missing 'id' property");
      router.push("/auth/add-services"); // Redirect to add services if user is invalid
    }
  }, [router]); // Runs once on mount


  useEffect(() => {
    if (adminId) {
      // Fetch services once adminId is available
      const timer = setTimeout(() => {
        fetchServices();
        fetchSubServices();
        fetchEmployees();
      }, 1000);
      return () => clearTimeout(timer); // Clean up timeout on component unmount
    }
  }, [adminId, refreshKey]); // Runs when adminId changes

  const fetchEmployees = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllStylists?adminId=${adminId}`
      );

      if (response.data.success) {
        const employees = response.data.data;
        setEmployees(employees); // Update employees state
        groupByCategory(employees); // Group employees by category
      } else {
        console.error("Failed to fetch employees:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const groupByCategory = (data) => {
    const grouped = data.reduce((acc, employee) => {
      const services = employee.availableServices;

      if (services.length === 0) {
        if (!acc["Unassigned"]) acc["Unassigned"] = [];
        acc["Unassigned"].push(employee);
      } else {
        services.forEach((service) => {
          const title = service?.serviceId?.Title;
          if (!title) return;

          if (!acc[title]) acc[title] = [];
          acc[title].push(employee);
        });
      }

      return acc;
    }, {});

    setGroupedEmployees(grouped);
  };

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
      // setSubServices(response.data.data || []); // Update services state
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const fetchSubServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getSubServicesByAdmin?adminId=${adminId}`
      );
      setServices(response.data.data || []); // Update services state
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeImage(file);
      // Generate a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTimeChange = (day, { openingTime, closingTime }) => {
    setWorkingDays((prevDays) =>
      prevDays.map((d) =>
        d.day === day
          ? { ...d, startTime: openingTime, endTime: closingTime, isActive: true }
          : d
      )
    );
  };

  const handleServiceChange = (_id) => {
    setAvailableServices(prev => prev.includes(_id) ? prev.filter(s => s !== _id) : [...prev, _id]);
  };

  const handleSubmit = async () => {
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Store the errors in state
      showErrorToast("Please fill in all required fields.");
      return; // Stop submission if there are errors
    }

    setIsLoading2(true);

    const formData = new FormData();
    formData.append("createdBy", adminId);
    formData.append("employeeName", employeeName);
    formData.append("about", about);
    if (EmployeeImage) formData.append("EmployeeImage", EmployeeImage);
    formData.append("workingDays", JSON.stringify(workingDays.filter(d => d.isActive)));
    formData.append("availableServices", JSON.stringify(availableServices));
    formData.append("email", email);
    formData.append("password", password);
    // if (availableServices.length === 0) {
    //   showErrorToast("Please select at least one service.");
    //   return; // Prevent form submission
    // }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/stylistLogin`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSuccessToast("Employee added successfully!"); //
      setRefreshKey(prev => prev + 1);
      console.log("Employee added successfully", response.data);
      closeModal();
      setAvailableServices([]);
      setEmployeeName("");
      setEmail("");
      setPassword("");
      setAbout("");
      setEmployeeImage(null);
      setPreview(null)
      setValidationErrors({});
    } catch (error) {
      console.error("Error adding employee", error);
      showErrorToast(error.response?.data?.message || "Error adding employee!");
    } finally {
      setIsLoading2(false);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <MyModal isOpen={isModalOpen} onClose={closeModal} myModalContent="emp_content">
        <div className="add_employee">
          <div className="d-flex align-items-start justify-content-between">
            <h5 className="ae_heading">Add Employee</h5>
            <button className="btn myModal-close" type="button" onClick={closeModal}>X</button>
          </div>
          <div className="aem_top">
            <div className="at_input">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <h5>Add Photo</h5>
              {preview && (
                <Image src={preview} alt="Preview" width={100} height={100} />
              )}

            </div>
            <div className="aem_input">
              <input type="text" placeholder="Name of the Employee" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
              <textarea rows="3" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About the Employee" />
            </div>
          </div>
          <div className="timings mt-4 mb-4">
            <h4>Working Days & Hours</h4>
            <div className="row gx-5 gy-2">
              {workingDays.map((day, index) => (
                <div key={index} className="col-6">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div className="auth_form_check auth_form_check2">
                        <input type="checkbox" className="form-check-input" name="auth_form_check2" id={`work_id=${index}`} defaultChecked={day.isActive} onChange={() => handleTimeChange(day.day, { openingTime: day.startTime, closingTime: day.endTime })} />
                        <label htmlFor={`work_id=${index}`} className="form-check-label">{day.day}</label>
                      </div>
                    </div>
                    <div className="col-8">
                      <MultiRangeSlider3 onSubmit={(time) => handleTimeChange(day.day, time)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="timings mt-4">
            <h4>Available Services</h4>
            <div className="d-flex align-items-center gap-3 mt-4">
              {services.map((service, index) => (
                <div key={index} className="auth_form_check auth_form_check2">
                  <input className="form-check-input" name="form-check-input" defaultChecked={availableServices.includes(service._id)} onChange={() => handleServiceChange(service._id)} type="checkbox" id={service.title} />
                  <label className="form-check-label" htmlFor={service.title}>
                    {service.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button className="btn det_ins mt-4" disabled={isLoading2} onClick={handleSubmit}>
            {isLoading2 ? <Spinner /> : "Add Employee"}</button>
        </div>
      </MyModal>
      {console.log("emplyes:", groupedEmployees)}

      <div className="employees_dash">
        {employees.length && Object.keys(groupedEmployees).length ? (
          Object.keys(groupedEmployees).map((category) => (

            <div key={category}>
              <h3>{category}</h3>
              <div className="row mt-3 mb-4">
                <div className="col-10 pe-4">
                  <div className="row emp_row">
                    {groupedEmployees[category].map((employee) => (
                      <div className="col-3" key={employee._id}>
                        <div className="ed_item">
                          <Image
                            src={employee?.employeeImage ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${employee?.employeeImage}` : "/images/default.png"}
                            width={144}
                            height={144}
                            className="emp_img"
                            alt={employee.employeeName}
                          />
                          <h5>{employee.employeeName}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-2">
                  <div className="ed_item">
                    <div className="ed_item_border" onClick={openModal}>
                      <span>
                        <CiCirclePlus />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3>Pls add sub services</h3>
            <div className="row mt-3 mb-4">
              <div className="col-12">
                <div className="ed_item align-items-start">
                  <div className="ed_item_border" onClick={openModal}>
                    <span>
                      <CiCirclePlus />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </div>
    </>
  )
}

const ProtectedEmployeesDashboard = () => (
  <AuthGuard>
    <Employees />
  </AuthGuard>
);

export default ProtectedEmployeesDashboard;
