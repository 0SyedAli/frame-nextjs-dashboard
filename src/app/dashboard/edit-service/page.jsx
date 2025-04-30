import AuthGuard from '@/components/AuthGuard';
import Image from 'next/image';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiPencilSimpleLineBold } from 'react-icons/pi';
const EditService = () => {
  return (
    <div className='add_service2_dash'>
      <form>
        <h4>Service #1</h4>
        <div className="row align-items-end">
          <div className="col-7">
            <div className="row">
              <div className="col-12">
                <div className="auth_upload_bussiness_logo">
                  <input
                    type="file"
                    multiple
                    required
                    accept="image/*"
                  // onChange={handleFileChange}
                  />
                  {/* {previewImages.length === 0 ? ( */}
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
                  {/* ) : (
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
                  )} */}
                </div>
              </div>
   
            </div>
          </div>
        </div>
        <div className="row as_form gy-5">
          <div className="col-12">
            <input type="text" placeholder="Username" />
          </div>
          <div className="col-12">
            <select>
              <option value="">Select City</option>
              <option>abc</option>
            </select>
          </div>
          <div className="col-12">
            <select>
              <option value="">Select City</option>
              <option>abc</option>
            </select>
          </div>
          <div className="col-12">
            <textarea rows="10">Description</textarea>
          </div>
          <div className="col-12">
            <div className="dollar_input">
              <span>$</span>
              <input type="text" placeholder="" />
            </div>
          </div>
          <div className='col-12 pt-4'>
            <button className="btn theme-btn2">Continue</button>
          </div>
        </div>
      </form>
    </div>
  )
}

const ProtectedEditServiceDashboard = () => (
  <AuthGuard>
    <EditService />
  </AuthGuard>
);

export default ProtectedEditServiceDashboard;