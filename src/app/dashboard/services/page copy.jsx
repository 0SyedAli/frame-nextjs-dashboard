import Image from 'next/image'
import { PiPencilSimpleLineBold } from "react-icons/pi";
import React from 'react'
import Link from 'next/link';

const Employees = () => {
  return (
    <div className='employees_dash services_dash'>
      <h3>Hair Services</h3>
      <div className="row mt-3 mb-5">
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <h3>Nails Services</h3>
      <div className="row mt-3 mb-5">
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <h3>Skin Services</h3>
      <div className="row mt-3">
        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-4">
          <Link href="service-detail">
            <div className="sd_item">
              <div className="sd_item_img">
                <Image
                  src="/images/emp_img1.png"
                  width={144}
                  height={144}
                  className="emp_img d-none"
                  alt="Frame"
                />
                <span><PiPencilSimpleLineBold /></span>
              </div>
              <div className="sd_item_content">
                <span className="sc_label">Non-surgical</span>
                <h4>Hair Service 1</h4>
                <p className="mb-3">A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                <p>Emily Ross - Stylist</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Employees