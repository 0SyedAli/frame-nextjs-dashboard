"use client"
import Image from "next/image";
import { useState } from "react";
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import MyModal from "@/components/MyModal";
import { CiCirclePlus } from "react-icons/ci";
const Employees = () => {
  const [active, setActive] = useState('allReviews'); // Default active button
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <MyModal isOpen={isModalOpen} onClose={closeModal} myModalContent="emp_content">
        <div className="add_employee">
          <h5 className="ae_heading">Add Employee</h5>
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
          <div className="d-flex align-items-center justify-content-between mt-5">
            <div>
              <div className="auth_form_check auth_form_check2">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2021" />
                <label className="form-check-label" htmlFor="flexCheckChecked2021">
                  Hair Service - 1
                </label>
              </div>
            </div>
            <div>
              <div className="auth_form_check auth_form_check2">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2022" />
                <label className="form-check-label" htmlFor="flexCheckChecked2022">
                  Hair Service - 2
                </label>
              </div>
            </div>
            <div>
              <div className="auth_form_check auth_form_check2">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2023" />
                <label className="form-check-label" htmlFor="flexCheckChecked2023">
                  Hair Service - 3
                </label>
              </div>
            </div>
            <div>
              <div className="auth_form_check auth_form_check2">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2024" />
                <label className="form-check-label" htmlFor="flexCheckChecked2024">
                  Hair Service - 4
                </label>
              </div>
            </div>
            <div>
              <div className="auth_form_check auth_form_check2">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2025" />
                <label className="form-check-label" htmlFor="flexCheckChecked2025">
                  Hair Service - 5
                </label>
              </div>
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