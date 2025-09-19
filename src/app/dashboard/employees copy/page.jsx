"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import MyModal from "@/components/MyModal";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
const Employees = () => {
  const router = useRouter();
  const [active, setActive] = useState('allReviews'); // Default active button
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const adminId = useSelector((state) => state.auth.user?._id || "");
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
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServices?adminId=${adminId}`,
      );
      setServices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServices?adminId=${adminId}`,
      );
      setServices(response.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  // if (adminId == "") {
  //   router.push("/auth/signin");
  // } else {
  //   useEffect(() => {
  //     handleSubServiceSubmit()
  //   }, [])
  // }
  // const handleSubServiceSubmit = async (e) => {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServicesByAdminId?adminId=${adminId}`
  //   );
  //   const data = response.data;
  //   setServices(data.data)
  // }
  // console.log(services)

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
              <input type="file" name="" id="" />
              <span><CiCirclePlus /></span>
              <h5>Add Photo</h5>
            </div>
            <div className="aem_input">
              <input type="text" placeholder="Name of the Employee" />
              <textarea type="text" rows="3">About the Employee</textarea>
            </div>
          </div>
          <div className="row timings mt-5 mb-4 gx-5">
            <div className="col-3">
              <h4>Working Days </h4>
            </div>
            <div className="col-3">
              <h4>Hours of Operation</h4>
            </div>
            <div className="col-3">
              <h4>Working Days </h4>
            </div>
            <div className="col-3">
              <h4>Hours of Operation</h4>
            </div>
          </div>

          <div className="row gx-5 gy-3">
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      MONDAY
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      Tuesday
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      Wednesday
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      Thursday
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      Friday
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      Saturday
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="auth_form_check auth_form_check2">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                    <label className="form-check-label" htmlFor="flexCheckChecked232">
                      Sunday
                    </label>
                  </div>
                </div>
                <div className="col-8">
                  <div className="multi_range">
                    <MultiRangeSlider2 />
                    <span className='multi_range_center'>12:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 timings">
            <h4>Available Services</h4>
            <div className="d-flex align-items-center gap-3 mt-4">
              {services.map((service, index) => (
                <div key={index} className="auth_form_check auth_form_check2">
                  <input className="form-check-input" type="checkbox" id={service.Title} />
                  <label className="form-check-label" htmlFor={service.Title}>
                    {service.Title}
                  </label>
                </div>
              ))}
            </div>
          </div>
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