"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import MyModal from "@/components/MyModal";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
const Employees = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const adminId = useSelector((state) => state.auth.user?.id || "");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!adminId) {
      router.push("/auth/signin");
    } else {
      fetchServices();
    }
  }, [adminId]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServicesByAdminId?adminId=${adminId}`

      );
      setServices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  console.log(services)

  const [employeeName, setEmployeeName] = useState("");
  const [about, setAbout] = useState("");
  const [EmployeeImage, setEmployeeImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [workingDays, setWorkingDays] = useState([
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ].map(day => ({ day, isActive: false, startTime: "09:00", endTime: "18:00" })));
  const [availableServices, setAvailableServices] = useState(services);

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
    setWorkingDays(prevDays => prevDays.map(d =>
      d.day === day ? { ...d, startTime: openingTime, endTime: closingTime, isActive: true } : d
    ));
  };

  const handleServiceChange = (_id) => {
    setAvailableServices(prev => prev.includes(_id) ? prev.filter(s => s !== _id) : [...prev, _id]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("createdBy", adminId);
    formData.append("employeeName", employeeName);
    formData.append("about", about);
    if (EmployeeImage) formData.append("EmployeeImage", EmployeeImage);
    formData.append("workingDays", JSON.stringify(workingDays.filter(d => d.isActive)));
    formData.append("availableServices", JSON.stringify(availableServices));
    console.log(EmployeeImage);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/addEmployee`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSuccessToast("Employee added successfully!"); //
      console.log("Employee added successfully", response.data);
      closeModal();
      setAvailableServices([]);
      setEmployeeName("");
      setAbout("");
      setEmployeeImage(null);
    } catch (error) {
      console.error("Error adding employee", error);
      showErrorToast(error.response?.data?.message || "Error adding employee!");
    }
  };

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
          <div className="timings mt-5 mb-4">
            <h4>Working Days & Hours</h4>
            <div className="row gx-5 gy-3">
              {workingDays.map((day, index) => (
                <div className="col-6">
                  <div key={index} className="row align-items-center">
                    <div className="col-4">
                      <div className="auth_form_check auth_form_check2">
                        <input type="checkbox" className="form-check-input" name="auth_form_check2" id={`work_id=${index}`} defaultChecked={day.isActive} onChange={() => handleTimeChange(day.day, { openingTime: day.startTime, closingTime: day.endTime })} />
                        <label htmlFor={`work_id=${index}`} className="form-check-label">{day.day}</label>
                      </div>
                    </div>
                    <div className="col-8">
                      <MultiRangeSlider2 onSubmit={(time) => handleTimeChange(day.day, time)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="timings mt-5">
            <h4>Available Services</h4>
            <div className="d-flex align-items-center gap-3 mt-4">
              {services.map((service, index) => (
                <div key={index} className="auth_form_check auth_form_check2">
                  <input className="form-check-input" name="form-check-input" defaultChecked={availableServices.includes(service._id)} onChange={() => handleServiceChange(service._id)} type="checkbox" id={service.Title} />
                  <label className="form-check-label" htmlFor={service.Title}>
                    {service.Title}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleSubmit}>Add Employee</button>
        </div>
      </MyModal>
      <div className='employees_dash'>
        <h3>Hair Services</h3>
        <div className="row mt-3 mb-4">
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <div className="ed_item_border" onClick={openModal}><span><CiCirclePlus /></span></div>
            </div>
          </div>
        </div>
        <h3>Nails Services</h3>
        <div className="row mt-3 mb-4">
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <div className="ed_item_border" onClick={openModal}><span><CiCirclePlus /></span></div>
            </div>
          </div>
        </div>
        <h3>Skin Services</h3>
        <div className="row mt-3 mb-4">
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <Image
                src="/images/emp_img1.png"
                width={144}
                height={144}
                className="emp_img"
                alt="Frame"
              />
              <h5>Ann Merry</h5>
            </div>
          </div>
          <div className="col-3">
            <div className="ed_item">
              <div className="ed_item_border" onClick={openModal}><span><CiCirclePlus /></span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Employees